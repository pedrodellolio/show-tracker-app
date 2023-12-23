import React from "react";
import Menu from "@mui/material/Menu";
import { Box, IconButton, MenuItem } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import useUserShow from "../hooks/useUserShow";

interface Props {
  rowId: string;
}
function RowOptions(props: Props) {
  const { deleteUserShow } = useUserShow();

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
