// ui/grid.tsx
"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
// The import is correct. The usage was the issue.
import { Grid } from '@mui/material';

import * as Card0 from '@/ui/card';
import { Box4 } from '@/ui/box';

export function Grid1({ posts }) {
  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      {/* The container is defined with 12 columns by default */}
      <Grid container spacing={{ xs: 2, md: 4 }}>

        {/*
          THE CORRECT GRID V2 SYNTAX:
          We use the `sx` prop to define the column span for different breakpoints.
          'gridColumn: "span 8"' means "this item should take up 8 columns".
        */}
        <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 8' } }}>
          <Box4 posts={posts} />
        </Grid>

        <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
          <Card0.Card3 />
        </Grid>

      </Grid>
    </Box>
  );
}