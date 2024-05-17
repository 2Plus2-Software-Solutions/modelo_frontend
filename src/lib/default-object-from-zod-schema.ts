import { z } from "zod";

export const GetDefaultObjectFromZodSchema = <T extends z.ZodTypeAny>(
  schema: z.AnyZodObject | z.ZodEffects<any>,
  options: object = {}
): z.infer<T> => {
  const defaultArrayEmpty =
    "defaultArrayEmpty" in options ? options.defaultArrayEmpty : false;
  const defaultDateEmpty =
    "defaultDateEmpty" in options ? options.defaultDateEmpty : false;
  const defaultDateUndefined =
    "defaultDateUndefined" in options ? options.defaultDateUndefined : false;
  const defaultDateNull =
    "defaultDateNull" in options ? options.defaultDateNull : false;

  function run(): z.infer<T> {
    if (schema instanceof z.ZodEffects) {
      if (schema.innerType() instanceof z.ZodEffects) {
        return GetDefaultObjectFromZodSchema(schema.innerType(), options); // recursive ZodEffect
      }
      // return schema inner shape as a fresh zodObject
      return GetDefaultObjectFromZodSchema(
        z.ZodObject.create(schema.innerType().shape),
        options
      );
    }

    if (schema instanceof z.ZodType) {
      let the_shape = schema.shape as z.ZodAny; // eliminates 'undefined' issue
      let entries = Object.entries(the_shape);
      let temp = entries.map(([key, value]) => {
        let this_default =
          value instanceof z.ZodEffects
            ? GetDefaultObjectFromZodSchema(value, options)
            : getDefaultValue(value);
        return [key, this_default];
      });
      return Object.fromEntries(temp);
    } else {
      return null; // unknown or undefined here results in complications
    }

    function getDefaultValue(dschema: z.ZodTypeAny): any {
      if (dschema instanceof z.ZodDefault) {
        if (!("_def" in dschema)) return undefined; // error
        if (!("defaultValue" in dschema._def)) return undefined; // error
        return dschema._def.defaultValue();
      }
      if (dschema instanceof z.ZodArray) {
        if (!("_def" in dschema)) return undefined; // error
        if (!("type" in dschema._def)) return undefined; // error
        // return empty array or array with one empty typed element
        return defaultArrayEmpty
          ? []
          : [getDefaultValue(dschema._def.type as z.ZodAny)];
      }
      if (dschema instanceof z.ZodString) return "";
      if (dschema instanceof z.ZodNumber || dschema instanceof z.ZodBigInt) {
        let value = dschema.minValue ?? 0;
        return value;
      }
      if (dschema instanceof z.ZodDate) {
        let value = defaultDateEmpty
          ? ""
          : defaultDateNull
          ? null
          : defaultDateUndefined
          ? undefined
          : (dschema as z.ZodDate).minDate;
        return value;
      }
      if (dschema instanceof z.ZodSymbol) return "";
      if (dschema instanceof z.ZodBoolean) return false;
      if (dschema instanceof z.ZodNull) return null;
      if (dschema instanceof z.ZodPipeline) {
        if (!("out" in dschema._def)) return undefined; // error
        return getDefaultValue(dschema._def.out);
      }
      if (dschema instanceof z.ZodObject) {
        return GetDefaultObjectFromZodSchema(dschema, options);
      }
      if (dschema instanceof z.ZodAny && !("innerType" in dschema._def))
        return undefined; // error?
      return getDefaultValue(dschema._def.innerType);
    }
  }

  return run();
};
