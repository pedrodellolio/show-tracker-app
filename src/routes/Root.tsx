import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import FixedBanner from "../components/FixedBanner";

function Root() {
  return (
    <>
      <Navbar />
      <FixedBanner />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default Root;
