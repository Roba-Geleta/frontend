import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import AppAppBar from "../../Components/AppAppBar/AppAppBar";
import ErrorBoundary from "../../Components/ErrorBoundary/ErrorBoundary";
import "./MainLayout.css";
import { ThemeContext } from "../../Context/ThemeContext";
import usePageMeta from "../../hooks/usePageMeta/usePageMeta";

const MainLayout: React.FC = () => {
  const RobaAvatar =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/Roba-Notion-Avatar.svg";
  const { mode } = useContext(ThemeContext);
  usePageMeta({
    title: "Roba",
    favicon: RobaAvatar,
  });

  return (
    <>
      <AppAppBar />
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
        }}
        className={mode === "dark" ? "backgroundDark" : "backgroundLight"}
      >
        <Container
          sx={{
            pt: { xs: 12, sm: 14 },
            pb: { xs: 6, sm: 8 },
          }}
          maxWidth={false}
        >
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
