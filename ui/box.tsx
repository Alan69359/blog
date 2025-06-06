import * as React from 'react';
import Box from '@mui/material/Box';
import styles from '@/styles/body.module.css'
import { Typography } from '@mui/material';

export default function Box1() {
  return (
    <Box className={styles.box1}>
        <Typography className={styles.text1}>
        「俺はこの世界で本気で生きていこう。もう、二度と後悔はしないように。全力で。」<br />“我将在这个世界中认真地活下去，不再有任何遗憾，全力以赴。“
        </Typography>
    </Box>
  );
}