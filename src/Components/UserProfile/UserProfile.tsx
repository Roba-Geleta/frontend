import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { scroller } from "react-scroll";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { Typography, Button, Chip, Divider } from "@mui/material";
import "../../css/embla.css";
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import SpeedIcon from "@mui/icons-material/Speed";
import Settings from "@mui/icons-material/Settings";
import { ThemeContext } from "../../Context/ThemeContext";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

import BackgroundWithIcons from "../BackgroundWithIcons/BackgroundWithIcons";
import ContactForm from "../ContactForm/ContactForm";
import AnimatedAvatar from "../AnimatedAvatar/AnimatedAvatar";
import ExperienceTimeLine from "../ExperienceTimeLine/ExperienceTimeLine";
import ProjectsList from "../ProjectsList/ProjectsList";

export default function UserProfile() {
  const Roba = "https://my-r2-proxy.geletaroba.workers.dev/assets/Roba.webp";
  const { mode } = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);

  // Updated Technical Skills
  const technicalSkills = {
    languages: [
      "TypeScript",
      "JavaScript",
      "Python",
      "Java",
      "Go",
      "C",
      "C++",
      "C#",
      "SQL",
      "HTML5",
      "CSS",
    ],
    frameworks: [
      "React",
      "Svelte",
      "Bootstrap",
      "Tailwind CSS",
      "Android SDK",
      "ASP.NET Core",
    ],
    tools: [
      "GitHub",
      "Google Cloud Services",
      "AWS",
      "Cloudflare",
      "JUnit",
      "JupyterLab",
      "Android Studio",
      "Stripe",
      "Twilio",
      "OpenAI API",
      "OAuth",
      "Selenium",
      "Chrome Extension",
    ],
    practices: [
      "Agile Methodologies",
      "Test-Driven Development",
      "Rapid Iterative Development",
      "Version Control",
      "API Integration",
      "User-Centered Design",
      "Architecture Design",
      "Database Management",
      "Code Reviews",
    ],
  };

  const technicalSkills2 = {
    languages: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C#",
      "SQL",
      "HTML5",
      "CSS",
    ],
    frameworks: ["React", "Svelte", "Tailwind CSS", "ASP.NET Core"],
    tools: [
      "GitHub",
      "Android Studio",
      "Google Cloud Services",
      "AWS",
      "Stripe",
      "OpenAI API",
      "SQL Server",
      "Selenium",
    ],
    practices: [
      "Agile Methodologies",
      "Test-Driven Development",
      "Rapid Iterative Development",
      "API Integration",
      "Architecture Design",
      "Database Management",
    ],
  };

  const screwClassName =
    "text-gray-500 dark:text-gray-300 animate-spin-rotate shadow-inner rounded-full opacity-50";

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        maxWidth="xl"
        className=""
      >
        <div className=" w-full h-full justify-center items-center mb-4">
          <div id="Home" className="h-full w-full justify-center">
            <BackgroundWithIcons mode={mode} isHovered={true}>
              <div className="space-y-1 md:space-y-0 flex flex-col md:flex-row w-full min-h-[80vh] justify-between md:justify-center items-center bg-slate-200 !bg-opacity-30 dark:bg-gray-800 border-x-4 shadow-md border-x-slate-300 dark:border-x-gray-700 rounded-lg p-1 md:p-8">
                <div className="relative w-full md:h-full md:w-fit h-auto flex items-center justify-center">
                  <div
                    className={`absolute w-1 border-2 border-gray-700 dark:border-white border-dotted opacity-10 rounded-full h-full z-[-2] `}
                  />
                  <div
                    className={`absolute h-1 border-2 border-gray-700 dark:border-white border-dotted opacity-10  rounded-full w-full z-[-2] `}
                  />

                  <div
                    className="w-full md:max-h-1/2 h-auto flex flex-col items-center justify-center bg-slate-200 dark:bg-gray-800 border-y-4 !bg-opacity-45 rounded-lg md:rounded-3xl shadow-lg p-3 md:m-2"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                      transition:
                        "transform 1s ease-in-out, box-shadow 1s ease-in-out",
                      transform: isHovered ? "scale(1.05)" : undefined,
                    }}
                  >
                    {/* <AddCircleIcon
                    className={`absolute top-1 right-1 ${screwClassName}`}
                    color="action"
                  />
                  <AddCircleIcon
                    className={`absolute top-1 left-1 ${screwClassName}`}
                    color="action"
                  />
                  <AddCircleIcon
                    className={`absolute bottom-1 left-1 ${screwClassName}`}
                    color="action"
                  />
                  <AddCircleIcon
                    className={`absolute bottom-1 right-1 ${screwClassName}`}
                    color="action"
                  /> */}

                    <AnimatedAvatar
                      alt="Roba Geleta"
                      src={Roba}
                      sx={{
                        width: { md: "200px", xs: "150px" },
                        height: { md: "200px", xs: "150px" },
                        zIndex: 0,
                      }}
                      isHovered={isHovered}
                    />
                    <Typography
                      variant="h4"
                      component="h1"
                      align="center"
                      gutterBottom
                      className="text-gray-900 dark:text-white pt-2 !font-mono !font-semibold"
                    >
                      Roba Geleta
                    </Typography>
                    <Typography
                      variant="caption"
                      align="center"
                      gutterBottom
                      // color="textSecondary"
                      className="text-gray-700 dark:text-gray-300 text-nowrap"
                    >
                      <Box
                        component="img"
                        src="https://umanitoba.ca/sites/default/files/2022-10/UM-logo-horizontal-black.png"
                        alt="University of Manitoba Logo"
                        sx={{
                          width: "80px",
                          height: "auto",
                          borderRadius: "8px",
                          mb: 1,
                          display: "inline",
                        }}
                        className="dark:invert"
                      />{" "}
                      Bachelor of Computer Science
                    </Typography>
                    <Typography
                      variant="caption"
                      align="center"
                      gutterBottom
                      // color="textSecondary"
                      className="text-gray-700 dark:text-gray-300 text-wrap"
                    >
                      Specializing in Human-Computer Interaction and Computer
                      Graphics
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      mb={0}
                      justifyContent={{ xs: "center", sm: "flex-start" }}
                      alignItems="center"
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
                          href="mailto:contact@geleta.ca"
                          aria-label="Email"
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>

                      <Typography
                        variant="body2"
                        className="text-gray-700 dark:text-gray-300 !text-xs ml-1"
                      >
                        contact@geleta.ca
                      </Typography>
                    </Stack>
                  </div>
                </div>

                <div className="relative flex-1 w-full md:w-1/2 md:h-full flex flex-col justify-center items-center px-4 space-y-1 md:space-y-4 ">
                  <Box
                    component="img"
                    src="https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/ogre_magi.png"
                    alt="Dota 2 Ogre Magi"
                    sx={{
                      width: "100%",
                      height: "auto",
                    }}
                    className="absolute dark:invert z-0 opacity-[3%]"
                  />
                  <Typography
                    align="center"
                    color="info"
                    className="text-gray-700 dark:text-gray-300 !text-3xl md:!text-6xl  "
                  >
                    Full Stack Developer
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    color="textSecondary"
                    className="text-gray-700 dark:text-gray-300  "
                  >
                    I'm a passionate Computer Science graduate with hands-on
                    experience in full-stack development. I thrive in
                    collaborative environments and am committed to building
                    efficient, user-friendly digital solutions.
                  </Typography>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() =>
                      scroller.scrollTo("Experience", {
                        smooth: true,
                        duration: 500,
                        offset: -100,
                      })
                    }
                    className="text-gray-800 dark:text-gray-100 border-gray-400 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition duration-300 px-6 py-2 rounded-md shadow-sm"
                  >
                    My Work Experience
                  </Button>
                </div>
              </div>
            </BackgroundWithIcons>
          </div>

          {/* About */}
        </div>

        {/* Experiences Section */}
        <Box
          sx={{ mt: 6, width: "100%" }}
          className="bg-slate-200 !bg-opacity-30 dark:bg-gray-800 border-x-4 shadow-md border-x-slate-300 dark:border-x-gray-700 rounded-lg p-1 md:p-8"
        >
          <Typography
            id="Experience"
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            className="text-gray-900 dark:text-white"
            sx={{
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: "2rem", sm: "2.5rem" },
            }}
          >
            Experience
          </Typography>
          <Divider className="!mb-4 dark:bg-gray-700" />
          <Box
            sx={{
              width: "100%",
              mt: 4,
            }}
            className=""
          >
            <ExperienceTimeLine />
          </Box>
        </Box>

        {/* Projects Section */}
        <Box
          sx={{ mt: 6, width: "100%" }}
          className="bg-slate-200 !bg-opacity-30 dark:bg-gray-800 border-x-4 shadow-md border-x-slate-300 dark:border-x-gray-700 rounded-lg p-1 md:p-8"
        >
          <Typography
            id="Projects"
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            className="text-gray-900 dark:text-white"
            sx={{
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: "2rem", sm: "2.5rem" },
            }}
          >
            Projects
          </Typography>
          <Divider className="!mb-4 dark:bg-gray-700" />
          <Box
            sx={{
              width: "100%",
              mt: 4,
            }}
            className=""
          >
            <ProjectsList />
          </Box>
        </Box>

        {/* Technical Skills Section */}
        <Box
          sx={{ mt: 6, width: "100%" }}
          className="bg-slate-200 !bg-opacity-30 dark:bg-gray-800 border-x-4 shadow-md border-x-slate-300 dark:border-x-gray-700 rounded-lg p-1 md:p-8"
        >
          {/* Main Technical Skills Header */}

          <Typography
            id="Skills"
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            className="text-gray-900 dark:text-white"
            sx={{
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: "2rem", sm: "2.5rem" },
            }}
          >
            Technical Skills
          </Typography>
          <Divider className="!mb-4 dark:bg-gray-700" />

          {/* Languages & Web Technologies */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              component="h3"
              align="center"
              className="flex items-center justify-center text-gray-800 dark:text-gray-200 font-medium mb-2"
            >
              <CodeIcon className="mr-1 text-blue-500" />
              Languages & Web Technologies
            </Typography>
            <div className="flex flex-wrap justify-center">
              {technicalSkills.languages.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  variant="outlined"
                  className="m-1 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                />
              ))}
            </div>
          </Box>

          {/* Frameworks & Libraries */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              component="h3"
              align="center"
              className="flex items-center justify-center text-gray-800 dark:text-gray-200 font-medium mb-2"
            >
              <Settings className="mr-1 text-green-500" />
              Frameworks & Libraries
            </Typography>
            <div className="flex flex-wrap justify-center">
              {technicalSkills.frameworks.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  variant="outlined"
                  className="m-1 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                />
              ))}
            </div>
          </Box>

          {/* Tools & Platforms */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              component="h3"
              align="center"
              className="flex items-center justify-center text-gray-800 dark:text-gray-200 font-medium mb-2"
            >
              <BuildIcon className="mr-1 text-yellow-500" />
              Tools & Platforms
            </Typography>
            <div className="flex flex-wrap justify-center">
              {technicalSkills.tools.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  variant="outlined"
                  className="m-1 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                />
              ))}
            </div>
          </Box>

          {/* Development Practices */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              component="h3"
              align="center"
              className="flex items-center justify-center text-gray-800 dark:text-gray-200 font-medium mb-2"
            >
              <SpeedIcon className="mr-1 text-red-500" />
              Development Practices
            </Typography>
            <div className="flex flex-wrap justify-center">
              {technicalSkills.practices.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  variant="outlined"
                  className="m-1 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                />
              ))}
            </div>
          </Box>
        </Box>

        <Box sx={{ mt: 6, width: "100%", maxWidth: 800 }}>
          <ContactForm />
        </Box>
      </Container>
    </>
  );
}
