import { useContext, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Typography,
  Button,
  Chip,
  Grid2 as Grid,
  Tooltip,
  Divider,
} from "@mui/material";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import AutoplayEmblaCarousel from "../EmblaCarousel/AutoPlayEmblaCarousel/AutoPlayEmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import ExperienceDialog from "../ExperienceDialog/ExperienceDialog";
import ProjectDialog from "../ProjectDialog/ProjectDialog";
import "../../css/embla.css";
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import SpeedIcon from "@mui/icons-material/Speed";
import Settings from "@mui/icons-material/Settings";
import ConstructionIcon from "@mui/icons-material/Construction";
import { ThemeContext } from "../../Context/ThemeContext";
// Experience Images
import PPSLogo from "../../assets/PPSLogo.svg";
import PPSBackground from "../../assets/PPSBackground.webp";
import OutlierAILogo from "../../assets/OutlierAILogo.svg";
import OutlierAIBackground from "../../assets/OutlierAIBackground.webp";

// Projects Images
import AppBookingWithMe from "../../assets/Projects/AppBookingWithMe/AppBookingWithMe.png";
import AppBookingWithMeLogo from "../../assets/Projects/AppBookingWithMe/AppBookingWithMeLogo.png";
import BookWorm from "../../assets/Projects/BookWorm/BookWorm.png";
import BookWormLogo from "../../assets/Projects/BookWorm/bookWormLogo.webp";
import Gratitude from "../../assets/Projects/Gratitude/Gratitude.png";
import GratitudeLogo from "../../assets/Projects/Gratitude/GratitudeLogo.png";
import Succinct from "../../assets/Projects/Succinct/Succinct.png";
import SuccinctLogo from "../../assets/Projects/Succinct/SuccinctLogo.png";
import Wikipedia from "../../assets/Projects/Wikipedia/Wikipedia.png";
import WikipediaLogo from "../../assets/Projects/Wikipedia/Logo.png";
import ScrapeRobot from "../../assets/Projects/ScrapeRobot/ScrapeRobot.png";
import StocksImage1 from "../../assets/Projects/Stocks/Company.png";
import StocksImage2 from "../../assets/Projects/Stocks/Stocks.png";
import { DatabaseStatusContext } from "../../Context/DatabaseStatusContext";
import ConnectionStatusFeedBack from "../ConnectionStatusFeedBack/ConnectionStatusFeedBack";
import { NetworkStatusContext } from "../../Context/NetworkStatusContext";
import AvatarWithIcons from "../AvatarWithIcons/AvatarWithIcons";
import ContactForm from "../ContactForm/ContactForm";

