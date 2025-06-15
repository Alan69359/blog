'use client'

import { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
// Import the type definition for IconButton's props for better type safety
import { IconButtonProps } from '@mui/material/IconButton';

// ----- FIX #1: Define an interface for the props this component can accept -----
interface ThemeToggleProps {
  // We make the `color` prop optional and use the official MUI type
  color?: IconButtonProps['color'];
}

// ----- FIX #2: Update the function signature to accept the `color` prop -----
export default function ThemeToggle({ color }: ThemeToggleProps) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Returning a placeholder IconButton is a good way to reserve space
  // and prevent layout shifts during hydration.
  if (!mounted) return <IconButton />;

  const toggleTheme = () => setMode(mode === 'dark' ? 'light' : 'dark');

  // I've removed the unnecessary `div` wrapper for a cleaner component structure.
  return (
    <Tooltip title="Toggle light/dark mode">
      {/* ----- FIX #3: Pass the received `color` prop down to the IconButton ----- */}
      {/* This replaces the hardcoded `color="inherit"`. */}
      <IconButton onClick={toggleTheme} color={color}>
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
}