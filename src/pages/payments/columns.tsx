import { ColumnDef } from "@tanstack/react-table";
import { UpdatePayment } from "./components/update";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;

  userId: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "actions",
    header: "Ações 2",
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
    cell: ({ row }) => {
      return (
        <span className="cursor-pointer" onClick={() => alert("TESTE")}>
          {row.getValue("email")}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
