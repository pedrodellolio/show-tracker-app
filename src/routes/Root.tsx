import { Button, Container } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
function Root() {
  async function logout() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default Root;
