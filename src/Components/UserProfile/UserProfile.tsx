// UserProfile.tsx

import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Typography,
  Button,
  Stack,
  Tooltip,
  Chip,
  Grid2 as Grid,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import AnimatedAvatar from "../AnimatedAvatar/AnimatedAvatar";
import AutoScrollEmblaCarousel from "../EmblaCarousel/AutoScrollEmblaCarousel/AutoScrollEmblaCarousel";
import AutoplayEmblaCarousel from "../EmblaCarousel/AutoPlayEmblaCarousel/AutoPlayEmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import ExperienceDialog from "../ExperienceDialog/ExperienceDialog";
import ProjectDialog from "../ProjectDialog/ProjectDialog";
// import "../../css/base.css";
// import "../../css/sandbox.css";
import "../../css/embla.css";
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import SpeedIcon from "@mui/icons-material/Speed";
import Settings from "@mui/icons-material/Settings";
import { ThemeContext } from "../../Context/ThemeContext";

export default function UserProfile() {
  const { mode } = useContext(ThemeContext);
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  const [openProjectDialog, setOpenProjectDialog] = useState<number | null>(
    null
  );

  // Experience Data
  const experiences = [
    {
      title: "Software Developer Co-op - Partner Services",
      company: "Priceline Partner Solution",
      date: "Jan 2023 – Apr 2023",
      location: "Winnipeg, MB",
      summary:
        "Collaborated in a team to develop a user-friendly product activation page for Priceline’s partners across 200+ countries. Utilized React for UI components, Go for server-side logic, and SQL for database queries and analysis.",
      link: "/experience/priceline",
      image: "/src/assets/PPSLogo.svg", // Default image path
      background: "/src/assets/PPSBackground.webp", // Default background path
      technologies: "JavaScript, TypeScript, React, Go, Harness, SQL",
      responsibilities: [
        "Collaborated in a team to develop a user-friendly product activation page for Priceline’s partners across 200+ countries. Utilized React for UI components, Go for server-side logic, and SQL for database queries and analysis.",
        "Implemented features to manage multiple inventory types and flexible payment options, applying agile methodologies and test-driven development throughout the process.",
        "Enhanced project maintainability by updating documentation pages, converting JavaScript files to TypeScript, and resolving legacy lint errors, significantly improving code quality and type safety.",
        "Implemented Google Secret Manager for Partner Services Division projects, replacing the outgoing Harness Secret Manager, thereby improving security and streamlining secret management processes.",
      ],
    },
    {
      title: "Freelance Coding Expert | AI Model Trainer",
      company: "Outlier AI",
      date: "Sept 2024 – Oct 2024",
      location: "Winnipeg, MB",
      summary:
        "Conducted code reviews and rated AI-generated solutions in Python, Java, JavaScript, and C++, adhering to strict documentation and guidelines. Crafted, solved, and reviewed technical coding problems, developing test cases to refine AI model capabilities and improve code efficiency.",
      link: "/experience/outlier-ai",
      image: "/src/assets/OutlierAILogo.svg",
      background: "/src/assets/OutlierAIBackground.webp", // Default background path
      technologies: "Python, Java, JavaScript, C++",
      responsibilities: [
        "Conducted code reviews and rated AI-generated solutions in Python, Java, JavaScript, and C++, adhering to strict documentation and guidelines.",
        "Crafted, solved, and reviewed technical coding problems, developing test cases to refine AI model capabilities and improve code efficiency.",
      ],
    },
  ];

  // Projects Data
  const projects = [
    {
      title: "App.Bookingwith.me",
      technologies:
        "Svelte, JavaScript, Tailwind CSS, Flowbite, OpenAI API, OAuth, Twilio, Stripe",
      date: "Jun. 2024",
      summary:
        "Co-developed an advanced online booking platform that enables businesses to manage appointments and schedules in real-time, enhancing operational efficiency and user engagement.",
      link: "/projects/bookingwithme",
      image: "/src/assets/Projects/AppBookingWithMe/AppBookingWithMe.png",
      logo: "/src/assets/Projects/AppBookingWithMe/AppBookingWithMeLogo.png",
      githubLink: "https://github.com/ngDuyAnh/bookingwith.me-svelte",
      websiteLink: "https://app.bookingwith.me",
      details: [
        "Co-developed an advanced online booking platform that enables businesses to manage appointments and schedules in real-time, enhancing operational efficiency and user engagement.",
        "Designed and implemented a responsive, user-friendly interface using open-source libraries, featuring interactive calendars and drag-and-drop functionality to improve usability across various devices.",
        "Spearheaded OAuth integration for secure authentication and deployed automated SMS notifications and Google review requests via Twilio. This feature is now used by 3 businesses, enhancing their customer interactions and business ratings.",
        "Contributed to rapid feature deployment to meet tight deadlines, demonstrating adaptability and a commitment to timely, effective updates.",
      ],
    },
    {
      title: "BookWorm Mobile Application",
      technologies: "Java, Android SDK, Gradle, Adobe Premiere Pro, GitLab",
      date: "Sept. 2024",
      summary:
        "Collaborated in the full-stack development of a mobile application similar to Goodreads, primarily focusing on architecture design, testing, and database management.",
      link: "/projects/bookworm",
      image: "/src/assets/Projects/BookWorm/BookWorm.png",
      logo: "/src/assets/Projects/BookWorm/bookWormLogo.webp",
      githubLink: "https://github.com/jaredmdp/BookWorm",
      websiteLink: "https://bookwormhonda.vercel.app/",
      details: [
        "Collaborated in the full-stack development of a mobile application similar to Goodreads, primarily focusing on architecture design, testing, and database management.",
        "Contributed to promotional content creation using Adobe Premiere Pro and managed version control with Git.",
      ],
    },
    {
      title: "Succinct",
      technologies:
        "ReactJS, TypeScript, Python, MaterialUI, Google Cloud Functions",
      date: "2022",
      summary:
        "Developed backend using Python and Google Cloud Functions, integrating APIs for video summarization, text classification, and topic extraction.",
      link: "/projects/succinct",
      image: "/src/assets/Projects/Succinct/Succinct.png",
      logo: "/src/assets/Projects/Succinct/SuccinctLogo.png",
      githubLink: "https://github.com/ArshSB/Succinct",
      details: [
        "Developed backend using Python and Google Cloud Functions,integrating APIs for video summarization, text classification, and topic extraction.",
        "Collaborated to create a responsive frontend with ReactJS and MaterialUI, enabling users to obtain and interact with YouTube video summaries.",
      ],
    },
    {
      title: "Dark/Night Mode For Wikipedia",
      technologies: "JavaScript, Chrome Extension API",
      date: "2022",
      summary:
        "Developed a Chrome extension enabling dark mode for Wikipedia and sister projects, intelligently adjusting page elements’ colors to improve readability for 150+ users.",
      link: "/projects/dark-mode-wikipedia",
      image: "/src/assets/Projects/Wikipedia/Wikipedia.png",
      logo: "/src/assets/Projects/Wikipedia/Logo.png",
      githubLink:
        "https://github.com/Roba-Geleta/Dark-Night-Mode-For-Wikipedia",
      details: [
        "Developed a Chrome extension enabling dark mode for Wikipedia and sister projects, intelligently adjusting page elements’ colors to improve readability for 150+ users.",
        "Implemented efficient tab management and state persistence, ensuring seamless dark mode activation across browser sessions.",
      ],
    },
    {
      title: "Gratitude Prototype",
      technologies: "JavaScript, Bootstrap",
      date: "2021",
      summary:
        "Collaborated in a team to design a mood-tracking website as part of a university Human-Computer Interaction course, focusing on user-centered design principles and enhancing UI with Bootstrap.",
      link: "/projects/gratitude-prototype",
      image: "/src/assets/Projects/Gratitude/Gratitude.png",
      logo: "/src/assets/Projects/Gratitude/GratitudeLogo.png",
      githubLink: "https://github.com/scottjodoin/gratitude-prototype",
      details: [
        "Collaborated in a team to design a mood-tracking website as part of a university Human-Computer Interaction course, focusing on user-centered design principles and enhancing UI with Bootstrap.",
        "Worked closely with stakeholders to gather requirements and feedback, ensuring the final product met user needs and expectations.",
      ],
    },
    {
      title: "Aurora-Selenium-Scrape & roBot",
      technologies: "Python, Selenium, Discord, Webdriver, JSON",
      date: "2021",
      summary:
        "Engineered a robust web scraping tool using Selenium to extract and organize data for approximately 6,500 courses from the University of Manitoba’s Aurora system. Developed 'roBot', a Discord bot hosted on Google Cloud Services, providing students with instant access to course information.",
      link: "/projects/aurora-selenium-robot",
      image: "/src/assets/Projects/ScrapeRobot/ScrapeRobot.png",
      logo: "/src/assets/Projects/ScrapeRobot/ScrapeRobot.png",
      githubLink: "https://github.com/Roba-Geleta/roBot",
      details: [
        "Engineered a robust web scraping tool using Selenium to extract and organize data for approximately 6,500 courses from the University of Manitoba’s Aurora system, implementing error handling and JSON storage for efficient management.",
        "Developed and deployed ’roBot’, a Discord bot hosted on Google Cloud Services, which served 10 servers and provided students with instant access to course information, enhancing course planning efficiency.",
      ],
    },
  ];

  // Technical Skills
  const technicalSkills = {
    languages: [
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
    ],
    frameworks: [
      "React",
      "Svelte",
      "Material UI",
      "Bootstrap",
      "Tailwind CSS",
      "Flowbite",
      "Android SDK",
    ],
    tools: [
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
      "Adobe Premiere Pro",
    ],
    practices: [
      "Agile Methodologies",
      "Test-Driven Development",
      "Rapid Iterative Development",
      "Version Control",
      "API Integration",
      "Chrome Extension Development",
      "Discord Bot Development",
    ],
  };

  // Convert skills arrays to arrays of <Chip> components
  const renderChips = (
    skills: string[],
    color: "primary" | "secondary" | "success" | "warning"
  ) =>
    skills.map((skill, index) => (
      <Chip
        key={index}
        label={skill}
        color={color}
        variant="outlined"
        sx={{ m: 0.5 }}
      />
    ));

  const experienceSlides = experiences.map((exp, index) => (
    <Box
      key={index}
      className="experience-slide border-2 border-gray-300 dark:border-gray-500"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        height: "100%",
        boxSizing: "border-box",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${exp.background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: mode === "dark" ? "invert(1)" : "invert(0)",
          opacity: 0.1,
          zIndex: -1,
        },
      }}
    >
      {/* SVG Image */}
      <Box
        component="img"
        src={exp.image}
        alt={`${exp.company} Logo`}
        sx={{
          width: { xs: "80px", md: "120px" },
          height: "auto",
          marginRight: { md: 4 },
          marginBottom: { xs: 2, md: 0 },
        }}
      />

      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: mode === "dark" ? "common.white" : "text.primary",
          }}
        >
          {exp.title}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: mode === "dark" ? "grey.400" : "grey.700",
            marginTop: 0.5,
          }}
        >
          {exp.company} | {exp.date} | {exp.location}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, color: mode === "dark" ? "grey.300" : "grey.700" }}
        >
          {exp.summary}
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="primary"
          // href={exp.link} // Remove this since we're not navigating
          onClick={() => setOpenDialog(index)} // Open the dialog for this experience
          sx={{ mt: 2, alignSelf: { xs: "center", md: "flex-start" } }}
        >
          Read More
        </Button>
      </Box>
    </Box>
  ));

  // Prepare Projects slides
  const projectsSlides = projects.map((project, index) => (
    <Grid
      container
      spacing={4}
      alignItems="center"
      key={index}
      direction={index % 2 === 0 ? "row" : "row-reverse"} // Alternate image positions
      sx={{ mb: 4 }}
    >
      {/* Image Section */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          component="img"
          src={project.image}
          alt={project.title}
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: 2,
          }}
        />
      </Grid>

      {/* Text Content Section */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: mode === "dark" ? "common.white" : "text.primary",
          }}
        >
          {project.title}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: mode === "dark" ? "grey.400" : "grey.700",
            marginTop: 0.5,
          }}
        >
          {project.date}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, color: mode === "dark" ? "grey.300" : "grey.700" }}
        >
          {project.summary}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            mt: 1,
            display: "block",
            color: mode === "dark" ? "grey.500" : "grey.600",
          }}
        >
          <strong>Technologies:</strong> {project.technologies}
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => setOpenProjectDialog(index)} // Open the dialog
          sx={{ mt: 2 }}
        >
          Read More
        </Button>
      </Grid>
    </Grid>
  ));

  const carouselOptions: EmblaOptionsType = {
    loop: true,
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Avatar */}
        <AnimatedAvatar
          alt="Roba Geleta"
          src="/src/assets/Roba.webp"
          sx={{ width: 270, height: 270, mb: 2 }}
        />
        {/* Name */}
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          className="text-gray-900 dark:text-white"
        >
          Roba Geleta
        </Typography>
        {/* Education */}
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
        {/* About */}
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

        {/* Social Media Links */}
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Tooltip title="LinkedIn">
            <Button
              color="info"
              variant="text"
              href="https://www.linkedin.com/in/roba-geleta/"
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
              href="https://github.com/Roba-Geleta"
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
              href="mailto:geletaroba@yahoo.ca"
              aria-label="Email"
            >
              <EmailIcon fontSize="large" />
            </Button>
          </Tooltip>
        </Stack>

        {/* Experiences Section */}
        <Box sx={{ mt: 6, width: "100%", maxWidth: 1000 }}>
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
          <Box sx={{ width: "100%", mt: 4, height: "500px" }}>
            <AutoplayEmblaCarousel
              slides={experienceSlides}
              options={carouselOptions}
              autoplayOptions={{
                playOnInit: true,
                startDelay: 4000, // 4 seconds
              }}
            />
          </Box>
        </Box>

        {/* Projects Section */}
        <Box sx={{ mt: 6, width: "100%", maxWidth: 1200 }}>
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
          <Box sx={{ mt: 2 }}>{projectsSlides}</Box>
        </Box>
        {/* Technical Skills Carousel at the Bottom */}
        <Box sx={{ mt: 6, width: "100%", maxWidth: 800 }}>
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

          {/* Languages & Web Technologies Carousel */}
          <Box sx={{ mb: 3, width: "100%" }}>
            <Typography
              variant="h6"
              component="h3"
              align="center"
              className="text-gray-800 dark:text-gray-200"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "medium",
              }}
            >
              <CodeIcon sx={{ mr: 1, color: "primary.main" }} />
              Languages & Web Technologies
            </Typography>
            <Box sx={{ overflow: "hidden", width: "100%", mt: 1 }}>
              <AutoScrollEmblaCarousel
                slides={renderChips(technicalSkills.languages, "primary")}
                options={carouselOptions}
                autoplayOptions={{
                  playOnInit: true,
                  speed: 2,
                }}
              />
            </Box>
          </Box>

          {/* Frameworks & Libraries Carousel */}
          <Box sx={{ mb: 3, width: "100%" }}>
            <Typography
              variant="h6"
              component="h3"
              align="center"
              className="text-gray-800 dark:text-gray-200"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "medium",
              }}
            >
              <Settings sx={{ mr: 1, color: "secondary.main" }} />
              Frameworks & Libraries
            </Typography>
            <Box sx={{ overflow: "hidden", width: "100%", mt: 1 }}>
              <AutoScrollEmblaCarousel
                slides={renderChips(technicalSkills.frameworks, "secondary")}
                options={carouselOptions}
                autoplayOptions={{
                  playOnInit: true,
                  speed: 2,
                }}
              />
            </Box>
          </Box>

          {/* Tools & Platforms Carousel */}
          <Box sx={{ mb: 3, width: "100%" }}>
            <Typography
              variant="h6"
              component="h3"
              align="center"
              className="text-gray-800 dark:text-gray-200"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "medium",
              }}
            >
              <BuildIcon sx={{ mr: 1, color: "success.main" }} />
              Tools & Platforms
            </Typography>
            <Box sx={{ overflow: "hidden", width: "100%", mt: 1 }}>
              <AutoScrollEmblaCarousel
                slides={renderChips(technicalSkills.tools, "success")}
                options={carouselOptions}
                autoplayOptions={{
                  playOnInit: true,
                  speed: 2,
                }}
              />
            </Box>
          </Box>

          {/* Development Practices Carousel */}
          <Box sx={{ mb: 3, width: "100%" }}>
            <Typography
              variant="h6"
              component="h3"
              align="center"
              className="text-gray-800 dark:text-gray-200"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "medium",
              }}
            >
              <SpeedIcon sx={{ mr: 1, color: "warning.main" }} />
              Development Practices
            </Typography>
            <Box sx={{ overflow: "hidden", width: "100%", mt: 1 }}>
              <AutoScrollEmblaCarousel
                slides={renderChips(technicalSkills.practices, "warning")}
                options={carouselOptions}
                autoplayOptions={{
                  playOnInit: true,
                  speed: 2,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Experience Dialog */}
      {openDialog !== null && (
        <ExperienceDialog
          open={openDialog !== null}
          onClose={() => setOpenDialog(null)}
          experience={experiences[openDialog]}
          mode={mode}
        />
      )}

      {/* Project Dialog */}
      {openProjectDialog !== null && (
        <ProjectDialog
          open={openProjectDialog !== null}
          onClose={() => setOpenProjectDialog(null)}
          project={projects[openProjectDialog]}
          mode={mode}
        />
      )}
    </>
  );
}
