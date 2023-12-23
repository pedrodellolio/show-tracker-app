import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Outlet } from "react-router-dom";

function Root() {
  async function logout() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
      <Outlet />
    </div>
  );
}

export default Root;
