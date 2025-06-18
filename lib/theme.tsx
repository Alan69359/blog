import { createTheme, extendTheme } from '@mui/material/styles';

// --- Augment the module to add our custom properties ---
declare module "@mui/material/styles" {
  interface Palette {
    appBar: {
      background: string;
    };
    appBackground: {
      imageFilter: string;
    };
    glassy: {
      background: string;
    };
  }

  interface PaletteOptions {
    appBar?: {
      background?: string;
    };
    glassy?: {
      background?: string;
    };
    appBackground?: {
      imageFilter?: string;
    };
  }
}

// --- Create the theme object ---
export const theme = extendTheme({
  cssVarPrefix: "my-app",
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#1976d2" },
        background: { default: "#f5f5f5", paper: "#ffffff" },
        text: { primary: "rgba(0, 0, 0, 0.87)" },
        appBar: {
          background: "rgba(255, 255, 255, 0.65)",
        },
        appBackground: {
          imageFilter: "brightness(110%)",
        },
        glassy: {
          background: "rgba(255, 255, 255, 0.65)",
        },
      },
    },
    dark: {
      palette: {
        primary: { main: "#90caf9" },
        background: { default: "#121212", paper: "#1e1e1e" },
        text: { primary: "#fff" },
        appBar: {
          background: "rgba(18, 18, 18, 0.5)",
        },
        appBackground: {
          imageFilter: "brightness(60%)",
        },
        glassy: {
          background: "rgba(18, 18, 18, 0.5)",
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

// --- Export a type alias for our custom theme ---
export type AppTheme = typeof theme;