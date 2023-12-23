import { Navigate } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm";
import useAuth from "../../hooks/useAuth";

function Login() {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : <LoginForm />;
}

export default Login;
