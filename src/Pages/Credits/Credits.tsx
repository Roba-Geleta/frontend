// src/pages/Credits.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Credits: React.FC = () => {
  return (
    <Box
      component="main"
      sx={{
        py: 8,
        minHeight: "80vh",
      }}
      className="bg-white dark:bg-gray-900"
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          gutterBottom
          className="text-gray-900 dark:text-white"
        >
          Credits
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-700 dark:text-gray-300"
          paragraph
        >
          I would like to extend my gratitude to the following resources and
          individuals who have helped me build this portfolio:
        </Typography>
        <List>
          {/* Example Credit Item */}
          <ListItem>
            <ListItemText
              primary={
                <MuiLink
                  href="https://material-ui.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Material-UI
                </MuiLink>
              }
              secondary="For providing a robust and customizable UI framework."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <MuiLink
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Tailwind CSS
                </MuiLink>
              }
              secondary="For utility-first CSS framework that enhances styling flexibility."
            />
          </ListItem>
          {/* Add more credits as needed */}
        </List>
        <Typography
          variant="body2"
          className="text-gray-500 dark:text-gray-400"
          align="center"
          sx={{ mt: 4 }}
        >
          Icons made by{" "}
          <MuiLink
            href="https://www.flaticon.com/authors/freepik"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Freepik
          </MuiLink>{" "}
          from{" "}
          <MuiLink
            href="https://www.flaticon.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Flaticon
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
};

export default Credits;
