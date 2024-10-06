import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/auth.context";

const ProtectedRoutes = () => {
  const { isUserLoggedIn, isVerifyingUserAuthentication } = useAuth();

  if (isVerifyingUserAuthentication) {
    return <div>Carregando...</div>;
  }

  if (!isUserLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
