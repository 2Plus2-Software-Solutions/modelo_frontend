import { QueryClientProvider } from "@tanstack/react-query";
import { TablePaginationProvider } from "./context/table-pagination.context";
import { TableHistoricProvider } from "./context/table-historic.context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/auth.context";
import { Outlet } from "react-router-dom";
import { queryClient } from "./lib/queryClient";

function Providers() {
  return (
    <GoogleOAuthProvider
      clientId={
        "428081397359-rtjv28bairb1cp8ikmaighcitrcvjt4k.apps.googleusercontent.com"
      }
    >
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TableHistoricProvider>
            <TablePaginationProvider>
              <Outlet />
            </TablePaginationProvider>
          </TableHistoricProvider>
        </QueryClientProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default Providers;
