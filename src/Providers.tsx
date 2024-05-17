import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { TablePaginationProvider } from "./context/table-pagination.context";

const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TablePaginationProvider>
        {children}
      </TablePaginationProvider>
    </QueryClientProvider>
  );
}

export default Providers;
