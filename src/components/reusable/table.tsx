import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import React from "react";

import { DataTable } from "@/components/reusable/data-table";
import { FakeFetch } from "@/lib/fake-fetch";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
}

export function Table<TData>({ columns }: DataTableProps<TData>) {
  const memoizedColumns = React.useMemo<ColumnDef<TData>[]>(() => columns, []);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const defaultData = React.useMemo(() => [], []);

  const { data } = useQuery({
    queryKey: ["data", pagination],
    queryFn: () => FakeFetch<TData[], PaginationState>(pagination),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });

  return (
    <div className="container mx-auto py-10">
      {/* Filters Component */}

      <DataTable
        columns={memoizedColumns}
        data={data ?? defaultData}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
    </div>
  );
}
