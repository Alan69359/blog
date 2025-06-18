// src/app/layout.tsx

'use client';

import "styles/global.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import { AppBar1 } from "ui/app-bar"; // Your Header
import { Box1 } from 'ui/box';      // Your Footer
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'lib/theme';
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import CssBaseline from '@mui/material/CssBaseline';
import Live2DViewer from "lib/Live2DViewer";

// The global background should be placed here if it applies to EVERY page.
// Let's assume you'll add it to specific pages for now to avoid confusion.

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* THE STICKY FOOTER CONTAINER */}
            <Live2DViewer/>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                // This is the key: The layout is AT LEAST the height of the screen.
                // It can grow taller if the content is long, allowing scrolling.
                minHeight: '100vh',
              }}
            >
              {/* Header is a normal element, it will scroll. */}
              <AppBar1 />

              {/* 
                This is the main content area. It MUST be a flex container
                so that its children can use flex-grow.
              */}
              <Box
                component="main"
                sx={{
                  flexGrow: 1, // THE MAGIC: This pushes the footer down.
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {children}
              </Box>

              {/* Footer is a normal element, sticky due to the flex layout. */}
              <Box1 />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}