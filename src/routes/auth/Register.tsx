import { Container, Typography } from "@mui/material";
import RegisterForm from "../../components/forms/RegisterForm";

function Login() {
  return (
    <>
      <Container maxWidth="xs" sx={{ mt: 5 }}>
        <Typography variant="h2" textAlign={"center"}>
          Shower
        </Typography>
        <Typography mt={4} mb={1} variant="h6">
          Register
        </Typography>
        <RegisterForm />
      </Container>
    </>
  );
}

export default Login;