export default function UserProfile() {
  const { mode } = useContext(ThemeContext);
  const { isDatabaseResuming, hasDatabaseRetriesExceeded } = useContext(
    DatabaseStatusContext
  );
  const { isBackendReachable, hasNetworkErrorRetriesExceeded } =
    useContext(NetworkStatusContext);
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  const [openProjectDialog, setOpenProjectDialog] = useState<number | null>(
    null
  );

  const valid = useMemo(
    () =>
      isDatabaseResuming ||
      hasDatabaseRetriesExceeded ||
      hasNetworkErrorRetriesExceeded ||
      !isBackendReachable,
    [
      isDatabaseResuming,
      hasDatabaseRetriesExceeded,
      hasNetworkErrorRetriesExceeded,
      isBackendReachable,
    ]
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
      image: PPSLogo, // Default image path
      background: PPSBackground, // Default background path
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
      image: OutlierAILogo,
      background: OutlierAIBackground, // Default background path
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
      image: AppBookingWithMe,
      logo: AppBookingWithMeLogo,
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
      image: BookWorm,
      logo: BookWormLogo,
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
      image: Succinct,
      logo: SuccinctLogo,
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
      image: Wikipedia,
      logo: WikipediaLogo,
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
      image: Gratitude,
      logo: GratitudeLogo,
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
      image: ScrapeRobot,
      logo: ScrapeRobot,
      githubLink: "https://github.com/Roba-Geleta/roBot",
      details: [
        "Engineered a robust web scraping tool using Selenium to extract and organize data for approximately 6,500 courses from the University of Manitoba’s Aurora system, implementing error handling and JSON storage for efficient management.",
        "Developed and deployed ’roBot’, a Discord bot hosted on Google Cloud Services, which served 10 servers and provided students with instant access to course information, enhancing course planning efficiency.",
      ],
    },
  ];

  // Latest Project Data
  const latestProject = {
    title: "Financial Insights Platform",
    description:
      "Developed a secure platform for users to search and analyze comprehensive financial data of various companies. The platform features user authentication, portfolio management, and a community commenting system to foster user engagement and discussion.",
    technologies: [
      "ASP.NET Core",
      "PostgreSQL",
      "C#",
      "TypeScript",
      "React",
      "ESLint",
      "AWS Amplify",
      "AWS Elastic Beanstalk",
      "AWS RDS",
      "Cloudflare",
      "Financial Modeling Prep API",
      "Google Cloud Functions",
    ],
    images: [StocksImage1, StocksImage2],
    link: "/stocks",
  };

  // Function to render technologies as Typography
  const renderTechnologyText = (technologies: string[]) => {
    return technologies.join(", ");
  };

  // Updated Technical Skills
  const technicalSkills = {
    languages: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "Go",
      "C",
      "C++",
      "C#",
      "SQL",
      "HTML5",
      "CSS",
      "JSON",
    ],
    frameworks: [
      "React",
      "Svelte",
      "Material-UI",
      "Bootstrap",
      "Tailwind CSS",
      "Flowbite",
      "Android SDK",
      "ASP.NET Core",
    ],
    tools: [
      "GitHub",
      "JUnit",
      "JupyterLab",
      "Android Studio",
      "Google Cloud Functions",
      "Stripe",
      "Twilio",
      "OpenAI API",
      "OAuth",
      "Selenium",
      "SQL Server",
      "Chrome Extension",
      "Google Cloud Services",
      "AWS (Amplify, Elastic Beanstalk, RDS)",
      "Cloudflare",
      "Financial Modeling Prep API",
      "Google Secret Manager",
      "Harness",
    ],
    practices: [
      "Agile Methodologies",
      "Test-Driven Development",
      "Rapid Iterative Development",
      "Version Control",
      "API Integration",
      "Chrome Extension Development",
      "Discord Bot Development",
      "User-Centered Design",
      "Architecture Design",
      "Database Management",
      "Code Reviews",
    ],
  };

  // Convert skills arrays to arrays of <Chip> components
  const renderChips = (
    skills: string[],
    color: "primary" | "secondary" | "success" | "warning"
  ) =>
    skills.map((skill, index) => (
      <Tooltip
        key={index}
        title={skill} // Add a tooltip for best practices
      >
        <Chip
          key={index}
          label={skill}
          color={color}
          variant="outlined"
          sx={{ m: 0.5 }}
          className="min-w-fit sm:!mx-[20px]"
        />
      </Tooltip>
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
          opacity: 0.17,
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
        maxWidth="xl"
      >
        <div id="Home" className="w-full flex justify-center">
          <AvatarWithIcons mode={mode} />
        </div>
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

        {/* Technical Skills Section */}
        <Box sx={{ mt: 6, width: "100%" }} className="">
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

        {/* Experiences Section */}
        <Box sx={{ mt: 6, width: "100%" }}>
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
        <Box sx={{ mt: 6, width: "100%" }}>
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
              position: "relative",
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              width: "100%",
              maxWidth: 1200,
              borderRadius: "0.62rem",
              overflow: "hidden",
              boxShadow:
                mode === "dark"
                  ? "0 0 15px rgba(255, 215, 0, 0.7)"
                  : "0 0 15px rgba(255, 165, 0, 0.7)",
              border: `2px solid ${mode === "dark" ? "#FFD700" : "#FFA500"}`,
              mb: 4,
              backgroundColor: mode === "dark" ? "#2c2c2c" : "#fff8e1",
              padding: { xs: 2, md: 0 },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: -1,
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: "3px 6px",
                zIndex: 2,
                boxShadow: 1,
              }}
              className="rounded-br-lg z-10"
            >
              <NewReleasesIcon sx={{ color: "warning.main", mr: 0.5 }} />
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "bold",
                  color: "warning.main",
                }}
              >
                Latest Project
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: { xs: "100%", md: "60%" },
                padding: { xs: 2, md: 4 },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  color: mode === "dark" ? "grey.100" : "grey.900",
                }}
              >
                {latestProject.title}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <ConstructionIcon
                    sx={{ color: "warning.main", fontSize: "1rem", mr: 0.3 }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "warning.main",
                      fontWeight: "bold",
                    }}
                  >
                    Work In Progress
                  </Typography>
                </Box>
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: mode === "dark" ? "grey.300" : "grey.800" }}
              >
                {latestProject.description}
              </Typography>
              {/* Technologies Section */}
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  display: "block",
                  color: mode === "dark" ? "grey.500" : "grey.600",
                }}
              >
                <strong>Technologies:</strong>{" "}
                {renderTechnologyText(latestProject.technologies)}
              </Typography>
              <ConnectionStatusFeedBack />
              <Button
                size="medium"
                variant={"contained"}
                color={"primary"}
                href={latestProject.link}
                sx={{
                  mt: 2,
                  color: !valid
                    ? mode == "light"
                      ? "white !important"
                      : "white !important"
                    : mode == "dark"
                    ? "white !important"
                    : "gray !important",
                }}
                disabled={valid}
              >
                {/* {isDatabaseResumin || } */}
                {!isBackendReachable && !hasNetworkErrorRetriesExceeded ? (
                  <span>Connecting to Backend... </span>
                ) : isDatabaseResuming && !hasDatabaseRetriesExceeded ? (
                  <span>Database Resuming... </span>
                ) : (
                  "Visit Stocks Page"
                )}
              </Button>
            </Box>

            {/* Image Section */}
            <Box
              sx={{
                width: { xs: "100%", md: "40%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: { xs: 2, md: 1 },
                order: { xs: 1, md: 2 },
              }}
            >
              <Box
                component="img"
                src={latestProject.images[0]}
                alt="Stocks Project Screenshot"
                sx={{
                  width: { xs: "100%", md: "100%" },
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: 1,
                  boxShadow: 2,
                }}
              />
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>{projectsSlides}</Box>
        </Box>

        <Box sx={{ mt: 6, width: "100%", maxWidth: 800 }}>
          <ContactForm />
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
