'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';
import { createContext, useContext } from 'react';

// export default function DardMode() {
//   const { mode, setMode } = useColorScheme();
//   if (!mode) {
//     return null;
//   }
  
//   const toggleMode = () => {
//     setMode(mode === 'light' ? 'dark' : 'light');
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         width: '100%',
//         alignItems: 'center',
//         justifyContent: 'center',
//         bgcolor: 'background.default',
//         color: 'text.primary',
//         borderRadius: 1,
//         p: 3,
//         minHeight: '56px',
//       }}
//     >
//       <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
//         {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
//       </IconButton>
//     </Box>
//   );
// }

// const theme = createTheme({
//   colorSchemes: {
//     dark:true
//   },
// });

type ColorMode = 'light' | 'dark';
type ColorModeContextType = {
  mode: ColorMode;
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
}