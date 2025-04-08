import React, { useState, useMemo, useRef, useEffect } from "react";
import { Box, keyframes } from "@mui/material";
import { IconContext } from "react-icons";

// Import technology icons
import {
  SiReact,
  SiAmazonwebservices,
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiGoland,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiGitlab,
  SiVisualstudiocode,
  SiJunit5,
  SiJupyter,
  SiAndroid,
  SiEclipseide,
  SiWebstorm,
  SiIntellijidea,
  SiGooglecloud,
  SiStripe,
  SiTwilio,
  SiSelenium,
  SiDotnet,
  SiBootstrap,
  SiTailwindcss,
  SiOpenai,
  SiPostgresql,
  SiMui,
} from "react-icons/si";
import { FaJava, FaPython } from "react-icons/fa";
import { IconType } from "react-icons";

interface TechIcon {
  icon: IconType;
  name: string;
}

const techIcons: TechIcon[] = [
  { icon: SiReact, name: "React" },
  { icon: SiAmazonwebservices, name: "AWS" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiJavascript, name: "JavaScript" },
  { icon: SiCplusplus, name: "C++" },
  { icon: FaPython, name: "Python" },
  { icon: FaJava, name: "Java" },
  { icon: SiGoland, name: "Go" },
  { icon: SiHtml5, name: "HTML5" },
  { icon: SiCss3, name: "CSS3" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiGit, name: "Git" },
  { icon: SiGithub, name: "GitHub" },
  { icon: SiGitlab, name: "GitLab" },
  { icon: SiVisualstudiocode, name: "VS Code" },
  { icon: SiJunit5, name: "JUnit" },
  { icon: SiJupyter, name: "Jupyter" },
  { icon: SiAndroid, name: "Android SDK" },
  { icon: SiEclipseide, name: "Eclipse" },
  { icon: SiWebstorm, name: "WebStorm" },
  { icon: SiIntellijidea, name: "IntelliJ" },
  { icon: SiGooglecloud, name: "Google Cloud" },
  { icon: SiStripe, name: "Stripe" },
  { icon: SiTwilio, name: "Twilio" },
  { icon: SiSelenium, name: "Selenium" },
  { icon: SiDotnet, name: "ASP.NET Core" },
  { icon: SiBootstrap, name: "Bootstrap" },
  { icon: SiTailwindcss, name: "Tailwind CSS" },
  { icon: SiOpenai, name: "OpenAI" },
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiMui, name: "Material UI" },
];

interface IconData {
  x: number;
  y: number;
  size: number;
  IconComponent: IconType;
  id: string;
}

interface AvatarWithIconsProps {
  mode: "light" | "dark";
  isHovered?: boolean;
  children?: React.ReactNode;
}

const pulse = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
`;

const AvatarWithIcons: React.FC<AvatarWithIconsProps> = ({
  mode,
  children,
  isHovered = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize container size with default values
  const [containerSize, setContainerSize] = useState({
    width: 500,
    height: 1000,
  });

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });
      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  // Generate random positions for icons
  const iconsData = useMemo(() => {
    const data: IconData[] = [];
    const numIcons = techIcons.length;

    const minSize = 20;
    const maxSize = 40;
    const exclusionRadius = 100; // Exclude icons from overlapping with the avatar

    for (let i = 0; i < numIcons; i++) {
      let x: number;
      let y: number;
      let size: number;
      let overlapping: boolean;
      let attempts = 0;

      do {
        size = minSize + Math.random() * (maxSize - minSize);
        x = Math.random() * (containerSize.width - size);
        y = Math.random() * (containerSize.height - size);

        overlapping = false;

        // Exclude area around the avatar
        const dx = x + size / 2 - containerSize.width / 2;
        const dy = y + size / 2 - containerSize.height / 2;
        const distanceToCenter = Math.sqrt(dx * dx + dy * dy);
        if (distanceToCenter < exclusionRadius + size / 2) {
          overlapping = true;
          attempts++;
          continue;
        }

        // Check for overlap with existing icons
        for (let j = 0; j < data.length; j++) {
          const otherIcon = data[j];
          const dx = x + size / 2 - (otherIcon.x + otherIcon.size / 2);
          const dy = y + size / 2 - (otherIcon.y + otherIcon.size / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < (size + otherIcon.size) / 2) {
            overlapping = true;
            break;
          }
        }
        attempts++;
      } while (overlapping && attempts < 100);

      if (attempts >= 100) {
        console.warn(
          "Could not place icon without overlapping after 100 attempts"
        );
      }

      const IconComponent = techIcons[i].icon;

      data.push({
        x,
        y,
        size,
        IconComponent,
        id: `icon-${i}`,
      });
    }

    return data;
  }, [containerSize]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        maxHeight: "100vh",
        margin: "0 auto",
      }}
      className="flex justify-center items-center"
    >
      {/* Icons as background */}
      {iconsData.map((iconData) => {
        return (
          <IconContext.Provider
            value={{
              style: {
                fontSize: `${iconData.size * 0.6}px`,
                color:
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.3)",
              },
            }}
            key={iconData.id}
          >
            <Box
              sx={{
                position: "absolute",
                top: iconData.y,
                left: iconData.x,
                width: `${iconData.size}px`,
                height: `${iconData.size}px`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.5,
                transform: "translate(-50%, -50%)",
                animation: isHovered ? `${pulse} 2s infinite` : "none",
              }}
            >
              <iconData.IconComponent />
            </Box>
          </IconContext.Provider>
        );
      })}

      {children && (
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
};

export default AvatarWithIcons;
