import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import UserDetailsForm from "../components/forms/UserDetailsForm";

function UpdateUserDetailsModal() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Update your account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText fontSize={"small"} marginBottom={1}>
            Create a username that will be used as your unique identification
            inside the app. Choose a username that represents you and is easy
            for others to recognize.
          </DialogContentText>
          <UserDetailsForm handleCloseModal={handleClose} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}

export default UpdateUserDetailsModal;
