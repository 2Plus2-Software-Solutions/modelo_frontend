import { FiltersDef } from "@/components/reusable/table";

export type PaymentFilters = {
  username: string;
  age: string;
  email: string;
  city: string;

  userId: string;
};

export const filters: FiltersDef<PaymentFilters>[] = [
  {
    accessorKey: "username",
    label: "Username",
    inputType: "input",
  },
  {
    accessorKey: "age",
    label: "Idade",
    inputType: "input",
    mask: (value) => value.replace(/\D/g, ""),
  },
  {
    accessorKey: "email",
    label: "E-mail",
    inputType: "input",
  },
  {
    accessorKey: "city",
    label: "Cidade",
    inputType: "select",
    selectOptions: [
      {
        value: "1",
        label: "Canoas",
      },
      {
        value: "2",
        label: "Porto Alegre",
      },
    ],
  },
  {
    accessorKey: "userId",
    label: "Código Usuário",
    inputType: "input",
  },
];
