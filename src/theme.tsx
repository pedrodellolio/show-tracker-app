import {
  Components,
  createTheme,
  PaletteMode,
  PaletteOptions,
} from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { Theme } from "@mui/system";
import "@fontsource/inter";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // light mode
          primary: {
            main: "#3454D1",
          },
          background: {
            default: "#fff",
          },
        }
      : {
          // dark mode
          primary: {
            main: "#3454D1",
          },
          background: {
            default: "#121212",
          },
        }),
  } as PaletteOptions,
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  } as TypographyOptions,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "inherit",
          color: "inherit",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          boxShadow: "none",
          textTransform: "none",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: `1px solid ${mode === "light" ? "#e0e0e0" : "#242424"}`,
          "& .MuiDataGrid-withBorderColor": {
            borderColor: mode === "light" ? "#e0e0e0" : "#242424",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  } as Components,
});

export const theme = (mode: PaletteMode): Theme =>
  createTheme(getDesignTokens(mode));
