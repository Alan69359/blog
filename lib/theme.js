// lib/theme.ts
import { extendTheme } from "@mui/material/styles";

export const theme = extendTheme({
  cssVarPrefix: "my-app",
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#1976d2" },
        background: { default: "#f5f5f5" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#90caf9" },
        background: { default: "#121212" },
      },
    },
  },
  // Add this configuration to enable manual mode toggling
  components: {
    MuiCssBaseline: {
      defaultProps: {
        enableColorScheme: true,
      },
    },
  },
  // This is the key configuration change
  colorSchemeSelector: "data-mui-color-scheme", // or 'class'

  components: {
    MuiCssBaseline: {
      defaultProps: {
        enableColorScheme: true,
      },
    },
  },
});
