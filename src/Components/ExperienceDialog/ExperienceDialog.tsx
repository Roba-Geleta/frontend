import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ExperienceDialogProps {
  open: boolean;
  onClose: () => void;
  experience: {
    title: string;
    company: string;
    date: string;
    location: string;
    technologies: string;
    responsibilities: string[];
    image: string; // Add image/logo if desired
  };
  mode: "light" | "dark";
}

const ExperienceDialog: React.FC<ExperienceDialogProps> = ({
  open,
  onClose,
  experience,
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
        <div className="flex flex-row">
          {/* Logo (Optional) */}
          {experience.image && (
            <Box
              component="img"
              src={experience.image}
              alt={`${experience.company} Logo`}
              sx={{
                maxWidth: "40px",
                height: "auto",
                maxHeight: "40px",
                marginRight: { xs: 2, md: 4 },
                marginBottom: { xs: 2, md: 0 },
              }}
            />
          )}
          <div className="text-lg flex flex-row items-center">
            {experience.title} at {experience.company}
          </div>
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
          {experience.date} | {experience.location}
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
            {experience.technologies.split(", ").map((tech, index) => (
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
          color={mode === "dark" ? "grey.100" : "common"}
          gutterBottom
        >
          <strong>Responsibilities:</strong>
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          {experience.responsibilities.map((item, index) => (
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
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExperienceDialog;
