import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { TablePaginationProvider } from "./context/table-pagination.context";
import { TableHistoricProvider } from "./context/table-historic.context";

const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TableHistoricProvider>
        <TablePaginationProvider>{children}</TablePaginationProvider>
      </TableHistoricProvider>
    </QueryClientProvider>
  );
}

export default Providers;
