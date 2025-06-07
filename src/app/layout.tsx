'use client';

import "@/styles/global.css";
import Header from '@/src/app/layout/header'
import Footer from "@/src/app/layout/footer";
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Script from 'next/script';
import {ColorModeContext} from '@/ui/dark-mode';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          return newMode;
        });
      },
      mode,
    }),
    [mode]
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {}
            : {
                background: {
                  default: '#121212',
                  paper: '#1E1E1E',
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <html className={mode} data-theme={mode}>
      <body>
        <ColorModeContext.Provider value={{ mode, toggleColorMode: colorMode.toggleColorMode }}>
          <ThemeProvider theme={theme}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Header />
              {children}
              <Footer />
              <link rel="stylesheet" href="/live2d-widget/dist/waifu.css" />
              <Script src="/live2d-widget/dist/autoload.js" strategy="afterInteractive" />
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </body>
    </html>
  );
}