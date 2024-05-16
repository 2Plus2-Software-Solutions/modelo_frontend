import { columns } from "./columns";
import { Table } from "@/components/reusable/table";

export default function PaymentsTable() {
  return (
    <div className="container mx-auto py-10">
      <Table columns={columns} />
    </div>
  );
}
