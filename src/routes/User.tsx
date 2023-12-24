import { Box, Container, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { UserDetails } from "../models/UserDetails";
import MoviesDataGrid from "../components/MoviesDataGrid";

function User() {
  const { details } = useLoaderData() as { details: UserDetails };
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
        <Typography variant="h5">@{details.userName.toLocaleLowerCase()}</Typography>
      </Box>
      <MoviesDataGrid userUID={details.userUID} />
    </Container>
  );
}

export default User;
