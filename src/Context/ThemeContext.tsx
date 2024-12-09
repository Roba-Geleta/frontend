import React, { createContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  mode: "light" | "dark";
  toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  toggleColorMode: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check local storage for theme preference
    const storedMode = localStorage.getItem("theme") as "light" | "dark" | null;
    if (storedMode) {
      setMode(storedMode);
      document.documentElement.classList.toggle("dark", storedMode === "dark");
    } else {
      // If no preference, use system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    console.log(`Theme toggled to ${newMode}`); // Debugging statement
    setMode(newMode);
    document.documentElement.classList.toggle("dark", newMode === "dark");
    localStorage.setItem("theme", newMode);
    console.log(`Theme toggled to ${newMode}`); // Debugging statement
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
