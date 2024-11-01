import { columns, User } from "./columns";
import { filters, UserFilters } from "./filters";
import { Table } from "@/components/table/table";
import { PaginationState } from "@tanstack/react-table";
import api from "@/services/api";

const fetchUsersFn = async (
  pagination: PaginationState,
  filters: UserFilters
): Promise<User[]> => {
  return [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      age: 20,
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      age: 25,
    },
    {
      id: "3",
      name: "Jim Doe",
      email: "jim.doe@example.com",
      age: 30,
    },
    {
      id: "4",
      name: "Jill Doe",
      email: "jill.doe@example.com",
      age: 35,
    },
  ];

  const response = await api.get("/users", {
    params: { ...pagination, ...filters },
  });

  return response.data;
};

export default function UsersTable() {
  return (
    <div className="container mx-auto py-10">
      <Table
        columns={columns}
        filters={filters}
        title="Usuários"
        fetchDataFn={fetchUsersFn}
      />
    </div>
  );
}
