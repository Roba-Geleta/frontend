// UserProfile.tsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Avatar,
  Typography,
  Button,
  Stack,
  Tooltip,
  Grid,
  Chip,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import AnimatedAvatar from "../AnimatedAvatar/AnimatedAvatar";

export default function UserProfile() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
      className="bg-orange-100 dark:bg-gray-900 bg-[radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)] dark:bg-[radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)]"
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 12, sm: 14 },
          pb: { xs: 6, sm: 8 },
        }}
      >
        <AnimatedAvatar
          alt="Roba Geleta"
          src="/src/assets/Roba.jpg"
          sx={{ width: 270, height: 270, mb: 2 }}
        />

        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          className="text-gray-900 dark:text-white"
        >
          Roba Geleta
        </Typography>

        <Typography
          variant="h6"
          component="p"
          align="center"
          color="textSecondary"
          sx={{ mb: 4 }}
          className="text-gray-700 dark:text-gray-300"
        >
          Bachelor of Computer Science, Specializing in Human-Computer
          Interaction and Computer Graphics
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          sx={{ mb: 4, maxWidth: 800 }}
          className="text-gray-700 dark:text-gray-300"
        >
          I'm a passionate Computer Science graduate with hands-on experience in
          software development, AI model training, and full-stack development. I
          thrive in collaborative environments and am committed to building
          efficient, user-friendly digital solutions.
        </Typography>

        {/* Action Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" color="primary" href="#projects">
            View Projects
          </Button>
          <Button variant="outlined" color="primary" href="#contact">
            Contact Me
          </Button>
        </Stack>

        {/* Social Media Links */}
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Tooltip title="LinkedIn">
            <Button
              color="info"
              variant="text"
              href="https://www.linkedin.com/in/roba-geleta/" // Replace with your LinkedIn URL
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon fontSize="large" />
            </Button>
          </Tooltip>
          <Tooltip title="GitHub">
            <Button
              color="info"
              variant="text"
              href="https://github.com/Roba-Geleta" // Replace with your GitHub URL
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon fontSize="large" />
            </Button>
          </Tooltip>
          <Tooltip title="Email">
            <Button
              color="info"
              variant="text"
              href="mailto:geletaroba@yahoo.ca" // Replace with your email
              aria-label="Email"
            >
              <EmailIcon fontSize="large" />
            </Button>
          </Tooltip>
        </Stack>

        {/* Technical Skills */}
        <Box sx={{ mt: 6, width: "100%", maxWidth: 800 }}>
          <Typography
            variant="h5"
            component="h2"
            align="center"
            gutterBottom
            className="text-gray-900 dark:text-white"
          >
            Technical Skills
          </Typography>
          <Grid container spacing={1} justifyContent="center">
            {/* Languages */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                className="text-gray-800 dark:text-gray-200"
              >
                Languages & Web Technologies
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: "wrap", mt: 1 }}
              >
                {[
                  "JavaScript",
                  "TypeScript",
                  "Python",
                  "Java",
                  "SQL",
                  "Go",
                  "C",
                  "C++",
                  "HTML5",
                  "CSS",
                ].map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    color="primary"
                    variant="outlined"
                    className="mb-1"
                  />
                ))}
              </Stack>
            </Grid>
            {/* Frameworks & Libraries */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                className="text-gray-800 dark:text-gray-200"
              >
                Frameworks & Libraries
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: "wrap", mt: 1 }}
              >
                {[
                  "React",
                  "Svelte",
                  "Material UI",
                  "Bootstrap",
                  "Tailwind CSS",
                  "Flowbite",
                  "Android SDK",
                ].map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    color="secondary"
                    variant="outlined"
                    className="mb-1"
                  />
                ))}
              </Stack>
            </Grid>
            {/* Tools & Platforms */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                className="text-gray-800 dark:text-gray-200"
              >
                Tools & Platforms
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: "wrap", mt: 1 }}
              >
                {[
                  "Git",
                  "GitHub",
                  "GitLab",
                  "VSCode",
                  "JUnit",
                  "JupyterLab",
                  "Android Studio",
                  "Eclipse",
                  "WebStorm",
                  "IntelliJ",
                  "PyCharm",
                  "Google Cloud Functions",
                  "Stripe",
                  "Twilio",
                  "OpenAI API",
                  "OAuth",
                  "Selenium",
                  "ASP.NET Core",
                  "SQL Server",
                  "Gradle",
                ].map((tool) => (
                  <Chip
                    key={tool}
                    label={tool}
                    color="success"
                    variant="outlined"
                    className="mb-1"
                  />
                ))}
              </Stack>
            </Grid>
            {/* Development Practices */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                className="text-gray-800 dark:text-gray-200"
              >
                Development Practices
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: "wrap", mt: 1 }}
              >
                {[
                  "Agile Methodologies",
                  "Test-Driven Development",
                  "Rapid Iterative Development",
                  "Version Control",
                  "API Integration",
                  "Chrome Extension Development",
                  "Discord Bot Development",
                ].map((practice) => (
                  <Chip
                    key={practice}
                    label={practice}
                    color="warning"
                    variant="outlined"
                    className="mb-1"
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
