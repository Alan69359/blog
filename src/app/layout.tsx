'use client';

import "@/styles/global.css";
import Header from '@/src/app/layout/header'; // Make sure ThemeToggle is in here
import Footer from "@/src/app/layout/footer";
import * as React from 'react';
import Script from 'next/script';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Important for CSS Vars
import { theme } from '@/lib/theme';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const Background = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundImage: "url('/images/wallpaper.jpg')", // Ensure public/images/wallpaper.jpg exists
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  zIndex: -1,
  transition: 'filter 0.3s ease-in-out',
  filter: 'brightness(100%)', // Default for light mode

  // This selector targets an ancestor with data-mui-color-scheme="dark"
  // and applies the style to the current element (&).
  '[data-mui-color-scheme="dark"] &': {
    filter: 'brightness(50%)', // Dimmer for dark mode
  },
  // You can also be explicit for light mode if you ever need to override something
  // '[data-mui-color-scheme="light"] &': {
  //   filter: 'brightness(100%)',
  // },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Use CssVarsProvider here
    <CssVarsProvider
      theme={theme}
      defaultMode="system" // This tells the provider the initial mode preference
      modeStorageKey="my-app-mode" // localStorage key for mode preference (light/dark/system)
      colorSchemeStorageKey="my-app-color-scheme" // localStorage key for resolved scheme (light/dark)
    >
      {/* CssBaseline enables color scheme adaptive styling and other global resets */}
      <CssBaseline enableColorScheme />
      {/* 
        CssVarsProvider will automatically add `data-mui-color-scheme` to the <html> tag
        because it's the first available DOM node it can control within its direct children.
      */}
      <html lang="en">
        <body style={{ margin: 0, padding: 0 }}>
          <Background />
          <div style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%'
          }}>
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 2,
            }}>
              <Header /> {/* Your ThemeToggle component should be rendered within Header */}
            </div>

            <main style={{
              flex: '1 0 auto',
              width: '100%',
              padding: '0',
              boxSizing: 'border-box',
              paddingTop: '64px',
              position: 'relative',
              zIndex: 1,
            }}>
              {children}
            </main>

            <div style={{
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 2,
            }}>
              <Footer />
            </div>

            <link rel="stylesheet" href="/live2d-widget/dist/waifu.css" />
            <Script src="/live2d-widget/dist/autoload.js" strategy="afterInteractive" />
          </div>
        </body>
      </html>
    </CssVarsProvider>
  );
}