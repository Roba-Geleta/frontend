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

interface StyledAvatarProps extends AvatarProps {
  isHovered?: boolean;
}

const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== "isHovered",
})<StyledAvatarProps>(({ isHovered }) => ({
  transition: "transform 1s ease-in-out, box-shadow 1s ease-in-out",
  borderRadius: "50%",
  animation: isHovered ? `${glow} 2.5s infinite` : undefined,
  transform: isHovered ? "scale(1.05)" : undefined,
}));

const AnimatedAvatar: React.FC<StyledAvatarProps> = ({
  isHovered,
  ...props
}) => {
  const { mode } = useContext(ThemeContext);
  const avatarRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const [borderWidth, setBorderWidth] = useState("");
  const [drawing, setDrawing] = useState(true);

  // useEffect(() => {
  //   console.log("isHovered:", isHovered);
  // }, [isHovered]);

  useLayoutEffect(() => {
    if (avatarRef.current) {
      const avatarSize = avatarRef.current.offsetWidth;
      setSize(avatarSize);

      setTimeout(() => {
        setDrawing(false);
        setBorderWidth("6px");
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
        isHovered={isHovered}
        style={{
          borderWidth: "6px",
          borderColor:
            borderWidth !== ""
              ? mode === "dark"
                ? "#8295a7"
                : "#8295a7"
              : "#8295a721",
          borderStyle: "solid",
        }}
        className={` ${
          mode === "dark"
            ? "hover:border-[#8295a721]"
            : "hover:border-[#ff3939]"
        }`}
      />

      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          pointerEvents: "none",
          zIndex: 10,
          visibility: drawing ? "visible" : "hidden",
        }}
      >
        {circleSegments.map((segment, index) => (
          <circle
            key={index}
            cx="50%"
            cy="50%"
            r="48.37%"
            fill="none"
            stroke={mode === "dark" ? "#8295a7" : "#8295a7"}
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
    </AvatarWrapper>
  );
};

export default AnimatedAvatar;
