import * as React from "react";
import { useState, useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import { Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { scroller } from "react-scroll";
import { useTheme, useMediaQuery } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { keyframes } from "@mui/system";

interface Experience {
  title: string;
  company: string;
  date: string;
  location: string;
  summary: string;
  link: string;
  image: string;
  background: string;
  technologies: string;
  responsibilities: string[];
}

const slideLeft = keyframes`
  from {
    transform: translateX(200px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideRight = keyframes`
  from {
    transform: translateX(-200px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ExperienceTimeLine: React.FC = () => {
  const OutlierAILogo =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/OutlierAILogo.png";
  const OutlierAIBackground =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/OutlierAIBackground.webp";
  const CorranaLogo =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/CorranaLogo.webp";
  const CorranaBackground =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/CorranaBackground.webp";
  const AppBookingWithMeLogo =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/Projects/AppBookingWithMe/AppBookingWithMeLogo.png";
  const AppBookingWithMeBackground =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/AppBookingWithMeBackground.webp";
  const PPSLogo =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/PPSLogo.ico";
  const PPSBackground =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/PPSBackground.webp";

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const theme = useTheme();
  const { mode } = useContext(ThemeContext);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  //   const isMobile = useMediaQuery("(max-width: 768px)");

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const experiences: Experience[] = [
    {
      title: "Junior Software Developer",
      company: "Corrana (Avo Solutions Inc.)",
      date: "Aug 2024 – Present",
      location: "Winnipeg, MB",
      summary:
        "Conduct research on cost-effective APIs for external data collection (weather, economic trends, local events); develop and deploy robust data pipelines using TypeScript, Prisma, PostgreSQL, AWS CDK, and Lambda.",
      link: "/experience/corrana",
      image: CorranaLogo,
      background: CorranaBackground,
      technologies: "AWS CDK, Lambda, TypeScript, Prisma, PostgreSQL",
      responsibilities: [
        "Research and evaluate cost-effective APIs for accurate data collection on external factors (weather, economic trends, local events), enabling insightful analytics and business optimization.",
        "Develop, rigorously test, and deploy TypeScript scripts and Prisma models, integrating PostgreSQL databases and automating data pipelines with AWS CDK and Lambda.",
      ],
    },
    {
      title: "Freelance Coding Expert | AI Model Trainer",
      company: "Outlier AI",
      date: "Sept 2024 – Oct 2024",
      location: "Winnipeg, MB",
      summary:
        "Conducted detailed code reviews and provided quality assessments on AI-generated solutions across multiple programming languages, ensuring accuracy and adherence to best practices.",
      link: "/experience/outlier-ai",
      image: OutlierAILogo,
      background: OutlierAIBackground,
      technologies: "Python, Java, JavaScript, C++",
      responsibilities: [
        "Conducted code reviews and rated AI-generated solutions in Python, Java, JavaScript, and C++, adhering to strict documentation and guidelines.",
      ],
    },
    {
      title: "Freelance Software Developer",
      company: "App.Bookingwith.me",
      date: "Jun 2024 – Aug 2024",
      location: "Winnipeg, MB",
      summary:
        "Built a responsive booking platform with secure OAuth, automated notifications, and intuitive UI/UX using Svelte, Tailwind CSS, Twilio, and Stripe, boosting business efficiency and engagement.",
      link: "/experience/app-bookingwithme",
      image: AppBookingWithMeLogo,
      background: AppBookingWithMeBackground,
      technologies:
        "Svelte, JavaScript, Tailwind CSS, Flowbite, OpenAI API, OAuth, Twilio, Stripe",
      responsibilities: [
        "Co-developed a real-time online booking platform enabling businesses to efficiently manage appointments and schedules, improving operational efficiency and user engagement.",
        "Designed and built a responsive interface featuring interactive calendars and drag-and-drop functionality using Svelte, Tailwind CSS, and Flowbite.",
        "Implemented secure OAuth authentication, automated SMS notifications, and integrated Google review requests via Twilio, enhancing customer interaction for 3 active businesses.",
        "Delivered rapid feature updates under tight deadlines, demonstrating adaptability and effective project management.",
      ],
    },

    {
      title: "Software Developer Co-op - Partner Services",
      company: "Priceline Partner Solution",
      date: "Jan 2023 – Apr 2023",
      location: "Winnipeg, MB",
      summary:
        "Built and improved Priceline's global partner product activation platform, managing diverse inventory and secure integrations using React, Go, SQL, and Google Secret Manager.",
      link: "/experience/priceline",
      image: PPSLogo,
      background: PPSBackground,
      technologies: "JavaScript, TypeScript, React, Go, Harness, SQL",
      responsibilities: [
        "Collaborated in a team to develop a user-friendly product activation page for Priceline’s partners across 200+ countries. Utilized React for UI components, Go for server-side logic, and SQL for database queries and analysis.",
        "Implemented features to manage multiple inventory types and flexible payment options, applying agile methodologies and test-driven development throughout the process.",
        "Enhanced project maintainability by updating documentation pages, converting JavaScript files to TypeScript, and resolving legacy lint errors, significantly improving code quality and type safety.",
        "Implemented Google Secret Manager for Partner Services Division projects, replacing the outgoing Harness Secret Manager, thereby improving security and streamlining secret management processes.",
      ],
    },
  ];

  return (
    <Box
      sx={{ my: 4, px: 2, position: "relative", zIndex: 1 }}
      className="min-h-[65vh] flex flex-col  justify-center"
    >
      {experiences.map((exp, index) => {
        const isExpanded = expandedIndex === index;

        if (isMobile) {
          return (
            <Box
              key={index}
              id={`experience-${index}`}
              onClick={() => {
                handleToggle(index);

                setTimeout(() => {
                  scroller.scrollTo(`experience-${index}`, {
                    duration: 300,
                    delay: 0,
                    smooth: "easeInOutQuart",
                    offset: -100,
                  });
                }, 70);
              }}
              sx={{
                mb: 4,
                cursor: "pointer",
                border: "1px solid",
                borderColor: "grey.300",
                p: 2,
                borderRadius: 2,
                color: mode === "dark" ? "grey.400" : "text.secondary",
              }}
            >
              <Typography variant="caption">
                {exp.date} - {exp.location}
              </Typography>
              <Box sx={{ textAlign: "center", my: 2 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    overflow: "hidden",
                    mx: "auto",
                  }}
                >
                  <img
                    src={exp.image}
                    alt={`${exp.company} logo`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography className="!font-semibold !text-lg">
                  {exp.title}
                </Typography>
                <Typography variant="subtitle1">{exp.company}</Typography>
                <Typography variant="caption">{exp.technologies}</Typography>
              </Box>
              <Collapse
                in={isExpanded}
                timeout={{
                  enter: 1000,
                  exit: expandedIndex !== null ? 500 : 1000,
                }}
                unmountOnExit
              >
                <Box
                  sx={{
                    p: 2,
                    border: "2px solid",
                    borderColor: "grey.300",
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                    position: "relative",
                    mt: 2,
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
                      opacity: 0.05,
                      zIndex: 0,
                    },
                  }}
                >
                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Box
                      component="ul"
                      sx={{ listStyleType: "disc", pl: 2, m: 0 }}
                    >
                      {exp.responsibilities.map((resp, idx) => (
                        <Typography key={idx} component="li" variant="body2">
                          {resp}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Collapse>
              <Box sx={{ textAlign: "center", mt: 1 }}>
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Box>
            </Box>
          );
        } else {
          const isLeft = index % 2 === 0;

          const DateInfo = (
            <Typography variant="caption">
              {exp.date} - {exp.location}
            </Typography>
          );

          const ExperienceDetails = (
            <Box
              sx={{
                animation: isExpanded
                  ? isLeft
                    ? `${slideRight} 0.3s ease-in-out`
                    : `${slideLeft} 0.3s ease-in-out`
                  : isLeft
                  ? expandedIndex !== null
                    ? `${slideLeft} `
                    : `${slideLeft} 0.3s ease-in-out`
                  : expandedIndex !== null
                  ? `${slideRight} `
                  : `${slideRight} 0.3s ease-in-out`,
              }}
            >
              <Typography className="!font-semibold !text-lg">
                {exp.title}
              </Typography>
              <Typography variant="subtitle1">{exp.company}</Typography>
              <Typography variant="caption">{exp.technologies}</Typography>
            </Box>
          );

          const ResponsibilitiesList = (
            <Box
              sx={{
                p: 2,
                border: "2px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                boxShadow: 10,
                overflow: "hidden",
                position: "relative",
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
                  opacity: 0.05,
                  zIndex: 0,
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Box
                  component="ul"
                  sx={{ listStyleType: "disc", pl: 2, m: 0, textAlign: "left" }}
                >
                  {exp.responsibilities.map((resp, idx) => (
                    <Typography key={idx} component="li" variant="body2">
                      {resp}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          );

          return (
            <Box
              key={index}
              id={`experience-${index}`}
              onClick={() => {
                if (!isExpanded) {
                  scroller.scrollTo(`experience-${index}`, {
                    duration: 800,
                    delay: 0,
                    smooth: "easeInOutQuart",
                    offset: -window.innerHeight / 3,
                  });
                }
                handleToggle(index);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                mb: 4,
                cursor: "pointer",
                justifyContent: isLeft ? "flex-start" : "flex-end",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": isExpanded
                  ? "none"
                  : {
                      transform: "scale(1.06)",
                      boxShadow:
                        mode === "dark"
                          ? "0px 4px 30px rgba(0, 0, 0, 0.2)"
                          : "0px 4px 30px rgba(155, 155, 155, 0.2)",
                    },
                zIndex: 3,
                borderRadius: 2,
                color: mode === "dark" ? "grey.400" : "text.secondary",
              }}
            >
              {/* Left Column (45%) */}
              <Box
                sx={{
                  width: "45%",
                  textAlign: isExpanded ? (isLeft ? "left" : "right") : "right",
                }}
              >
                <Collapse
                  in={isExpanded && isLeft}
                  timeout={{
                    enter: 1000,
                    exit: expandedIndex !== null ? 500 : 1000,
                  }}
                  unmountOnExit
                >
                  {ResponsibilitiesList}
                </Collapse>
                {isExpanded ? (
                  !isLeft ? (
                    <Box>
                      {DateInfo}
                      {ExperienceDetails}
                    </Box>
                  ) : null
                ) : isLeft ? (
                  <Box>{ExperienceDetails}</Box>
                ) : (
                  DateInfo
                )}
              </Box>
              {/* Center Column (10%): vertical line and logo */}
              <Box
                sx={{
                  width: "10%",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: "50%",
                    width: "2px",
                    bgcolor: "grey.300",
                  }}
                />
                <Box
                  sx={{
                    width: 40,
                    height: "auto",
                    borderRadius: "50%",
                    overflow: "hidden",
                    zIndex: 1,
                  }}
                >
                  <img
                    src={exp.image}
                    alt={`${exp.company} logo`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: "90%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 3,
                    color: mode === "dark" ? "grey.600" : "text.secondary",
                  }}
                >
                  {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Box>
              </Box>
              {/* Right Column (45%) */}
              <Box sx={{ width: "45%", textAlign: "left" }}>
                <Collapse
                  in={isExpanded && !isLeft}
                  timeout={{
                    enter: 1000,
                    exit: expandedIndex !== null ? 500 : 1000,
                  }}
                  unmountOnExit
                >
                  {ResponsibilitiesList}
                </Collapse>
                {isExpanded ? (
                  isLeft ? (
                    <Box>
                      {DateInfo}
                      {ExperienceDetails}
                    </Box>
                  ) : null
                ) : !isLeft ? (
                  <Box>{ExperienceDetails}</Box>
                ) : (
                  DateInfo
                )}
              </Box>
            </Box>
          );
        }
      })}

      {/* Full timeline vertical line */}
      {!isMobile && (
        <Box className="absolute left-1/2 top-0 bottom-0 border-dashed border-[1px] !z-[-1] border-gray-300 dark:border-gray-600 " />
      )}
    </Box>
  );
};
export default ExperienceTimeLine;
