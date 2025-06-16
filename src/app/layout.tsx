// layout.tsx

'use client';

import "styles/global.css";
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { theme } from 'lib/theme';
import { AppBar1 } from "ui/app-bar";
import { Box1 } from 'ui/box';

function Header() {
  return (<AppBar1 />);
}

function Footer() {
  return (<Box1 />);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            // Default background for all pages that AREN'T the homepage
            bgcolor: 'background.default',
          }}>
            <Header />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                // The main content area no longer needs padding.
                // The Container in page.tsx will handle content spacing.
              }}
            >
              {children}
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}