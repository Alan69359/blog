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
import Live2DViewer from "lib/Live2DViewer";

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
            bgcolor: 'transparent',
          }}>
            <Header />
            <Box
              component="main"
              sx={{
                // VVV THIS IS THE FIX VVV
                // The <main> area's only job is to grow and be a flex container for its children.
                // We remove the centering logic from here.
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
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