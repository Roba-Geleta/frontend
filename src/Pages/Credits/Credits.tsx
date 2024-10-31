import React, { useContext } from "react";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";

import {
  SiMui,
  SiTypescript,
  SiReact,
  SiDotnet,
  SiMicrosoftsqlserver,
} from "react-icons/si";

// Import generic icons for logos if specific ones are not available
import BusinessIcon from "@mui/icons-material/Business";
import ComputerIcon from "@mui/icons-material/Computer";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import { ThemeContext } from "../../Context/ThemeContext";

const Credits: React.FC = () => {
  const { mode } = useContext(ThemeContext);

  return (
    <Box
      component="main"
      sx={{
        py: 8,
        minHeight: "80vh",
      }}
      className={`${
        mode === "dark" ? "bg-gray-900" : "bg-white"
      } rounded-xl bg-opacity-50 border-[1px]`}
    >
      <Container maxWidth="md">
        {/* Main Heading */}
        <Typography
          id="Credits"
          variant="h4"
          component="h2"
          gutterBottom
          className="text-gray-900 dark:text-white"
          sx={{
            fontWeight: "bold",
            mb: 3,
            fontSize: { xs: "2rem", sm: "2.5rem" },
          }}
        >
          Credits
        </Typography>

        {/* Tutorials & Learning Resources */}
        <Typography
          variant="h6"
          className={`${mode === "dark" ? "text-gray-200" : "text-gray-800"}`}
          gutterBottom
        >
          Tutorials & Learning Resources
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <YouTubeIcon
                sx={{
                  color: mode === "dark" ? "error.light" : "error.main",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <MuiLink
                  href="https://www.youtube.com/@TeddySmithDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Teddy Smith
                </MuiLink>
              }
              secondary="For providing comprehensive tutorials on ASP.NET, SQL Server, and the Financial Modeling Prep API."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "grey",
              }}
              color="red"
            />
          </ListItem>
        </List>

        {/* Logos */}
        <Typography
          variant="h6"
          className={`${mode === "dark" ? "text-gray-200" : "text-gray-800"}`}
          gutterBottom
          sx={{ mt: 4 }}
        >
          Logos
        </Typography>
        <List>
          {/* Roba Logo */}
          <ListItem>
            <ListItemIcon>
              <ComputerIcon
                sx={{
                  color: mode === "dark" ? "primary.light" : "primary.main",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <MuiLink
                  href="https://notion-avatar.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Roba
                </MuiLink>
              }
              secondary="Designed using Notion Avatar."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "grey",
              }}
            />
          </ListItem>

          {/* Outlier AI Logo */}
          <ListItem>
            <ListItemIcon>
              <BusinessIcon
                sx={{
                  color: mode === "dark" ? "secondary.light" : "secondary.main",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <MuiLink
                  href="https://outlier.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Outlier AI
                </MuiLink>
              }
              secondary="Courtesy of Outlier AI."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "grey",
              }}
            />
          </ListItem>

          {/* Priceline Partner Solutions Logo */}
          <ListItem>
            <ListItemIcon>
              <TravelExploreIcon
                sx={{
                  color: mode === "dark" ? "action.disabled" : "action.active",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <MuiLink
                  href="https://pricelinepartnersolutions.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Priceline Partner Solutions
                </MuiLink>
              }
              secondary="Provided by Priceline Partner Solutions."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "grey",
              }}
            />
          </ListItem>
        </List>

        {/* Libraries & Tools */}
        <Typography
          variant="h6"
          className={`${mode === "dark" ? "text-gray-200" : "text-gray-800"}`}
          gutterBottom
          sx={{ mt: 4 }}
        >
          Libraries & Tools
        </Typography>
        <List>
          {/* Embla Carousel */}
          <ListItem>
            <ListItemIcon>
              <ViewCarouselIcon
                sx={{
                  color: mode === "dark" ? "primary.light" : "primary.main",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <MuiLink
                  href="https://www.embla-carousel.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Embla Carousel
                </MuiLink>
              }
              secondary="Used for the experience and skills carousels."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.700" : "grey",
              }}
            />
          </ListItem>

          {/* Material UI */}
          <ListItem>
            <ListItemIcon>
              <SiMui
                size={24}
                color={mode === "dark" ? "#90CAF9" : "#007FFF"}
              />
            </ListItemIcon>
            <ListItemText
              primary="Material UI"
              primaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "black",
              }}
              secondary="For providing a robust and customizable UI framework."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.700" : "grey",
              }}
            />
          </ListItem>

          {/* TypeScript */}
          <ListItem>
            <ListItemIcon>
              <SiTypescript size={24} color="#3178C6" />
            </ListItemIcon>
            <ListItemText
              primary="TypeScript"
              primaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "black",
              }}
              secondary="Adds strong typing to JavaScript, enhancing code quality."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.700" : "grey",
              }}
            />
          </ListItem>

          {/* React */}
          <ListItem>
            <ListItemIcon>
              <SiReact size={24} color="#61DAFB" />
            </ListItemIcon>
            <ListItemText
              primary="React"
              primaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "black",
              }}
              secondary="Used for building the user interface."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.700" : "grey",
              }}
            />
          </ListItem>

          {/* ASP.NET */}
          <ListItem>
            <ListItemIcon>
              <SiDotnet size={24} color="#512BD4" />
            </ListItemIcon>
            <ListItemText
              primary="ASP.NET"
              primaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "black",
              }}
              secondary="Employed for backend development."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.700" : "grey",
              }}
            />
          </ListItem>

          {/* SQL Server */}
          <ListItem>
            <ListItemIcon>
              <SiMicrosoftsqlserver size={24} color="#CC2927" />
            </ListItemIcon>
            <ListItemText
              primary="SQL Server"
              primaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "black",
              }}
              secondary="Utilized for database management."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.700" : "grey",
              }}
            />
          </ListItem>
        </List>

        {/* Front-end & Backend Technologies */}
        <Typography
          variant="h6"
          className={`${mode === "dark" ? "text-gray-200" : "text-gray-800"}`}
          gutterBottom
          sx={{ mt: 4 }}
        >
          Front-end & Backend Technologies
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Front-end"
              primaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "black",
              }}
              secondary="Material UI, TypeScript, React"
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.700" : "grey",
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Backend"
              primaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "black",
              }}
              secondary="ASP.NET, SQL Server"
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.700" : "grey",
              }}
            />
          </ListItem>
        </List>

        {/* Closing Statement */}
        <Typography
          variant="body2"
          className={`${mode === "dark" ? "text-gray-400" : "text-gray-500"}`}
          align="center"
          sx={{ mt: 4 }}
        >
          Thank you for visiting my website!
        </Typography>
      </Container>
    </Box>
  );
};

export default Credits;
