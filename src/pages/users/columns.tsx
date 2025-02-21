import { NavigationCell } from "@/components/data-table/components/cells/navigation-cell";
import { SortableHeader } from "@/components/data-table/components/headers/sortable-header";
import { DateFormatter } from "@/lib/formatters/date-formatter";
import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Nome"></SortableHeader>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <SortableHeader column={column} label="E-mail"></SortableHeader>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Criação",
    cell: ({ row }) => <span>{DateFormatter(row.original.createdAt)}</span>,
  },
  {
    accessorKey: "payments_relation",
    header: "Pagamentos",
    cell: ({ row }) => (
      <NavigationCell
        to="/payments"
        identifier={row.original.id?.toString()}
        targetFilterAccessorKey="userId"
      />
    ),
  },
];
