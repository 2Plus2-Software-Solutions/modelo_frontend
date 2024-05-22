import { columns } from "./columns";
import { filters } from "./filters";
import { Table } from "@/components/table/table";

export default function UsersTable() {
  return (
    <div className="container mx-auto py-10">
      <Table columns={columns} filters={filters} title="Usuários" />
    </div>
  );
}
