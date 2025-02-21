import { PagesDefinitions } from "../pages-definitions";
import { columns, User } from "./columns";
import { filters, UserFilters } from "./filters";
import { Table } from "@/components/table/table";
import api from "@/services/api";

const fetchUsersFn = async (filters: UserFilters): Promise<User[]> => {
  console.log(filters);

  const response = await api.get(PagesDefinitions.USERS_TABLE.apiPathname, {
    params: { ...filters },
  });

  return response.data;
};

export default function UsersTable() {
  return (
    <div className="container mx-auto py-10">
      <Table
        columns={columns}
        filters={filters}
        title={PagesDefinitions.USERS_TABLE.title}
        fetchDataFn={fetchUsersFn}
      />
    </div>
  );
}
