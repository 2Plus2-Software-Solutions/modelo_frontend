import { FiltersDef } from "@/components/table/types";

export type UserFilters = {
  name: string;
  email: string;
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
];
