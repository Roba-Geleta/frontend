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
  SiAwslambda,
  SiReact,
  SiDotnet,
  SiPostgresql,
  SiAwsamplify,
  SiCloudflare,
  SiAmazonwebservices,
  SiAmazonrds,
  SiGooglecloud,
} from "react-icons/si";

import BusinessIcon from "@mui/icons-material/Business";
import ComputerIcon from "@mui/icons-material/Computer";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { SiCanva } from "react-icons/si";
import { FaStackOverflow } from "react-icons/fa";
import BrushIcon from "@mui/icons-material/Brush"; // Icon for Background Styling

import { ThemeContext } from "../../Context/ThemeContext";
import { lime } from "@mui/material/colors";

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

          {/* Financial Insights Platform Logo - Canva */}
          <ListItem>
            <ListItemIcon>
              <SiCanva
                size={30}
                className={`${
                  mode === "dark" ? "text-blue-500" : "text-blue-700"
                }`}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <MuiLink
                  href="https://www.canva.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Canva
                </MuiLink>
              }
              secondary="For designing the Financial Insights Platform logo."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "grey",
              }}
            />
          </ListItem>
        </List>

        {/* Background Styling Credit */}
        <Typography
          variant="h6"
          className={`${mode === "dark" ? "text-gray-200" : "text-gray-800"}`}
          gutterBottom
          sx={{ mt: 4 }}
        >
          Background Styling
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <BrushIcon
                sx={{
                  color: mode === "dark" ? "secondary.light" : "secondary.main",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <MuiLink
                  href="https://heropatterns.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Hero Patterns
                </MuiLink>
              }
              secondary="Used for creating custom background patterns for Financial Insights Platform."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "grey",
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FaStackOverflow
                size={30}
                className={`${
                  mode === "dark" ? "text-orange-400" : "text-orange-400"
                }`}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <MuiLink
                  href="https://stackoverflow.com/a/25709375"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  StackOverflow
                </MuiLink>
              }
              secondary="Used for creating custom background patterns for Portfolio Page."
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

          <ListItem>
            <ListItemIcon>
              <SiPostgresql size={24} color="#336791" />
            </ListItemIcon>
            <ListItemText
              primary="PostgreSQL"
              primaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "black",
              }}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      display: "block",
                      color: mode === "dark" ? "grey.700" : "grey",
                    }}
                  >
                    Utilized for database management.
                  </Typography>
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      color: lime[900],
                    }}
                  >
                    Migrated from SQL Server in November 2024.
                  </Typography>
                </>
              }
              secondaryTypographyProps={{
                component: "div",
              }}
            />
          </ListItem>
        </List>

        <Typography
          variant="h6"
          className={`${mode === "dark" ? "text-gray-200" : "text-gray-800"}`}
          gutterBottom
          sx={{ mt: 4 }}
        >
          Cloud & Hosting Services
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <BusinessIcon
                sx={{
                  color: mode === "dark" ? "grey.400" : "grey.800",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="NameSilo"
              primaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "black",
              }}
              secondary=".ca domain registrar"
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.700" : "grey",
              }}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <SiCloudflare size={24} color="#F38020" />
            </ListItemIcon>
            <ListItemText
              primary="Cloudflare"
              primaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "black",
              }}
              secondary="Used for CDN and security."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.700" : "grey",
              }}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <SiAwsamplify size={24} color="#FF9900" />
            </ListItemIcon>
            <ListItemText
              primary="AWS Amplify"
              primaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "black",
              }}
              secondary="Used for front-end hosting."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.700" : "grey",
              }}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <SiAmazonwebservices size={24} color="#FF9900" />
            </ListItemIcon>
            <ListItemText
              primary="AWS Elastic Beanstalk"
              primaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "black",
              }}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      display: "block",
                      color: mode === "dark" ? "grey.700" : "grey",
                    }}
                  >
                    Used for back-end hosting.
                  </Typography>
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      color: lime[900],
                    }}
                  >
                    Migrated from Azure Web App in November 2024.
                  </Typography>
                </>
              }
              secondaryTypographyProps={{
                component: "div",
              }}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <SiAmazonrds size={24} color="#FF9900" />
            </ListItemIcon>
            <ListItemText
              primary="AWS RDS"
              primaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "black",
              }}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      display: "block",
                      color: mode === "dark" ? "grey.700" : "grey",
                    }}
                  >
                    Managed PostgreSQL database service.
                  </Typography>
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      color: lime[900],
                    }}
                  >
                    Migrated from Azure SQL database in November 2024.
                  </Typography>
                </>
              }
              secondaryTypographyProps={{
                component: "div",
              }}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <SiAwslambda size={24} color="#FF9900" />
            </ListItemIcon>
            <ListItemText
              primary="AWS Lambda"
              primaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "black",
              }}
              secondary="Used for scheduled updates to stock data."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.700" : "grey",
              }}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <SiGooglecloud size={24} color="#4285F4" />
            </ListItemIcon>
            <ListItemText
              primary="Google Cloud Functions"
              primaryTypographyProps={{
                color: mode === "dark" ? "grey.500" : "black",
              }}
              secondary="Used to make simple API requests to Financial Modeling Prep (FMP)."
              secondaryTypographyProps={{
                color: mode === "dark" ? "grey.700" : "grey",
              }}
            />
          </ListItem>
        </List>

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
