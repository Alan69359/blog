"use client"

import * as React from 'react';
import { Box } from '@mui/material';

import * as Card0 from 'ui/card';
import { Box4 } from 'ui/box';

export function Grid1({ posts }) {
  return (
    // 1. THE MAIN CONTAINER: A flexbox row.
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'center', md: 'flex-start' }, // Top-align on desktop
        gap: { xs: 4, md: 4 }, // The space between the two items
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box4 posts={posts} />
      </Box>

      {/* 
        3. RIGHT COLUMN (Profile Card): This is not wrapped.
        As a direct child of the flex container, it will take up only its
        natural width, and will not grow or shrink. This is exactly what we want.
      */}
      <Card0.Card3 />

    </Box>
  );
}