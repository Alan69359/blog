'use client';

import "@/styles/global.css";
import Header from '@/src/app/layout/header'
import Footer from "@/src/app/layout/footer";
import * as React from 'react';
import Script from 'next/script';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/lib/theme'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html>
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeProvider
          theme={theme}
          defaultMode="system"
          modeStorageKey="my-app-mode"
          colorSchemeStorageKey="my-app-color-scheme"
        >
          <div style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%'
          }}>
            {/* Fixed header */}
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 2
            }}>
              <Header />
            </div>

            {/* Main content area */}
            <main style={{
              flex: '1 0 auto',
              width: '100%',
              padding: '0',
              boxSizing: 'border-box',
              paddingTop: '64px' // Adjust based on your header height
            }}>
              {children}
            </main>

            {/* Fixed footer */}
            <div style={{
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 2
            }}>
              <Footer />
            </div>

            <link rel="stylesheet" href="/live2d-widget/dist/waifu.css" />
            <Script src="/live2d-widget/dist/autoload.js" strategy="afterInteractive" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}