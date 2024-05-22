import { NavigationCell } from "@/components/data-table/components/cells/navigation-cell";
import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: string;
  name: string;
  email: string;
  age: number;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "age",
    header: "Idade",
  },
  {
    accessorKey: "payments_relation",
    header: "Pagamentos",
    cell: ({ row }) => (
      <NavigationCell
        origin="users"
        identifier={row.original.id}
        targetFilterAccessorKey="userId"
      />
    ),
  },
];
