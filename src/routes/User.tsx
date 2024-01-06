import { Box, Container, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { UserDetails } from "../models/UserDetails";
import MoviesDataGrid from "../components/MoviesDataGrid";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { getUserShowsByUID } from "../services/userShowsApi";

function User() {
  const { details } = useLoaderData() as { details: UserDetails };
  const { user } = useAuth();
  const uid = details.userUID ?? user!.uid;

  const { data, isLoading } = useQuery({
    queryKey: ["getUserShows", uid],
    queryFn: () => getUserShowsByUID(uid),
  });

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "start",
        gap: 10,
      }}
    >
      <Box>
        {details.photoURL && (
          <img
            src={details.photoURL.split("=")[0] + "=s200-c"}
            alt={details.userName}
            height={160}
            style={{ borderRadius: 99 }}
          />
        )}
        <Typography variant="h5">
          @{details.userName.toLocaleLowerCase()}
        </Typography>
      </Box>
      <MoviesDataGrid
        removable={false}
        data={data ?? []}
        loading={isLoading}
        userUID={details.userUID}
      />
    </Container>
  );
}

export default User;
