import { columns, Payment } from "./columns";
import { filters, PaymentFilters } from "./filters";
import { Table } from "@/components/table/table";
import { PaginationState } from "@tanstack/react-table";
import api from "@/services/api";

const fetchPaymentsFn = async (
  pagination: PaginationState,
  filters: PaymentFilters
): Promise<Payment[]> => {
  return [
    {
      id: "1",
      amount: 100,
      status: "pending",
      email: "a@example.com",
      userId: "1",
    },
    {
      id: "2",
      amount: 100,
      status: "pending",
      email: "l@example.com",
      userId: "2",
    },
    {
      id: "3",
      amount: 100,
      status: "pending",
      email: "c@example.com",
      userId: "3",
    },
    {
      id: "4",
      amount: 100,
      status: "failed",
      email: "k@example.com",
      userId: "4",
    },
    {
      id: "5",
      amount: 100,
      status: "pending",
      email: "e@example.com",
      userId: "5",
    },
  ];

  const response = await api.get("/payments", {
    params: { ...pagination, ...filters },
  });

  return response.data;
};

export default function PaymentsTable() {
  return (
    <div className="container mx-auto py-10">
      <Table
        columns={columns}
        filters={filters}
        title="Pagamentos"
        fetchDataFn={fetchPaymentsFn}
      />
    </div>
  );
}
