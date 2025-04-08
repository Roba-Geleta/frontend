import { useContext, useMemo, useState } from "react";
import { DatabaseStatusContext } from "../../Context/DatabaseStatusContext";
import ConnectionStatusFeedBack from "../ConnectionStatusFeedBack/ConnectionStatusFeedBack";
import { NetworkStatusContext } from "../../Context/NetworkStatusContext";
import SentimentDemo from "../SentimentDemo/SentimentDemo";
import {
  Typography,
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { MdOpenInNew } from "react-icons/md";
import ConstructionIcon from "@mui/icons-material/Construction";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import ProjectDialog from "../ProjectDialog/ProjectDialog";

import { ThemeContext } from "../../Context/ThemeContext";

export default function ProjectsList() {
  const Sentiment =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/Projects/Sentiment/Sentiment.png";
  const SentimentLogo =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/Projects/Sentiment/Logo.png";
  const BookWorm =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/Projects/BookWorm/BookWorm.png";
  const BookWormLogo =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/Projects/BookWorm/bookWormLogo.webp";
  const Gratitude =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/Projects/Gratitude/Gratitude.png";
  const GratitudeLogo =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/Projects/Gratitude/GratitudeLogo.png";
  const Succinct =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/Projects/Succinct/Succinct.png";
  const SuccinctLogo =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/Projects/Succinct/SuccinctLogo.png";
  const Wikipedia =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/Projects/Wikipedia/Wikipedia.png";
  const WikipediaLogo =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/Projects/Wikipedia/Logo.png";
  const ScrapeRobot =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/Projects/ScrapeRobot/ScrapeRobot.png";
  const Hero =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/StocksHome/Hero.svg";

  const { mode } = useContext(ThemeContext);

  const { isDatabaseResuming, hasDatabaseRetriesExceeded } = useContext(
    DatabaseStatusContext
  );
  const { isBackendReachable, hasNetworkErrorRetriesExceeded } =
    useContext(NetworkStatusContext);
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

  const projects = [
    {
      title: "Binary Sentiment Feedback System",
      technologies:
        "Python, NLTK, scikit-learn, Google Cloud Functions, React, Joblib",
      date: "Dec. 2023",
      summary:
        "A research project developed as part of a data mining course, focusing on binary sentiment classification of Amazon reviews via n-grams for context understanding.",
      link: "/projects/sentiment-analysis",
      image: Sentiment,
      logo: SentimentLogo,
      githubLink: "",
      websiteLink:
        "https://link.springer.com/chapter/10.1007/978-3-031-78554-2_14",
      children: (
        <div className="space-y-4">
          <Typography
            variant="body2"
            sx={{ fontSize: "0.875rem" }}
            color={mode === "dark" ? "grey.300" : "grey.700"}
          >
            To access the research paper, click{" "}
            <a
              href="https://link.springer.com/chapter/10.1007/978-3-031-78554-2_14"
              target="_blank"
              style={{
                color: mode === "dark" ? "lightblue" : "blue",
                textDecoration: "none",
                display: "inline-block",
                position: "relative",
              }}
            >
              HERE
              <MdOpenInNew
                style={{
                  position: "absolute",
                  right: "-15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "small",
                }}
              />
            </a>
          </Typography>
          <SentimentDemo />
        </div>
      ),
      details: [
        "Utilized n-grams (bigram and trigram) to capture context in Amazon reviews, enhancing classification accuracy.",
        "Implemented data preprocessing (HTML tag removal, tokenization, lemmatization, and stopword removal) to ensure higher quality input.",
        "Fine-tuned SVM hyperparameters via GridSearch, achieving 86.4% accuracy on binary-class (positive/negative) Amazon reviews.",
        "Integrated the trained model into an application using Google Cloud Functions, allowing users to submit reviews on the fly.",
        "Highlighted the importance of balanced datasets and resource considerations for large-scale text classification.",
      ],
    },
    {
      title: "BookWorm Mobile Application",
      technologies: "Java, Android SDK, Gradle, Adobe Premiere Pro, GitLab",
      date: "Sept. 2023",
      summary:
        "Collaborated in the full-stack development of a mobile application similar to Goodreads as part of a university Software Engineering course, primarily focusing on architecture design, testing, and database management.",
      link: "/projects/bookworm",
      image: BookWorm,
      logo: BookWormLogo,
      githubLink: "https://github.com/jaredmdp/BookWorm",
      websiteLink: "https://bookwormhonda.vercel.app/",
      details: [
        "Collaborated in the full-stack development of a mobile application similar to Goodreads as part of a university Software Engineering course, primarily focusing on architecture design, testing, and database management.",
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
      "AWS (Amplify, Elastic Beanstalk, RDS, Lambda)",
      "Cloudflare",
      "Financial Modeling Prep API",
      "Google Cloud Functions",
      "Github Actions",
    ],
    images: [Hero],
    link: "/stocks",
  };

  const projectsCards = projects.map((project, i) => (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 200,
        maxWidth: 300,
        maxHeight: 800,
        backgroundColor: mode === "dark" ? "#2c2c2c" : "#fff8e12f",
      }}
      className="border-gray-300 dark:border-gray-700"
    >
      <CardHeader
        title={project.title}
        subheader={project.date}
        sx={{
          "& .MuiCardHeader-subheader": {
            color: mode === "dark" ? "grey.400" : "grey.700",
          },
          "& .MuiCardHeader-title": {
            fontWeight: "bold",
            color: mode === "dark" ? "common.white" : "text.primary",
          },
        }}
      />
      <div className="w-full h-[200px] overflow-hidden relative bg-cover object-left">
        <CardMedia
          component="img"
          image={project.image}
          alt="Project Snippet"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover !important",
            objectPosition: "left",
            paddingX: "3px",
          }}
        />
      </div>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{ color: mode === "dark" ? "grey.300" : "grey.700" }}
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
      </CardContent>
      <CardActions disableSpacing sx={{ mt: "auto", justifyContent: "end" }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => setOpenProjectDialog(i)}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  ));
  {
    /* <Grid
        container
        spacing={4}
        alignItems="center"
        key={i}
        direction={"row"}
        sx={{
          mb: 4,
        }}
        className="px-3 border-2 rounded-lg border-gray-300 dark:border-gray-700 shadow-lg"
      >
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            position: "relative",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Box
            component="img"
            src={project.image}
            alt={project.title}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "fill",
              backgroundPosition: "fill",
              filter: "blur(50px)",
              zIndex: 0,
            }}
          />
          <Box
            component="img"
            src={project.image}
            alt={project.title}
            sx={{
              position: "relative",
              width: "100%",
              height: "auto",
              maxHeight: "300px",
              objectFit: "contain",
              zIndex: 3,
            }}
          />
        </Grid>
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
            sx={{ color: mode === "dark" ? "grey.400" : "grey.700", mt: 0.5 }}
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
            onClick={() => setOpenProjectDialog(i)}
            sx={{ mt: 2 }}
          >
            Read More
          </Button>
        </Grid>
      </Grid> */
  }

  const renderTechnologyText = (technologies: string[]) => {
    return technologies.join(", ");
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column-reverse", lg: "row" },
            width: "100%",
            borderRadius: "0.62rem",
            overflow: "hidden",
            boxShadow:
              mode === "dark"
                ? "0 0 15px rgba(255, 215, 0, 0.7)"
                : "0 0 15px rgba(255, 165, 0, 0.7)",
            border: `2px solid ${mode === "dark" ? "#FFD700" : "#FFA500"}`,
            mb: 4,
            backgroundColor: mode === "dark" ? "#2c2c2c" : "#fff8e1",
            p: { xs: 2, md: 0 },
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
              p: "3px 6px",
              zIndex: 2,
              boxShadow: 1,
              borderRadius: "0 0 0.25rem 0",
            }}
          >
            <NewReleasesIcon sx={{ color: "warning.main", mr: 0.5 }} />
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", color: "warning.main" }}
            >
              Latest Project
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: { xs: "100%", lg: "60%" },
              p: { xs: 2, lg: 4 },
              textAlign: { xs: "center", lg: "left" },
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
                  sx={{ color: "warning.main", fontWeight: "bold" }}
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
              variant="contained"
              color="primary"
              href={latestProject.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                mt: 2,
                color: !valid
                  ? "white !important"
                  : mode === "dark"
                  ? "white !important"
                  : "gray !important",
              }}
              disabled={valid}
            >
              {!isBackendReachable && !hasNetworkErrorRetriesExceeded
                ? "Connecting to Backend... "
                : isDatabaseResuming && !hasDatabaseRetriesExceeded
                ? "Database Resuming... "
                : "Visit Stocks Page"}
            </Button>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", lg: "40%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: { xs: 2, lg: 1 },
              order: { xs: 1, lg: 2 },
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
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {projectsCards}
        </Box>
      </Box>
      {openProjectDialog !== null && (
        <ProjectDialog
          open
          onClose={() => setOpenProjectDialog(null)}
          project={projects[openProjectDialog]}
          mode={mode}
        />
      )}
    </>
  );
}
