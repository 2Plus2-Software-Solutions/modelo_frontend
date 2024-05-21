import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Providers from "./Providers.tsx";
import UsersTable from "@/pages/users/users.tsx";
import PaymentsTable from "@/pages/payments/payments.tsx";
import { MainLayout } from "@/layouts/main.layout.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <div>Página Home</div>,
    },
    {
      element: (
        <Providers>
          <MainLayout />
        </Providers>
      ),
      children: [
        {
          path: "/users",
          element: <UsersTable />,
        },
        {
          path: "/payments",
          element: <PaymentsTable />,
        },
      ],
    },
  ],
  {}
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
