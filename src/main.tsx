import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { ThemeProvider } from "./Context/ThemeContext";
import { DatabaseStatusProvider } from "./Context/DatabaseStatusContext";
import { NetworkStatusProvider } from "./Context/NetworkStatusContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <NetworkStatusProvider>
        <DatabaseStatusProvider>
          <RouterProvider router={router} />
        </DatabaseStatusProvider>
      </NetworkStatusProvider>
    </ThemeProvider>
  </StrictMode>
);
