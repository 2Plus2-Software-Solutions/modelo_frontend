import { Button } from "@/components/ui/button";
import { TableNavigationState } from "@/context/table-historic.context";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

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
    cell: ({ row }) => {
      const navigate = useNavigate();

      return (
        <Button
          onClick={() => {
            navigate("/payments", {
              state: {
                origin: "users",
                identifier: row.original.id,
                targetFilterAccessorKey: "userId",
              } as TableNavigationState,
            });
          }}
        >
          Pagamentos
        </Button>
      );
    },
  },
];
