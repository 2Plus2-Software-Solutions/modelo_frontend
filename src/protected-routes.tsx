import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/auth.context";

const ProtectedRoutes = () => {
  const { user, isVerifyingUserAuthentication } = useAuth();

  if (isVerifyingUserAuthentication) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
