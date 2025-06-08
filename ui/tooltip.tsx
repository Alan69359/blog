'use client'

import { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => setMode(mode === 'dark' ? 'light' : 'dark');

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Tooltip title="Toggle light/dark mode">
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
    </div>
  );
}