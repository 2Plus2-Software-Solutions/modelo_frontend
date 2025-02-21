import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Providers from "./Providers.tsx";
import UsersTable from "@/pages/users/users.tsx";
import PaymentsTable from "@/pages/payments/payments.tsx";
import { MainLayout } from "@/layouts/main.layout.tsx";
import Login from "@/pages/login/login.tsx";
import ProtectedRoutes from "./protected-routes.tsx";
import { PagesDefinitions } from "./pages/pages-definitions.ts";
// import ErrorPage from "@/pages/error/error.tsx"; // Assuming you have an error page component

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      // {
      //   path: "error",
      //   element: <ErrorPage />,
      // },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                path: "/",
                element: <p>Home</p>,
              },
              {
                path: PagesDefinitions.USERS_TABLE.urlPathname,
                element: <UsersTable />,
              },
              {
                path: PagesDefinitions.PAYMENTS_TABLE.urlPathname,
                element: <PaymentsTable />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
