import React, { useEffect } from "react";
import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { getDesignTokens } from "./theme";
import { AuthProvider } from "./contexts/AuthContext";
import { router } from "./main";
import ColorModeContext from "./contexts/ColorModeContext";

function App() {
  const queryClient = new QueryClient();
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode as PaletteMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      themeMode: mode,
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    [mode]
  );

  const currentTheme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ColorModeContext.Provider value={colorMode}>
          <AuthProvider>
            <ThemeProvider theme={currentTheme}>
              <CssBaseline />
              <RouterProvider router={router} />
            </ThemeProvider>
          </AuthProvider>
        </ColorModeContext.Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
