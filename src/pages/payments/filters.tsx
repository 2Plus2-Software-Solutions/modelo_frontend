import { FiltersDef } from "@/components/table/types";
import { CurrencyMask } from "@/lib/masks/currency-mask";

export type PaymentFilters = {
  amount: string;
  status: string;
  userId: string;
};

export const filters: FiltersDef<PaymentFilters>[] = [
  {
    accessorKey: "amount",
    label: "Valor",
    inputType: "input",
    mask: CurrencyMask,
  },
  {
    accessorKey: "status",
    label: "Status",
    inputType: "select",
    selectOptions: [
      {
        value: "pending",
        label: "Pendente",
      },
      {
        value: "processing",
        label: "Processando",
      },
      {
        value: "completed",
        label: "Sucesso",
      },
      {
        value: "failed",
        label: "Falha",
      },
    ],
  },
  {
    accessorKey: "userId",
    label: "Código Usuário",
    inputType: "input",
  },
];
