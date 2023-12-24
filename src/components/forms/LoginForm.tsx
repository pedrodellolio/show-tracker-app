import {
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

function LoginForm() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  async function loginWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e: any) {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        action="post"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl
          sx={{ m: 1, width: "100%" }}
          size="small"
          variant="outlined"
        >
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            name="email"
            type="email"
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl
          sx={{ m: 1, width: "100%" }}
          size="small"
          variant="outlined"
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button type="submit" variant="contained" sx={{ width: "100%", mb: 1 }}>
          Login
        </Button>
      </form>
      <Typography mb={1} textAlign={"center"} variant="body2">
        or
      </Typography>
      <Button
        onClick={loginWithGoogle}
        variant="outlined"
        sx={{ width: "100%" }}
      >
        Sign in with Google
      </Button>

      <Typography textAlign={"center"} mt={1} variant="body2">
        Don't have an account?{" "}
        <Link to="/register" style={{ color: theme.palette.primary.main }}>
          Register here
        </Link>
      </Typography>
    </>
  );
}

export default LoginForm;
