"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as Card0 from './card';

export default function Grid1({posts}) {
  return (
    <Box sx={{ backgroundColor: 'transparent' }}>
      <Grid container spacing={8}>
        <Grid size={8} sx={{ margin: '32px' }}>
          <Card0.Cards1 posts={posts}/>
        </Grid>
        <Grid size="grow">
          <Card0.Card1/>
        </Grid>
      </Grid>
    </Box>
  );
}