import {
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
  Container,
  FormHelperText,
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import {
  CreateUserFormData,
  createUserFormSchema,
} from "../../schemas/userFormSchema";
import { Link } from "react-router-dom";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  async function createUser(data: CreateUserFormData) {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
    } catch (err) {
      console.error(err);
    }
  }

  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  return (
    <Container>
      <form
        noValidate
        onSubmit={handleSubmit(createUser)}
        action="POST"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <FormControl
            error={!!errors.userName}
            sx={{ width: "100%" }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <OutlinedInput
              type="text"
              label="first name"
              {...register("firstName")}
            />
            <FormHelperText>{errors.userName?.message}</FormHelperText>
          </FormControl>
          <FormControl
            error={!!errors.userName}
            sx={{ width: "100%" }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <OutlinedInput
              type="text"
              label="last name"
              {...register("lastName")}
            />
            <FormHelperText>{errors.userName?.message}</FormHelperText>
          </FormControl>
        </Box>
        <FormControl
          error={!!errors.userName}
          sx={{ width: "100%" }}
          size="small"
          variant="outlined"
        >
          <InputLabel htmlFor="userName">Username</InputLabel>
          <OutlinedInput
            type="text"
            label="username"
            {...register("userName")}
          />
          <FormHelperText>{errors.userName?.message}</FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.email}
          sx={{ width: "100%" }}
          size="small"
          variant="outlined"
        >
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput type="email" label="email" {...register("email")} />
          <FormHelperText>{errors.email?.message}</FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.password}
          sx={{ width: "100%" }}
          size="small"
          variant="outlined"
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            label="Password"
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
            {...register("password")}
          />
          <FormHelperText>{errors.password?.message}</FormHelperText>
        </FormControl>

        <Button type="submit" variant="contained" sx={{ width: "100%", mb: 1 }}>
          Register
        </Button>
        <Link to="/login">Login</Link>
      </form>
    </Container>
  );
}

export default RegisterForm;
