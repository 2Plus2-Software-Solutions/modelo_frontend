import { PagesDefinitions } from "../pages-definitions";
import { columns, Payment } from "./columns";
import { filters, PaymentFilters } from "./filters";
import { Table } from "@/components/table/table";
import api from "@/services/api";

const fetchPaymentsFn = async (filters: PaymentFilters): Promise<Payment[]> => {
  const response = await api.get(PagesDefinitions.PAYMENTS_TABLE.apiPathname, {
    params: { ...filters },
  });

  return response.data;
};

export default function PaymentsTable() {
  return (
    <div className="container mx-auto py-10">
      <Table
        columns={columns}
        filters={filters}
        title={PagesDefinitions.PAYMENTS_TABLE.title}
        fetchDataFn={fetchPaymentsFn}
      />
    </div>
  );
}
