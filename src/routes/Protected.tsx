import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Protected() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default Protected;
