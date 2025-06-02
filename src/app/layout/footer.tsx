import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function BottomAppBar() {
  return (
    <AppBar position="static" color="transparent" sx={{ mt: 'auto' }}>
      <Toolbar>
        <Typography sx={{ textAlign: 'center', width: '100%' }}>© 2025 Alan69359. All rights reserved.</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default function Footer(){
    return (
        <BottomAppBar />
    )
}