import { Path } from "react-hook-form";

interface BaseFiltersDef<TFilters> {
  accessorKey: Path<TFilters>;
  label: string;
}

interface InputFiltersDef<TFilters> extends BaseFiltersDef<TFilters> {
  inputType: "input";
  mask?: (value: string) => string;
}

interface SelectFiltersDef<TFilters> extends BaseFiltersDef<TFilters> {
  inputType: "select";
  selectOptions: { value: string; label: string }[];
}

export type FiltersDef<TFilters> =
  | InputFiltersDef<TFilters>
  | SelectFiltersDef<TFilters>;
