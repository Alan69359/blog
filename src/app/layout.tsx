// src/app/layout.tsx

'use client';

import "styles/global.css";
import Header from 'src/app/layout/header';
import Footer from "src/app/layout/footer";
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { theme } from 'lib/theme';
import dynamic from 'next/dynamic';
const Live2dWidget = dynamic(() => import('lib/Live2dWidget'), {
  ssr: false,
});

// This Background component is well-designed. No changes needed here.
const Background = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundImage: "url('/images/wallpaper.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  zIndex: -1,
  transition: 'filter 0.3s ease-in-out',
  '[data-mui-color-scheme="dark"] &': {
    filter: 'brightness(50%)',
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // You have the ThemeProvider set up correctly.
    <ThemeProvider theme={theme}>
      {/* CssBaseline is essential for normalizing styles */}
      <CssBaseline />
      <html lang="en">
        <body>
          <Background />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            {/* Header is a direct child */}
            <Header />

            {/*
              REFACTOR: The main content area.
              - `component="main"` makes it a semantic <main> tag.
              - `flexGrow: 1` makes it expand to fill all available space,
                pushing the footer to the bottom.
            */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                // You can add global padding to your main content here if needed
                // For example: py: 4 (padding top/bottom), px: 2 (padding left/right)
              }}
            >
              {children}
            </Box>

            {/* Footer is a direct child, automatically pushed to the bottom. */}
            <Footer />
          </Box>

          {/* Scripts and links are fine here */}
          <Live2dWidget />
        </body>
      </html>
    </ThemeProvider>
  );
}