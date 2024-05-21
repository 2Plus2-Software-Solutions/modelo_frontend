import { Sidebar } from "@/components/sidebar/sidebar";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="grid lg:grid-cols-5">
      <Sidebar />

      <div className="col-span-3 lg:col-span-4 lg:border-l">
        <Outlet />
      </div>
    </div>
  );
}
