import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ImageAvatars from '@/components/avatar';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

var int1=0, int2=0

export default function BasicCard() {
  return (
      <Card sx={{ margin: '32px'}}>
        <CardContent sx={{ display: 'flex', justifyContent: 'center'}}>
          <ImageAvatars/>
        </CardContent>
        <CardContent sx={{ display: 'flex' ,justifyContent: 'center' }}>
          <Box sx={{margin:'8px', textAlign: 'center'}}>
            <Typography>Post<br/>{int1}</Typography>
          </Box>
          <Box sx={{margin:'8px', textAlign: 'center'}}>
            <Typography>Tag<br/>{int2}</Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button><GitHubIcon/></Button>
          <Button><LinkedInIcon/></Button>
        </CardActions>
      </Card>
  );
}