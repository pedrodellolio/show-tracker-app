import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import useAuth from "../hooks/useAuth";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";

import useColorMode from "../hooks/useColorMode";
import {
  Autocomplete,
  TextField,
  alpha,
  styled,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersDetailsByInput } from "../services/userDetailsApi";
import { Link, useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function Navbar() {
  const { user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggleColorMode, themeMode } = useColorMode();

  const [searchedValue, setSearchedValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ["getUsersDetails", searchedValue],
    queryFn: () => getAllUsersDetailsByInput(searchedValue),
  });

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearch = async (value: string) => {
    setSearchedValue(value);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  async function logout() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={logout}>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontWeight={500}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Shower
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Autocomplete
              sx={{ width: 300 }}
              options={users || []}
              autoHighlight
              freeSolo
              disableClearable
              onChange={(_, value) => {
                if (typeof value == "object" && "userName" in value)
                  navigate(`/user/${value.userName.toLocaleLowerCase()}`);
              }}
              getOptionLabel={(option) =>
                typeof option === "string"
                  ? option
                  : option.userName.toLocaleLowerCase()
              }
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {isLoading ? (
                    <Typography variant="body2">Searching users...</Typography>
                  ) : (
                    <Link to={`/user/${option.userName.toLocaleLowerCase()}`}>
                      {option.userName.toLocaleLowerCase()}
                    </Link>
                  )}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder="Search for user…"
                  onChange={(e) => handleSearch(e.target.value)}
                  inputProps={{
                    ...params.inputProps,
                    style: {
                      fontSize: "small",
                      border: "none",
                      paddingLeft: 40,
                    },
                    type: "search", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={toggleColorMode}
              color="inherit"
              sx={{ mr: 1 }}
            >
              {themeMode === "light" ? (
                <DarkModeIcon sx={{ color: theme.palette.primary.main }} />
              ) : (
                <LightModeIcon sx={{ color: theme.palette.primary.main }} />
              )}
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="user"
                  loading="lazy"
                  width={35}
                  style={{ borderRadius: 99 }}
                />
              ) : (
                <AccountCircle fontSize={"large"} />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
