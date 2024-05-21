import { OnChangeFn, PaginationState } from "@tanstack/react-table";
import React, { ReactNode } from "react";

const TablePaginationContext = React.createContext<{
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
}>({
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
  setPagination: () => {},
});

export const TablePaginationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <TablePaginationContext.Provider value={{ pagination, setPagination }}>
      {children}
    </TablePaginationContext.Provider>
  );
};

export const useTablePagination = () => {
  return React.useContext(TablePaginationContext);
};
