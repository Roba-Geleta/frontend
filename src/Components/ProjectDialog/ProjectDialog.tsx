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
    children?: React.ReactNode;
  };
  mode: "light" | "dark";
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({
  open,
  onClose,
  project,
  mode,
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: mode === "dark" ? "grey.800" : "primary",
        color: mode === "dark" ? "grey.100" : "common",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="img"
          src={project.logo}
          alt={`${project.title} Logo`}
          sx={{ width: { xs: "40px", md: "60px" }, mr: 4 }}
        />
        {project.title}
      </Box>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ ml: "auto", color: mode === "dark" ? "grey.100" : "common" }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent
      dividers
      sx={{
        backgroundColor: mode === "dark" ? "grey.900" : "background.paper",
      }}
    >
      <Typography variant="subtitle1" color="grey">
        {project.date}
      </Typography>
      {project.children && <Box>{project.children}</Box>}
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ color: mode === "dark" ? "grey.100" : "common" }}
        >
          <strong>Technologies:</strong>
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
          {project.technologies.split(", ").map((tech, i) => (
            <Chip
              key={i}
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
        sx={{ color: mode === "dark" ? "grey.100" : "common" }}
      >
        <strong>Details:</strong>
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        {project.details.map((item, i) => (
          <li key={i} className="flex items-center relative">
            <div className="w-2 h-2 top-1.5 bg-gray-500 dark:bg-gray-600 rounded-full absolute"></div>
            <Typography
              variant="body2"
              sx={{ pl: 4, color: mode === "dark" ? "grey.100" : "common" }}
            >
              {item}
            </Typography>
          </li>
        ))}
      </Box>
    </DialogContent>
    <DialogActions
      sx={{ backgroundColor: mode === "dark" ? "grey.800" : "grey.100" }}
    >
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

export default ProjectDialog;
