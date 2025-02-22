import { FiltersDef } from "@/components/table/types";
import { NumberMask } from "@/lib/masks/number-mask";

export type UserFilters = {
  name: string;
  email: string;
  age: string;
};

export const filters: FiltersDef<UserFilters>[] = [
  {
    accessorKey: "name",
    label: "Nome",
    inputType: "input",
  },
  {
    accessorKey: "email",
    label: "E-mail",
    inputType: "input",
  },
  {
    accessorKey: "age",
    label: "Idade",
    inputType: "input",
    mask: NumberMask
  },
];
