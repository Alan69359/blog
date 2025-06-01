"use client"

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BasicCard from './card';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  boxShadow: 'none',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Item1 = styled(Item)({
  backgroundColor: 'transparent',
  height: 'calc(699.333px - 64px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default function ColumnsGrid() {
  return (
    <Box sx={{ backgroundColor: 'transparent' }}>
      <Grid container spacing={8}>
        <Grid size={12}>
          <Item1>「俺はこの世界で本気で生きていこう。もう、二度と後悔はしないように。全力で。」<br />“我将在这个世界中认真地活下去，不再有任何遗憾，全力以赴。“</Item1>
        </Grid>
        <Grid size={8} sx={{ margin: '32px' }}>
          <Item >Blogs</Item>
        </Grid>
        <Grid size="grow">
          <BasicCard/>
        </Grid>
      </Grid>
    </Box>
  );
}