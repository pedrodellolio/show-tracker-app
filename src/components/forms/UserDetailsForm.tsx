import {
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateUserDetailsFormData,
  createUserDetailsFormSchema,
} from "../../schemas/userDetailsFormSchema";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { updateUserDetails } from "../../services/userDetailsApi";

interface Props {
  handleCloseModal: () => void;
}

function UserDetailsForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDetailsFormData>({
    resolver: zodResolver(createUserDetailsFormSchema),
  });

  const { user } = useAuth();

  const { mutateAsync } = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: () => {
      props.handleCloseModal();
    },
    onError: () => {
      alert("there was an error");
    },
  });

  async function updateDetails(data: CreateUserDetailsFormData) {
    mutateAsync({ userUID: user!.uid, userName: data.userName, photoURL: "", displayName: "" });
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(updateDetails)}
      action="POST"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <FormControl
        error={!!errors.userName}
        sx={{ width: "100%" }}
        size="small"
        variant="outlined"
      >
        <InputLabel htmlFor="firstName">Username</InputLabel>
        <OutlinedInput type="text" label="username" {...register("userName")} />
        <FormHelperText>{errors.userName?.message}</FormHelperText>
      </FormControl>
      <Button type="submit" variant="contained" sx={{ width: "100%", mb: 1 }}>
        Create username
      </Button>
    </form>
  );
}

export default UserDetailsForm;
