// layout.tsx

'use client';

import "styles/global.css";
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { theme } from 'lib/theme';
import { AppBar1 } from "ui/app-bar";
import { Box1 } from 'ui/box';

function Header() {
  return (<AppBar1 />);
}

function Footer() {
  return (<Box1 />);
}

const Background = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,

  backgroundImage: "url('/images/wallpaper.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',

  // --- THE FINAL FIX IS HERE ---
  // Add the '!' non-null assertion operator to tell TypeScript that 'vars' will always exist.
  filter: theme.vars!.palette.appBackground.imageFilter,

  transition: 'filter 0.3s ease-in-out',
}));


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Background />

          <Box sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
          }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}