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
            paper: "#eee",
          },
          text: {
            primary: "#000",
            secondary: "#626262",
          },
        }
      : {
          // dark mode
          primary: {
            main: "#3454D1",
          },
          background: {
            default: "#121212",
            paper: "#0d0d0d",
          },
          text: {
            // primary: "#000",
            secondary: "#8a8a8a",
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
      defaultProps: {
        disableRipple: true,
      },
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
          boxShadow: "none",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          borderColor: "#000",
        },
      },
    },
  } as Components,
});

export const theme = (mode: PaletteMode): Theme =>
  createTheme(getDesignTokens(mode));
