import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Divider,
  MenuItem,
  Drawer,
  Typography,
  ToolbarProps,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import RobaLogo from "../RobaLogo/RobaLogo";
import ToggleColorMode from "../ToggleColorMode/ToggleColorMode";

// Styled Components
interface StyledToolbarProps extends ToolbarProps {
  scrolled: boolean;
}

const StyledToolbar = styled(Toolbar, {
  shouldForwardProp: (prop) => prop !== "scrolled",
})<StyledToolbarProps>(({ theme, scrolled }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: scrolled ? 0 : `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  boxShadow: theme.shadows[1],
  padding: "8px 16px",
  marginLeft: scrolled ? 0 : "20px",
  marginRight: scrolled ? 0 : "20px",
  transition:
    "padding 0.6s ease-in-out, margin 0.5s ease-in-out, border-radius 0.3s ease-in-out",
}));

const AppAppBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  // Handlers
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: scrolled ? "transparent" : "transparent",
        backgroundImage: "none",
        mt: scrolled ? 0 : 2,
        // px: scrolled ? 0 : 10,
        width: "100%",
        transition: "margin-top 0.6s ease-in-out",
      }}
    >
      <StyledToolbar
        variant="dense"
        disableGutters
        scrolled={scrolled}
        className={`bg-transparent transition-all duration-300 ${
          scrolled
            ? " bg-[#f5f1e0be] dark:bg-[#192335be]"
            : " bg-[#f5f1e0be] dark:bg-[#192335be]"
        }`}
      >
        {/* Left Section: Logo and Navigation Links */}
        <Box
          className="flex items-center"
          sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
        >
          <Link to="/" className="flex flex-row items-center">
            <RobaLogo
              sx={{
                fontSize: "50px",
                transition: "font-size 0.3s ease-in-out",
              }}
            />
          </Link>
          <Box className="hidden smv:flex">
            <Link to="/" className="flex flex-row items-center">
              <Button
                variant="text"
                color="primary"
                size="small"
                className="dark:text-white"
                onClick={() => handleProjectsClick("Home")}
              >
                Home
              </Button>
            </Link>
            <Button
              onClick={() => handleProjectsClick("Skills")}
              variant="text"
              color="info"
              size="small"
              className="dark:text-gray-300"
            >
              Skills
            </Button>
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
              onClick={() => handleProjectsClick("Contact")}
              variant="text"
              color="info"
              size="small"
              className="dark:text-gray-300"
            >
              Contact
            </Button>
          </Box>
        </Box>
        {/* Right Section: Account and Theme Toggle */}
        <Box className="hidden smv:flex items-center">
          <ToggleColorMode />
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
          <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
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

                {/* Skills */}
                <MenuItem
                  onClick={() => {
                    handleProjectsClick("Skills");
                    setDrawerOpen(false);
                  }}
                >
                  <Typography className="dark:text-gray-300">Skills</Typography>
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

                {/* Contact */}
                <MenuItem
                  onClick={() => {
                    handleProjectsClick("Contact");
                    setDrawerOpen(false);
                  }}
                >
                  <Typography className="dark:text-gray-300">
                    Contact
                  </Typography>
                </MenuItem>

                <Divider className="my-2 dark:bg-gray-700" />
              </Box>
            </Box>
          </Drawer>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default AppAppBar;
