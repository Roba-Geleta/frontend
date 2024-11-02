import React, { useState, MouseEvent, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
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
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
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
  const { authLoading, user, isLoggedIn, logoutUser } = useAuth();
  const { mode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleProjectsClick = (place: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(place, {
          smooth: true,
          duration: 500,
          offset: -100,
        });
      }, 100);
    } else {
      scroller.scrollTo(place, {
        smooth: true,
        duration: 500,
        offset: -100,
      });
    }
  };

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
    <Box
      key="username"
      display="flex"
      alignItems="center"
      px={2}
      py={1}
      maxWidth={250}
      width="100%"
      overflow="hidden"
    >
      <ListItemIcon>
        <AccountCircleIcon
          fontSize="small"
          sx={{ color: mode === "dark" ? "grey.300" : "text.primary" }}
        />
      </ListItemIcon>
      <Tooltip title={user?.userName || "User Name"} placement="right">
        <Typography
          variant="body2"
          noWrap
          sx={{
            color: mode === "dark" ? "grey.300" : "text.primary",
            fontSize: "0.9rem",
          }}
        >
          {user?.userName || "User Name"}
        </Typography>
      </Tooltip>
    </Box>,
    <Box
      key="email"
      display="flex"
      alignItems="center"
      px={2}
      py={1}
      maxWidth={250}
      width="100%"
      overflow="hidden"
    >
      <ListItemIcon>
        <AlternateEmailIcon
          fontSize="small"
          sx={{ color: mode === "dark" ? "grey.400" : "text.secondary" }}
        />
      </ListItemIcon>
      <Tooltip title={user?.email || "Email"} placement="right">
        <Typography
          variant="body2"
          noWrap
          sx={{
            color: mode === "dark" ? "grey.400" : "text.secondary",
            fontSize: "0.8rem",
          }}
        >
          {user?.email || "Email"}
        </Typography>
      </Tooltip>
    </Box>,
    <Divider key="divider" />,
    <MenuItem
      key="sign-out"
      onClick={() => {
        logoutUser();
        handleMenuClose();
      }}
      sx={{
        "&:hover": {
          backgroundColor: mode === "dark" ? "grey.800" : "grey.100",
        },
      }}
    >
      <ListItemIcon>
        <LogoutIcon
          fontSize="small"
          sx={{ color: mode === "dark" ? "error.light" : "error.main" }}
        />
      </ListItemIcon>
      <ListItemText
        primary="Sign out"
        primaryTypographyProps={{
          color: mode === "dark" ? "error.light" : "error.main",
          fontWeight: "medium",
        }}
      />
    </MenuItem>,
  ];

  // Menu Items for Unauthenticated Users
  const unauthenticatedMenu: React.ReactElement[] = [
    <MenuItem key="login" onClick={handleMenuClose}>
      <Link to="/login" className="w-full flex flex-row items-center">
        <ListItemIcon>
          <LoginIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <ListItemText
          primary="Sign In"
          primaryTypographyProps={{
            color: mode === "dark" ? "primary" : "primary",
            fontWeight: "medium",
          }}
        />
      </Link>
    </MenuItem>,
    <MenuItem key="register" onClick={handleMenuClose}>
      <Link to="/register" className="w-full flex flex-row items-center">
        <ListItemIcon>
          <PersonAddIcon fontSize="small" color="secondary" />
        </ListItemIcon>
        <ListItemText
          primary="Sign Up "
          primaryTypographyProps={{
            color: mode === "dark" ? "secondary" : "secondary",
            fontWeight: "medium",
          }}
        />
      </Link>
    </MenuItem>,
  ];

  // Handle authLoading state
  const renderAccountIcon = () => {
    if (authLoading) {
      // While authentication is loading, you can show a placeholder or nothing
      return (
        <Avatar
          sx={{ bgcolor: "grey.500", width: 32, height: 32 }}
          variant="circular"
        />
      );
    } else if (isLoggedIn && user) {
      // User is authenticated
      return <Avatar {...stringAvatar(user.userName || "User Name")} />;
    } else {
      // User is not authenticated
      return <Avatar sx={{ bgcolor: "grey.500", width: 32, height: 32 }} />;
    }
  };

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
            <Box className="hidden smv:flex">
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
                onClick={() => handleProjectsClick("Experience")}
                variant="text"
                color="info"
                size="small"
                className="dark:text-gray-300"
              >
                Experience
              </Button>
              <Button
                onClick={() => handleProjectsClick("Projects")}
                variant="text"
                color="info"
                size="small"
                className="dark:text-gray-300"
              >
                Projects
              </Button>
              <Button
                onClick={() => handleProjectsClick("Skills")}
                variant="text"
                color="info"
                size="small"
                className="dark:text-gray-300"
              >
                Skills
              </Button>
              {/* <Divider
                orientation="vertical"
                variant="middle"
                className="border-gray-300 dark:border-gray-700 !border-[0.09rem] !my-[6px] "
                flexItem
              />
              <Link to="/stocks" className="flex flex-row items-center">
                <Button
                  variant="text"
                  color="primary"
                  size="small"
                  className="dark:text-white"
                >
                  STOCKS
                </Button>
              </Link> */}
              {/* <Tooltip title="Linkedin">
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
              </Tooltip> */}
            </Box>
          </Box>

          {/* Right Section: Account and Theme Toggle */}
          <Box className="hidden smv:flex items-center">
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleMenuOpen}
                size="small"
                sx={{}}
                aria-controls={isMenuOpen ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? "true" : undefined}
              >
                {renderAccountIcon()}
              </IconButton>
            </Tooltip>
            <ToggleColorMode />
            {!authLoading && (
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
                <Box
                  key="account-info"
                  display="flex"
                  alignItems="center"
                  px={2}
                  py={1}
                  maxWidth={250}
                  width="100%"
                  overflow="hidden"
                >
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
                </Box>
                <Divider />
                {user ? authenticatedMenu : unauthenticatedMenu}
              </Menu>
            )}
          </Box>

          {/* Mobile Section: Drawer */}
          <Box className="flex smv:hidden">
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
                  {/* Home */}
                  <MenuItem
                    onClick={() => {
                      navigate("/");
                      setDrawerOpen(false);
                    }}
                  >
                    <Typography className="dark:text-white">Home</Typography>
                  </MenuItem>

                  {/* Experience */}
                  <MenuItem
                    onClick={() => {
                      handleProjectsClick("Experience");
                      setDrawerOpen(false);
                    }}
                  >
                    <Typography className="dark:text-gray-300">
                      Experience
                    </Typography>
                  </MenuItem>

                  {/* Projects */}
                  <MenuItem
                    onClick={() => {
                      handleProjectsClick("Projects");
                      setDrawerOpen(false);
                    }}
                  >
                    <Typography className="dark:text-gray-300">
                      Projects
                    </Typography>
                  </MenuItem>

                  {/* Skills */}
                  <MenuItem
                    onClick={() => {
                      handleProjectsClick("Skills");
                      setDrawerOpen(false);
                    }}
                  >
                    <Typography className="dark:text-gray-300">
                      Skills
                    </Typography>
                  </MenuItem>

                  {/* Divider
                  <Divider className="my-3 dark:bg-gray-700" />

                  
                  <MenuItem
                    onClick={() => {
                      navigate("/stocks");
                      setDrawerOpen(false);
                    }}
                  >
                    <Typography className="dark:text-white">Stocks</Typography>
                  </MenuItem> */}
                  <Divider className="my-2 dark:bg-gray-700" />

                  {/* Account Options */}
                  {authLoading ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      px={2}
                      py={1}
                      maxWidth={250}
                      width="100%"
                      overflow="hidden"
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            mode === "dark" ? "grey.400" : "text.secondary",
                          fontSize: "0.8rem",
                        }}
                      >
                        Loading...
                      </Typography>
                    </Box>
                  ) : isLoggedIn ? (
                    <>
                      {/* Account Information */}
                      <Box
                        display="flex"
                        alignItems="center"
                        px={2}
                        py={1}
                        maxWidth={250}
                        width="100%"
                        overflow="hidden"
                      >
                        <Tooltip
                          title="Currently, the Account system is used to interact with the Financial Modeling Prep (FMP) API and to store/manage stock portfolios and comments."
                          arrow
                          placement="bottom"
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
                      </Box>
                      <Divider className="my-2 dark:bg-gray-700" />

                      {/* User Name */}
                      <Box
                        display="flex"
                        alignItems="center"
                        px={2}
                        py={1}
                        maxWidth={250}
                        width="100%"
                        overflow="hidden"
                      >
                        <ListItemIcon>
                          <AccountCircleIcon
                            fontSize="small"
                            sx={{
                              color:
                                mode === "dark" ? "grey.300" : "text.primary",
                            }}
                          />
                        </ListItemIcon>
                        <Tooltip
                          title={user?.userName || "User Name"}
                          placement="bottom"
                        >
                          <Typography
                            variant="body2"
                            noWrap
                            sx={{
                              color:
                                mode === "dark" ? "grey.300" : "text.primary",
                              fontSize: "0.9rem",
                            }}
                          >
                            {user?.userName || "User Name"}
                          </Typography>
                        </Tooltip>
                      </Box>

                      {/* Email */}
                      <Box
                        display="flex"
                        alignItems="center"
                        px={2}
                        py={1}
                        maxWidth={250}
                        width="100%"
                        overflow="hidden"
                      >
                        <ListItemIcon>
                          <AlternateEmailIcon
                            fontSize="small"
                            sx={{
                              color:
                                mode === "dark" ? "grey.400" : "text.secondary",
                            }}
                          />
                        </ListItemIcon>
                        <Tooltip
                          title={user?.email || "Email"}
                          placement="bottom"
                        >
                          <Typography
                            variant="body2"
                            noWrap
                            sx={{
                              color:
                                mode === "dark" ? "grey.400" : "text.secondary",
                              fontSize: "0.8rem",
                            }}
                          >
                            {user?.email || "Email"}
                          </Typography>
                        </Tooltip>
                      </Box>
                      <Divider className="my-2 dark:bg-gray-700" />

                      {/* Sign Out */}
                      <MenuItem
                        onClick={() => {
                          logoutUser();
                          setDrawerOpen(false);
                        }}
                        sx={{
                          "&:hover": {
                            backgroundColor:
                              mode === "dark" ? "grey.800" : "grey.100",
                          },
                        }}
                      >
                        <ListItemIcon>
                          <LogoutIcon
                            fontSize="small"
                            sx={{
                              color:
                                mode === "dark" ? "error.light" : "error.main",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="Sign out"
                          primaryTypographyProps={{
                            color:
                              mode === "dark" ? "error.light" : "error.main",
                            fontWeight: "medium",
                          }}
                        />
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem onClick={() => setDrawerOpen(false)}>
                        <Link
                          to="/login"
                          className="w-full flex flex-row items-center"
                        >
                          <ListItemIcon>
                            <LoginIcon fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Sign In"
                            primaryTypographyProps={{
                              color: mode === "dark" ? "primary" : "primary",
                              fontWeight: "medium",
                            }}
                          />
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={() => setDrawerOpen(false)}>
                        <Link
                          to="/register"
                          className="w-full flex flex-row items-center"
                        >
                          <ListItemIcon>
                            <PersonAddIcon fontSize="small" color="secondary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Sign Up"
                            primaryTypographyProps={{
                              color:
                                mode === "dark" ? "secondary" : "secondary",
                              fontWeight: "medium",
                            }}
                          />
                        </Link>
                      </MenuItem>
                    </>
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
