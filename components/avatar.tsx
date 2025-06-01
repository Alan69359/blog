import * as React from 'react';
import Avatar from '@mui/material/Avatar';

export default function ImageAvatars() {
  return (
    <Avatar
        alt="Avatar"
        src="/images/profile.jpg"
        sx={{ width: 64, height: 64}}
    />
  );
}