import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import CopyrightIcon from "@mui/icons-material/Copyright";

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
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Left Section: Credits */}
          <Typography
            variant="body2"
            color="text.secondary"
            className="text-gray-700 dark:text-gray-300"
          >
            <Link to="/credits" className="hover:underline">
              Credits
            </Link>
          </Typography>

          {/* Middle Section: Technology Stack */}
          <Typography
            variant="body2"
            color="text.secondary"
            className="text-gray-700 dark:text-gray-300"
          >
            Made with ASP.NET, C#, React, TypeScript
          </Typography>

          {/* Right Section: Social Media Icons */}
          <Stack direction="row" spacing={1}>
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
        </Stack>

        {/* Divider */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            className="text-gray-700 dark:text-gray-300"
          >
            <CopyrightIcon fontSize="small" /> {new Date().getFullYear()} Roba
            Geleta. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
