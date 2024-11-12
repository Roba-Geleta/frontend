import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { Avatar, AvatarProps } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { ThemeContext } from "../../Context/ThemeContext";

const AvatarWrapper = styled("div")({
  position: "relative",
  display: "inline-block",
});

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(0, 150, 136, 0.4);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 150, 136, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(0, 150, 136, 0.4);
  }
`;

const StyledAvatar = styled(Avatar)<AvatarProps>(() => ({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  borderRadius: "50%",
  "&:hover": {
    animation: `${glow} 1.5s infinite`,
    transform: "scale(1.05)",
  },
}));

const AnimatedAvatar: React.FC<AvatarProps> = (props) => {
  const { mode } = useContext(ThemeContext);
  const avatarRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const [drawingDone, setDrawingDone] = useState(false);

  useLayoutEffect(() => {
    if (avatarRef.current) {
      const avatarSize = avatarRef.current.offsetWidth;
      setSize(avatarSize);

      setTimeout(() => {
        setDrawingDone(true);
      }, 3500);
    }
  }, []);

  const circleSegments = [
    { strokeWidth: 1, delay: 0 },
    { strokeWidth: 3, delay: 0.5 },
    { strokeWidth: 5, delay: 1 },
    { strokeWidth: 6, delay: 1.5 },
  ];

  return (
    <AvatarWrapper ref={avatarRef}>
      <StyledAvatar
        {...props}
        className={` hover:border-[6px] ${
          mode === "dark" ? "hover:border-[#5a796a]" : "hover:border-[#4c6865]"
        }`}
      />
      {!drawingDone && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size,
            height: size,
            pointerEvents: "none",
          }}
        >
          {circleSegments.map((segment, index) => (
            <circle
              key={index}
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke={mode === "dark" ? "#5a796a" : "#4c6865"}
              strokeWidth={segment.strokeWidth}
              strokeDasharray={Math.PI * size}
              strokeDashoffset={Math.PI * size}
              style={{
                animation: `drawCircle 2s ease forwards`,
                animationDelay: `${segment.delay}s`,
              }}
            />
          ))}
          <style>
            {`
            @keyframes drawCircle {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}
          </style>
        </svg>
      )}
    </AvatarWrapper>
  );
};

export default AnimatedAvatar;
