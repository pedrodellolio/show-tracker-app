import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Select,
  Box,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useUserShow from "../../hooks/useUserShow";
import {
  CreateShowFormData,
  createShowFormSchema,
} from "../../schemas/showFormSchema";
import { Status, Type } from "../../models/Show";
import useAuth from "../../hooks/useAuth";

interface Props {
  userUID: string | null;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

function ShowForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateShowFormData>({
    resolver: zodResolver(createShowFormSchema),
  });

  const { user } = useAuth();
  const uid = props.userUID ?? user!.uid;
  const { addUserShow, loading } = useUserShow(uid);

  async function createShow(data: CreateShowFormData) {
    addUserShow(data, uid);
    props.setOpenDrawer(false);
  }

  return (
    <Container sx={{ mt: 4 }}>
      <form
        noValidate
        onSubmit={handleSubmit(createShow)}
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
          error={!!errors.name}
          sx={{ width: "100%" }}
          size="small"
          variant="outlined"
        >
          <InputLabel htmlFor="name">Name</InputLabel>
          <OutlinedInput type="text" label="name" {...register("name")} />
          <FormHelperText>{errors.name?.message}</FormHelperText>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            gap: 1,
          }}
        >
          <FormControl
            error={!!errors.currentEpisode}
            sx={{ width: "100%" }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="currentEpisode">Current Episode</InputLabel>
            <OutlinedInput
              type="number"
              label="current episode"
              {...register("currentEpisode")}
            />
            <FormHelperText>{errors.currentEpisode?.message}</FormHelperText>
          </FormControl>

          <FormControl
            error={!!errors.currentSeason}
            sx={{ width: "100%" }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="currentSeason">Current Season</InputLabel>
            <OutlinedInput
              type="number"
              label="current season"
              {...register("currentSeason")}
            />
            <FormHelperText>{errors.currentSeason?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            gap: 1,
          }}
        >
          <FormControl
            error={!!errors.status}
            sx={{ width: "100%" }}
            size="small"
            variant="outlined"
          >
            <InputLabel id="status" htmlFor="status">
              Status
            </InputLabel>
            <Select
              labelId="status"
              label="status"
              inputProps={{ shrink: true }}
              native
              {...register("status")}
            >
              {Object.values(Status).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
            <FormHelperText>{errors.status?.message}</FormHelperText>
          </FormControl>
          <FormControl
            error={!!errors.type}
            sx={{ width: "100%" }}
            size="small"
            variant="outlined"
          >
            <InputLabel id="type" htmlFor="type">
              Type
            </InputLabel>
            <Select
              labelId="type"
              label="type"
              inputProps={{ shrink: true }}
              native
              {...register("type")}
            >
              {Object.values(Type).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
            <FormHelperText>{errors.type?.message}</FormHelperText>
          </FormControl>
        </Box>

        <FormControl
          error={!!errors.score}
          sx={{ width: "100%" }}
          size="small"
          variant="outlined"
        >
          <InputLabel htmlFor="score">Score</InputLabel>
          <OutlinedInput type="number" label="score" {...register("score")} />
          <FormHelperText>{errors.score?.message}</FormHelperText>
        </FormControl>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            gap: 1,
          }}
        >
          <FormControl
            error={!!errors.startYear}
            sx={{ width: "100%" }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="startYear">Start Year</InputLabel>
            <OutlinedInput
              type="number"
              label="start year"
              {...register("startYear")}
            />
            <FormHelperText>{errors.startYear?.message}</FormHelperText>
          </FormControl>

          <FormControl
            error={!!errors.endYear}
            sx={{ width: "100%" }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="endYear">End Year</InputLabel>
            <OutlinedInput
              type="number"
              label="end year"
              {...register("endYear")}
            />
            <FormHelperText>{errors.endYear?.message}</FormHelperText>
          </FormControl>
        </Box>

        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          sx={{ width: "100%", mb: 1 }}
        >
          Add
        </LoadingButton>
      </form>
    </Container>
  );
}

export default ShowForm;
