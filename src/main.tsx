import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PaymentsTable from "./pages/payments/payments.tsx";
import Providers from "./Providers.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PaymentsTable />,
    },
  ],
  {}
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
