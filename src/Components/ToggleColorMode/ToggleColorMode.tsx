import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";
import { ThemeContext } from "../../Context/ThemeContext";
import { Tooltip } from "@mui/material";

const ToggleColorMode: React.FC = () => {
  const { mode, toggleColorMode } = useContext(ThemeContext);

  return (
    <Tooltip title={mode}>
      <IconButton
        onClick={() => {
          toggleColorMode();
          console.log("Theme toggled");
        }} // Debugging statement
        color="primary"
        aria-label="Theme toggle button"
        size="small"
      >
        {mode === "dark" ? (
          <WbSunnyRoundedIcon fontSize="small" />
        ) : (
          <ModeNightRoundedIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleColorMode;
