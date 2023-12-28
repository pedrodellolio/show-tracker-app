import React from "react";
import Menu from "@mui/material/Menu";
import { Box, IconButton, MenuItem } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserShow } from "../services/userShowsApi";

interface Props {
  userUID: string;
  rowId: string;
}

function RowOptions(props: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: deleteUserShow,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUserShows", props.userUID],
      });
    },
    onError: () => {
      alert("there was an error");
    },
  });

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
    await mutateAsync(props.rowId);
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
