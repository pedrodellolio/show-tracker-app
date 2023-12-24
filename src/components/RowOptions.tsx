import React from "react";
import Menu from "@mui/material/Menu";
import { Box, IconButton, MenuItem } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import useUserShow from "../hooks/useUserShow";
import useAuth from "../hooks/useAuth";

interface Props {
  userUID: string | null;
  rowId: string;
}

function RowOptions(props: Props) {
  const { user } = useAuth();
  const uid = props.userUID ?? user!.uid;
  const { deleteUserShow } = useUserShow(uid);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  async function handleRemoveShow() {
    await deleteUserShow(props.rowId);
    handleMobileMenuClose();
  }

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <>
      <Box>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        // id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={handleRemoveShow}>
          <p>Remove</p>
        </MenuItem>
      </Menu>
    </>
  );
}

export default RowOptions;
