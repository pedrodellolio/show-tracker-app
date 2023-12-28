import { Box, Button, Drawer } from "@mui/material";
import MoviesDataGrid from "../components/MoviesDataGrid";
import ShowForm from "../components/forms/ShowForm";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getUserShowsByUID } from "../services/userShowsApi";

function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["getUserShows", user!.uid],
    queryFn: () => getUserShowsByUID(user!.uid),
  });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenDrawer(open);
    };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button onClick={toggleDrawer(true)} variant="contained" sx={{ mb: 2 }}>
          Add Show
        </Button>
      </Box>
      <MoviesDataGrid
        data={data ?? []}
        loading={isLoading}
        userUID={user!.uid}
      />
      <Drawer anchor={"right"} open={openDrawer} onClose={toggleDrawer(false)}>
        <ShowForm setOpenDrawer={setOpenDrawer} userUID={null} />
      </Drawer>
    </>
  );
}

export default Home;
