import {
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserDetails from "../../hooks/useUserDetails";
import {
  CreateUserDetailsFormData,
  createUserDetailsFormSchema,
} from "../../schemas/userDetailsFormSchema";
import useAuth from "../../hooks/useAuth";

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

  const { updateUserDetails } = useUserDetails();
  const { user } = useAuth();
  async function updateDetails(data: CreateUserDetailsFormData) {
    try {
      await updateUserDetails(user!.uid, data.userName);
      props.handleCloseModal();
    } catch (err) {
      console.error(err);
    }
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
