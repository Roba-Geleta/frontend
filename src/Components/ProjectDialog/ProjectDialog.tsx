import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";

interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
  project: {
    title: string;
    date: string;
    technologies: string;
    details: string[];
    githubLink: string;
    websiteLink?: string;
    logo: string;
  };
  mode: "light" | "dark";
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({
  open,
  onClose,
  project,
  mode,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: mode === "dark" ? "grey.800" : "primary",
          color: mode === "dark" ? "grey.100" : "common",
        }}
      >
        <div className="flex flex-col md:flex-row justify-center">
          {/* Logo */}
          <Box
            component="img"
            src={project.logo}
            alt={`${project.title} Logo`}
            sx={{
              width: { xs: "40px", md: "60px" },
              height: "auto",
              marginRight: 4,
            }}
          />
          <div className="my-auto">{project.title}</div>
        </div>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            marginLeft: "auto",
            color: mode === "dark" ? "grey.100" : "common",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        className={mode === "dark" ? "dark" : ""}
        sx={{
          backgroundColor: mode === "dark" ? "grey.900" : "background.paper",
        }}
      >
        <Typography variant="subtitle1" color="grey">
          {project.date}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="body1"
            gutterBottom
            color={mode === "dark" ? "grey.100" : "common"}
          >
            <strong>Technologies:</strong>
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
            {project.technologies.split(", ").map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                variant="outlined"
                color="primary"
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </Box>
        <Typography
          variant="body1"
          gutterBottom
          color={mode === "dark" ? "grey.100" : "common"}
        >
          <strong>Details:</strong>
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          {project.details.map((item, index) => (
            <li key={index} className="flex items-center relative">
              <div className="w-2 h-2 top-1.5 bg-gray-500 dark:bg-gray-600 rounded-full absolute"></div>
              <Typography
                variant="body2"
                color={mode === "dark" ? "grey.100" : "common"}
                className="pl-4"
              >
                {item}
              </Typography>
            </li>
          ))}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: mode === "dark" ? "grey.800" : "grey.100",
        }}
      >
        {/* GitHub and Website Icons */}
        <Box sx={{ flexGrow: 1 }}>
          {project.githubLink && (
            <IconButton
              component="a"
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{ color: mode === "dark" ? "grey.300" : "text.primary" }}
            >
              <GitHubIcon />
            </IconButton>
          )}
          {project.websiteLink && (
            <IconButton
              component="a"
              href={project.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              sx={{ color: mode === "dark" ? "grey.300" : "text.primary" }}
            >
              <LanguageIcon />
            </IconButton>
          )}
        </Box>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDialog;
