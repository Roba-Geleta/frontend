import { Avatar, AvatarProps } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

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

const AnimatedAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: "50%",
  "&:hover": {
    animation: `${glow} 1.5s infinite`,
    transform: "scale(1.05)",
  },
}));

export default AnimatedAvatar;
