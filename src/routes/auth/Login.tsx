import { Navigate } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm";
import useAuth from "../../hooks/useAuth";
import { Container, Typography } from "@mui/material";

function Login() {
  const { user } = useAuth();
  return user ? (
    <Navigate to="/" replace />
  ) : (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h2" textAlign={"center"}>
        Shower
      </Typography>
      <Typography mt={4} variant="h6">Login</Typography>
      <LoginForm />
    </Container>
  );
}

export default Login;
