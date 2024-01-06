import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Select,
  Box,
  Typography,
  Rating,
  MenuItem,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  CreateShowFormData,
  createShowFormSchema,
} from "../../schemas/showFormSchema";
import { Status, Type } from "../../models/UserShow";
import useAuth from "../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUserShow } from "../../services/userShowsApi";
import { useState } from "react";
import SearchedShowsDataGrid from "../SearchedShowsDataGrid";
import { findShowByTitle } from "../../services/showsApi";
import { Show } from "../../models/Show";

interface Props {
  userUID: string | null;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

function ShowForm(props: Props) {
  const [isNotCompletedOrToWatch, setIsNotCompletedOrToWatch] = useState(false);
  const [isMovie, setIsMovie] = useState(false);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [showInputValue, setShowInputValue] = useState("");
  const [typeInputValue, setTypeInputValue] = useState(Type.TV);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm<CreateShowFormData>({
    resolver: zodResolver(createShowFormSchema),
  });

  const { user } = useAuth();
  const uid = props.userUID ?? user!.uid;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["findShow", typeInputValue, showInputValue],
    queryFn: () => findShowByTitle(typeInputValue, showInputValue),
  });

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addUserShow,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUserShows"],
      });
    },
    onError: (err) => {
      alert(err);
    },
  });

  async function createShow(data: CreateShowFormData) {
    await mutateAsync({ uid, data, tmdbShow: selectedShow });
    props.setOpenDrawer(false);
  }

  function handleSearchShow() {
    setShowInputValue(getValues("title"));
    setTypeInputValue(getValues("type"));
    refetch();
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(createShow)}
      action="POST"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        gap: 10,
        width: 400,
      }}
    >
      <Typography variant="body2" textAlign={"left"} width={"100%"}>
        Rating
      </Typography>
      <FormControl error={!!errors.rating} size="small" variant="outlined">
        <Controller
          name="rating"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur } }) => (
            <Rating
              onBlur={onBlur}
              onRateChange={onChange}
              onChange={(_, value) => {
                onChange(value);
              }}
            />
          )}
        />
        <FormHelperText>{errors.rating?.message}</FormHelperText>
      </FormControl>
      <br />
      <Typography variant="body2" textAlign={"left"} width={"100%"}>
        Details
      </Typography>
      <FormControl
        error={!!errors.status}
        sx={{ width: "100%" }}
        size="small"
        variant="outlined"
      >
        <InputLabel id="status" htmlFor="status">
          Status
        </InputLabel>

        <Controller
          name="status"
          control={control}
          rules={{ required: true }}
          defaultValue={Status.ToWatch}
          render={({ field: { onChange, onBlur, name, value, ref } }) => (
            <Select
              label={name}
              labelId={name}
              onBlur={onBlur}
              inputRef={ref}
              value={value || ""}
              onChange={(e) => {
                const value = e.target.value;
                onChange(value);
                setIsNotCompletedOrToWatch(
                  value === Status.Ongoing ||
                    value === Status.Dropped ||
                    value === Status.Paused
                );
              }}
            >
              {Object.values(Status).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.status?.message}</FormHelperText>
      </FormControl>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <FormControl
            error={!!errors.title}
            sx={{ width: 900 }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="title">Title</InputLabel>
            <OutlinedInput
              required
              autoFocus
              type="text"
              label="title"
              {...register("title")}
              value={selectedShow?.title}
              onChange={(e) => {
                setValue("title", e.target.value);
                setSelectedShow((prev) => {
                  if (prev) return { ...prev, title: e.target.value };
                  return null;
                });
              }}
            />
            <FormHelperText>{errors.title?.message}</FormHelperText>
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
            <Controller
              name="type"
              control={control}
              rules={{ required: true }}
              defaultValue={Type.TV}
              render={({ field: { onChange, onBlur, name, value, ref } }) => (
                <Select
                  label={name}
                  labelId={name}
                  onBlur={onBlur}
                  inputRef={ref}
                  value={value || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    onChange(value);
                    setIsMovie(value === Type.Movie);
                  }}
                >
                  {Object.values(Type).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.type?.message}</FormHelperText>
          </FormControl>

          <Button variant="contained" onClick={handleSearchShow}>
            Search
          </Button>
        </Box>
        {data && data.length > 0 && (
          <SearchedShowsDataGrid
            data={data}
            loading={isLoading}
            selectedRow={selectedShow}
            setSelectedRow={setSelectedShow}
          />
        )}
      </Box>
      <br />
      {isNotCompletedOrToWatch && !isMovie && (
        <>
          <Typography variant="body2" textAlign={"left"} width={"100%"}>
            Progress
          </Typography>
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
        </>
      )}
      <LoadingButton
        loading={isPending}
        type="submit"
        variant="contained"
        sx={{ width: "100%", mb: 1 }}
      >
        Add
      </LoadingButton>
    </form>
  );
}

export default ShowForm;
