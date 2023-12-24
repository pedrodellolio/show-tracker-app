import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import UpdateUserDetailsModal from "../components/UpdateUserDetailsModal";

function Protected() {
  const { user, hasUserDetails } = useAuth();
  return user ? (
    <>
      {!hasUserDetails && <UpdateUserDetailsModal />}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default Protected;
