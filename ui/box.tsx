'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

interface Box1Props {
  style?: React.CSSProperties;
}

export default function Box1({ style }: Box1Props) {
  return (
    <Box
      sx={{
        // Keep box transparent for background image
        backgroundColor: 'transparent',
        padding: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        ...style
      }}
    >
      <Typography
        sx={{
          // Use CSS variables that automatically change with theme
          color: 'var(--mui-palette-text-primary)',
          fontSize: '1.5rem',
          fontWeight: 400,
          textAlign: 'center',
          lineHeight: 1.6,
          // Add text shadow for better visibility over background
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          transition: 'color 0.3s ease, text-shadow 0.3s ease',
        }}
      >
        「俺はこの世界で本気で生きていこう。もう、二度と後悔はしないように。全力で。」<br />"我将在这个世界中认真地活下去，不再有任何遗憾，全力以赴。"
      </Typography>
    </Box>
  );
}