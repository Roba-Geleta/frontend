import React, { useState, MouseEvent, useContext } from "react";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Container,
  Divider,
  MenuItem,
  Drawer,
  Avatar,
  ListItemIcon,
  ListItemText,
  Menu,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import RobaLogo from "../RobaLogo/RobaLogo";
import ToggleColorMode from "../ToggleColorMode/ToggleColorMode";
import { useAuth } from "../../Context/userAuth";
import { ThemeContext } from "../../Context/ThemeContext";

// Helper Functions
const stringToColor = (string: string): string => {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

const stringAvatar = (name: string) => ({
  sx: {
    bgcolor: stringToColor(name),
  },
  children: `${name[0].toUpperCase()}`,
});

// Styled Components
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

const AppAppBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isLoggedIn, user, logoutUser } = useAuth();
  const { mode } = useContext(ThemeContext);

  const isMenuOpen = Boolean(anchorEl);

  // Handlers
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Menu Items for Authenticated Users
  const authenticatedMenu: React.ReactElement[] = [
    <MenuItem key="username" disabled>
      <ListItemIcon>
        <AccountCircleIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText
        primary={user?.userName}
        primaryTypographyProps={{
          color: "text.primary",
          fontSize: "0.9rem",
        }}
      />
    </MenuItem>,
    <MenuItem key="email" disabled>
      <ListItemIcon>
        <AlternateEmailIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText
        primary={user?.email}
        primaryTypographyProps={{
          color: "text.secondary",
          fontSize: "0.8rem",
        }}
      />
    </MenuItem>,
    <Divider key="divider" />,
    <MenuItem
      key="sign-out"
      onClick={() => {
        logoutUser();
        handleMenuClose();
      }}
    >
      <ListItemIcon>
        <LogoutIcon fontSize="small" color="error" />
      </ListItemIcon>
      <ListItemText
        primary="Sign out"
        primaryTypographyProps={{
          color: "error.main",
          fontWeight: "medium",
        }}
      />
    </MenuItem>,
  ];

  // Menu Items for Unauthenticated Users
  const unauthenticatedMenu: React.ReactElement[] = [
    <MenuItem key="login" onClick={handleMenuClose}>
      <ListItemIcon>
        <LoginIcon fontSize="small" color="primary" />
      </ListItemIcon>
      <ListItemText primary="Sign In" />
      <Link to="/login" className="w-full">
        <Button
          color="primary"
          variant="text"
          fullWidth
          sx={{
            textTransform: "none",
            justifyContent: "flex-start",
            padding: 0,
          }}
        >
          Sign In
        </Button>
      </Link>
    </MenuItem>,
    <MenuItem key="register" onClick={handleMenuClose}>
      <ListItemIcon>
        <PersonAddIcon fontSize="small" color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Sign Up" />
      <Link to="/register" className="w-full">
        <Button
          color="secondary"
          variant="text"
          fullWidth
          sx={{
            textTransform: "none",
            justifyContent: "flex-start",
            padding: 0,
          }}
        >
          Sign Up
        </Button>
      </Link>
    </MenuItem>,
  ];

  return (
    <AppBar
      position="fixed"
      className="bg-transparent "
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar
          variant="dense"
          disableGutters
          className="dark:bg-gray-800"
        >
          {/* Left Section: Logo and Navigation Links */}
          <Box
            className="flex items-center"
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Link to="/" className="flex flex-row items-center">
              <RobaLogo sx={{ fontSize: "50px" }} />
            </Link>
            <Box className="hidden sm:flex">
              <Link to="/" className="flex flex-row items-center">
                <Button
                  variant="text"
                  color="primary"
                  size="small"
                  className="dark:text-white"
                >
                  Home
                </Button>
              </Link>
              <Button
                variant="text"
                color="info"
                size="small"
                className="dark:text-gray-300"
              >
                Experience
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                className="dark:text-gray-300"
              >
                Projects
              </Button>
              <Tooltip title="Linkedin">
                <Button
                  color="info"
                  size="small"
                  variant="text"
                  sx={{ minWidth: 0 }}
                  className="dark:text-gray-300"
                >
                  <LinkedInIcon />
                </Button>
              </Tooltip>
              <Tooltip title="GitHub">
                <Button
                  color="info"
                  size="small"
                  variant="text"
                  sx={{ minWidth: 0 }}
                  className="dark:text-gray-300"
                >
                  <GitHubIcon />
                </Button>
              </Tooltip>
            </Box>
          </Box>

          {/* Right Section: Account and Theme Toggle */}
          <Box className="hidden sm:flex items-center">
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleMenuOpen}
                size="small"
                sx={{}}
                aria-controls={isMenuOpen ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? "true" : undefined}
              >
                {isLoggedIn() ? (
                  <Avatar {...stringAvatar(user?.userName || "User Name")} />
                ) : (
                  <Avatar sx={{ bgcolor: "black" }} />
                )}
              </IconButton>
            </Tooltip>
            <ToggleColorMode />
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={isMenuOpen}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              PaperProps={{
                elevation: 4,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  minWidth: 200, // Set a minimum width
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                  backgroundColor:
                    mode === "dark" ? "#1f2937" : "background.paper", // Adjust based on mode
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* Info Tooltip */}
              <MenuItem disabled>
                <Tooltip
                  title="Currently, the Account system is used to interact with the Financial Modeling Prep (FMP) API and to store/manage stock portfolios and comments."
                  arrow
                  placement="right"
                >
                  <InfoOutlinedIcon
                    fontSize="small"
                    sx={{
                      color: mode === "dark" ? "grey.400" : "grey.600",
                      mr: 1,
                    }}
                  />
                </Tooltip>
                <ListItemText
                  primary="Account Information"
                  primaryTypographyProps={{
                    color: mode === "dark" ? "grey.300" : "grey.700",
                    fontSize: "0.8rem",
                  }}
                />
              </MenuItem>
              <Divider />
              {user ? authenticatedMenu : unauthenticatedMenu}
            </Menu>
          </Box>

          {/* Mobile Section: Drawer */}
          <Box className="flex sm:hidden">
            <IconButton
              aria-label="Menu button"
              onClick={toggleDrawer(true)}
              className="dark:text-white"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                className="p-2 bg-white dark:bg-gray-800"
                sx={{ height: "100%" }}
              >
                {/* Drawer Header */}
                <Box className="flex items-center justify-between">
                  <IconButton
                    onClick={toggleDrawer(false)}
                    className="dark:text-white"
                  >
                    <CloseRoundedIcon />
                  </IconButton>
                  <ToggleColorMode />
                </Box>
                <Divider className="my-3 dark:bg-gray-700" />

                {/* Drawer Menu Items */}
                <Box className="flex flex-col space-y-2">
                  <MenuItem>
                    <Link
                      to="/"
                      className="flex flex-row w-full dark:text-white"
                      onClick={toggleDrawer(false)}
                    >
                      Home
                    </Link>
                  </MenuItem>
                  <MenuItem className="dark:text-gray-300">Experience</MenuItem>
                  <MenuItem className="dark:text-gray-300">Projects</MenuItem>
                  <MenuItem className="flex space-x-2">
                    <Tooltip title="linkedin">
                      <Button
                        color="info"
                        size="small"
                        variant="text"
                        sx={{ minWidth: 0 }}
                        className="dark:text-gray-300"
                      >
                        <LinkedInIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="GitHub">
                      <Button
                        color="info"
                        size="small"
                        variant="text"
                        sx={{ minWidth: 0 }}
                        className="dark:text-gray-300"
                      >
                        <GitHubIcon />
                      </Button>
                    </Tooltip>
                  </MenuItem>

                  {isLoggedIn() ? (
                    <MenuItem key="drawer-sign-out">
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          logoutUser();
                          setDrawerOpen(false);
                        }}
                        fullWidth
                      >
                        Sign out
                      </Button>
                    </MenuItem>
                  ) : (
                    [
                      <MenuItem key="drawer-login">
                        <Link
                          to="/login"
                          className="hover:text-darkBlue w-full"
                          onClick={toggleDrawer(false)}
                        >
                          <Button color="primary" variant="contained" fullWidth>
                            Sign In
                          </Button>
                        </Link>
                      </MenuItem>,
                      <MenuItem key="drawer-register">
                        <Link
                          to="/register"
                          className="w-full"
                          onClick={toggleDrawer(false)}
                        >
                          <Button color="inherit" variant="contained" fullWidth>
                            Sign up
                          </Button>
                        </Link>
                      </MenuItem>,
                    ]
                  )}
                </Box>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default AppAppBar;
