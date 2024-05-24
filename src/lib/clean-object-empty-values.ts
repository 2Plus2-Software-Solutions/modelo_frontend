export function CleanObjectEmptyValues<TObj extends object>(
  obj: TObj
): Partial<TObj> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value) {
      return {
        ...acc,
        [key]: value,
      };
    }

    return acc;
  }, {});
}
