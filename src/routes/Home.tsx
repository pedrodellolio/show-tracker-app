import {
  Box,
  Button,
  Container,
  Drawer,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import MoviesDataGrid from "../components/MoviesDataGrid";
import ShowForm from "../components/forms/ShowForm";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getUserShowsByUID } from "../services/userShowsApi";
import { Type } from "../models/UserShow";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Select
            displayEmpty
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Select</em>;
              }

              return selected;
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            {Object.values(Type).map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button onClick={toggleDrawer(true)} variant="contained" sx={{ mb: 2 }}>
          Add Show
        </Button>
      </Box>
      <MoviesDataGrid
        removable={true}
        data={data ?? []}
        loading={isLoading}
        userUID={user!.uid}
      />
      <Drawer anchor={"right"} open={openDrawer} onClose={toggleDrawer(false)}>
        <Container sx={{ mt: 4 }}>
          <Typography variant="h6" mb={2}>
            New show
          </Typography>
          <ShowForm setOpenDrawer={setOpenDrawer} userUID={null} />
        </Container>
      </Drawer>
    </>
  );
}

export default Home;
