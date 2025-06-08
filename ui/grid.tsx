"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as Card0 from './card';

export default function Grid1({ posts }) {
  return (
    <Box sx={{
      backgroundColor: 'transparent',
      width: '100%', // Ensure full width
      margin: 0,     // Remove any margin
      padding: 0     // Remove any padding
    }}>
      <Grid container spacing={2} sx={{
        width: '100%',
        margin: 0,
        '& .MuiGrid-item': {
          paddingLeft: '16px', // Add padding to grid items instead of margin
          paddingRight: '16px'
        }
      }}>
        <Grid size={8} sx={{
          paddingTop: '32px',
          paddingBottom: '32px'
        }}>
          <Card0.Box1 posts={posts} />
        </Grid>
        <Grid size="grow" sx={{
          paddingTop: '32px',
          paddingBottom: '32px'
        }}>
          <Card0.Card1 />
        </Grid>
      </Grid>
    </Box>
  );
}