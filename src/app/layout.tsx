'use client';

import "@/styles/global.css";
import Header from '@/src/app/layout/header'
import Footer from "@/src/app/layout/footer";
import * as React from 'react';
import Script from 'next/script';
import ThemeToggle from '@/ui/dark-mode';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from '@/lib/theme'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html>
      <body>
        <ThemeProvider
          theme={theme}
          defaultMode="system"
          modeStorageKey="my-app-mode"
          colorSchemeStorageKey="my-app-color-scheme"
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Header />
            {children}
            <Footer />
            <link rel="stylesheet" href="/live2d-widget/dist/waifu.css" />
            <Script src="/live2d-widget/dist/autoload.js" strategy="afterInteractive" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}