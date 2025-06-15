// lib/theme.ts
import { extendTheme } from "@mui/material/styles";

// --- THIS IS THE CORRECT MODULE AUGMENTATION ---
// We are telling TypeScript that the 'Palette' itself can contain our custom object.
declare module "@mui/material/styles" {
  interface Palette {
    appBar: {
      background: string;
    };
    // Add our custom object to the Palette interface
    appBackground: {
      imageFilter: string;
    };
  }

  // Also add it to the PaletteOptions for use in extendTheme
  interface PaletteOptions {
    appBar?: {
      background?: string;
    };
    appBackground?: {
      imageFilter?: string;
    };
  }
}

export const theme = extendTheme({
  cssVarPrefix: "my-app",
  colorSchemes: {
    light: {
      // --- DEFINE CUSTOM VALUES INSIDE THE PALETTE ---
      palette: {
        primary: { main: "#1976d2" },
        background: { default: "#f5f5f5", paper: "#ffffff" },
        text: { primary: "rgba(0, 0, 0, 0.87)" },
        appBar: {
          background: "rgba(255, 255, 255, 0.65)",
        },
        // Our custom value now lives here, as a sibling to 'primary', 'background', etc.
        appBackground: {
          imageFilter: "brightness(110%)",
        },
      },
    },
    dark: {
      // --- DEFINE CUSTOM VALUES INSIDE THE PALETTE ---
      palette: {
        primary: { main: "#90caf9" },
        background: { default: "#121212", paper: "#1e1e1e" },
        text: { primary: "#fff" },
        appBar: {
          background: "rgba(18, 18, 18, 0.5)",
        },
        // The dark mode version of our custom value lives here.
        appBackground: {
          imageFilter: "brightness(60%)",
        },
      },
    },
  },
  colorSchemeSelector: "data-mui-color-scheme",
  components: {
    MuiCssBaseline: {
      defaultProps: {
        enableColorScheme: true,
      },
    },
  },
});

export type AppTheme = typeof theme;