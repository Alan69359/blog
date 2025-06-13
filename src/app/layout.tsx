// // src/app/layout.tsx
// 'use client';

// import "styles/global.css";
// import Header from 'src/app/layout/header';
// import Footer from "src/app/layout/footer";
// import * as React from 'react';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';
// import { theme } from 'lib/theme';
// import dynamic from 'next/dynamic';
// import Script from 'next/script';

// const Live2dWidget = dynamic(() => import('lib/Live2dWidget'), {
//   ssr: false,
// });

// const Background = styled(Box)({ /* ... your styles ... */ });

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const modelUrl = "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/mao/mao.model3.json";
  

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <html lang="en">
//         <head>
//           <Script
//             src="/live2d/CubismSdkForWeb-5-r.4/Core/live2dcubismcore.js"
//             strategy="beforeInteractive"
//           />
//         </head>
//         <body>
//           <Background />
//           <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//             <Header />
//             <Box component="main" sx={{ flexGrow: 1 }}>
//               {children}
//             </Box>
//             <Footer />
//           </Box>
//           <Live2dWidget modelUrl={modelUrl} />
//         </body>
//       </html>
//     </ThemeProvider>
//   );
// }

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
import Live2DViewer from "@/lib/Live2DViewer";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <html lang="en">
        <head></head>
        <body>
          <Background />
          {/* KEY CHANGE: Removed the wrapping Box and flexbox styles */}
          <Header />
          <Box component="main">
            {children}
          </Box>
          <Live2DViewer />
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}