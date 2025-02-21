import { ColumnDef } from "@tanstack/react-table";
import { UpdatePayment } from "./components/update";
import { CurrencyFormatter } from "@/lib/formatters/currency-formatter";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "failed";
  email: string;

  userId: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return <UpdatePayment payment={row.original} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      return <span>{CurrencyFormatter(row.original.amount)}</span>;
    },
  },
];
