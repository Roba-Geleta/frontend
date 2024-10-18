import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RobaLogo from "../RobaLogo/RobaLogo";
import { Link } from "react-router-dom";
import ToggleColorMode from "../ToggleColorMode/ToggleColorMode";
import { useAuth } from "../../Context/userAuth";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Avatar,
  ListItemIcon,
  ListItemText,
  Menu,
  Tooltip,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

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

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { isLoggedIn, user, logoutUser } = useAuth();

  const openEl = Boolean(anchorEl);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar
      className="bg-transparent"
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Link to="/" className="flex flex-row items-center">
              <RobaLogo fontSize="large" />
              <Box
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 900,
                  fontSize: "1.3rem",
                  letterSpacing: "0.01rem",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                GELETA
              </Box>
            </Link>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button variant="text" color="info" size="small">
                Experience
              </Button>
              <Button variant="text" color="info" size="small">
                Projects
              </Button>
              <Button
                color="info"
                size="small"
                variant="text"
                sx={{ minWidth: 0 }}
              >
                <LinkedInIcon />
              </Button>
              <Button
                color="info"
                size="small"
                variant="text"
                sx={{ minWidth: 0 }}
              >
                <GitHubIcon />
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: { sm: "none", md: "flex" } }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openEl}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
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
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {isLoggedIn()
                ? [
                    <MenuItem key="username" className="flex flex-row" disabled>
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>{user?.userName}</ListItemText>
                    </MenuItem>,
                    <MenuItem key="email" className="flex flex-row" disabled>
                      <ListItemIcon>
                        <AlternateEmailIcon fontSize="inherit" />
                      </ListItemIcon>
                      <ListItemText sx={{ fontSize: "0.7rem" }}>
                        {user?.email}
                      </ListItemText>
                    </MenuItem>,
                    <Divider key="divider" />,
                    <MenuItem key="sign-out">
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          logoutUser();
                          handleClose();
                        }}
                        fullWidth
                      >
                        Sign out
                      </Button>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key="login">
                      <Link to="/login" className="hover:text-darkBlue w-full">
                        <Button
                          color="primary"
                          variant="contained"
                          fullWidth
                          onClick={handleClose}
                        >
                          Sign In
                        </Button>
                      </Link>
                    </MenuItem>,
                    <MenuItem key="register">
                      <Link to="/register" className="w-full">
                        <Button
                          color="inherit"
                          variant="contained"
                          fullWidth
                          onClick={handleClose}
                        >
                          Sign up
                        </Button>
                      </Link>
                    </MenuItem>,
                  ]}
            </Menu>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                  <ToggleColorMode />
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
              </Box>
            </Drawer>
          </Box>
          <Box sx={{ display: { sm: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                  <ToggleColorMode />
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                {isLoggedIn() ? (
                  <MenuItem>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        logoutUser();
                        toggleDrawer(false);
                      }}
                      fullWidth
                    >
                      Sign out
                    </Button>
                  </MenuItem>
                ) : (
                  [
                    <MenuItem key="login">
                      <Link to="/login" className="hover:text-darkBlue w-full">
                        <Button
                          color="primary"
                          variant="contained"
                          fullWidth
                          onClick={toggleDrawer(false)}
                        >
                          Sign In
                        </Button>
                      </Link>
                    </MenuItem>,
                    <MenuItem key="register">
                      <Link to="/register" className="w-full">
                        <Button
                          color="inherit"
                          variant="contained"
                          fullWidth
                          onClick={toggleDrawer(false)}
                        >
                          Sign up
                        </Button>
                      </Link>
                    </MenuItem>,
                  ]
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
