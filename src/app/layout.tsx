// src/app/layout.tsx (The Final Correct Version)

'use client';

import "styles/global.css";
import * as React from 'react';
import Box from '@mui/material/Box';
// --- Add Toolbar to your imports ---
import { Toolbar } from '@mui/material';
import { AppBar1 } from "ui/app-bar";
import { Box1 } from 'ui/box';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'lib/theme';
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import CssBaseline from '@mui/material/CssBaseline';
import Live2DViewer from "lib/Live2DViewer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Live2DViewer />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              }}
            >
              {/* This is your position: "fixed" header */}
              <AppBar1 />

              {/* --- THE FIX --- */}
              {/* This empty Toolbar acts as a spacer. It occupies space in the layout */}
              {/* and has the exact same responsive height as the one in your AppBar, */}
              {/* pushing all the content below it down by the correct amount. */}
              <Toolbar />

              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  // We no longer need paddingTop here, the Toolbar spacer handles it.
                }}
              >
                {children}
              </Box>

              <Box1 />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}