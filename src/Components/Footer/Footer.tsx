import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Stack,
  Tooltip,
  Divider,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LocationDisplay from "../LocationDisplay/LocationDisplay";
import RobaLogo from "../RobaLogo/RobaLogo";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        py: 4,
        mt: "auto",
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
      className="dark:bg-gray-800"
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          justifyContent="space-between"
          alignItems={{ xs: "center", sm: "flex-start" }}
          textAlign={{ xs: "center", sm: "left" }}
        >
          <Box>
            <Box
              mb={2}
              display="flex"
              alignItems="center"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Link to="/" className="flex flex-row items-center">
                <RobaLogo sx={{ fontSize: "50px" }} />
              </Link>
              <Typography
                variant="h6"
                className="text-gray-700 dark:text-gray-300 !font-bold ml-2"
              >
                Roba Geleta
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={1}
              mb={2}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Tooltip title="LinkedIn">
                <IconButton
                  color="info"
                  component="a"
                  href="https://www.linkedin.com/in/roba-geleta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="GitHub">
                <IconButton
                  color="info"
                  component="a"
                  href="https://github.com/Roba-Geleta"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Email">
                <IconButton
                  color="info"
                  component="a"
                  href="mailto:geletaroba@yahoo.ca"
                  aria-label="Email"
                >
                  <EmailIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          <Box textAlign={{ xs: "center", sm: "right" }} className="space-y-2">
            <Typography
              variant="body2"
              className="text-gray-700 dark:text-gray-300 !font-bold"
            >
              Made with ASP.NET & React
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="!text-gray-700 dark:!text-gray-300"
            >
              <Link to="/credits" className="hover:underline">
                Credits
              </Link>
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} className="dark:bg-gray-500" />

        <Box display="flex" justifyContent="center">
          <LocationDisplay />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
