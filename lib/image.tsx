// components/home-page-background.tsx

'use client'; // This directive is crucial!

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const Background1 = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // Puts it behind all other content

    backgroundImage: "url('/images/wallpaper1.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    // Use optional chaining `?.` for safety. It's good practice.
    filter: theme.vars?.palette.appBackground.imageFilter ?? 'none',

    transition: 'filter 0.3s ease-in-out',
}));

const Background2 = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // Puts it behind all other content

    backgroundImage: "url('/images/wallpaper2.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    // Use optional chaining `?.` for safety. It's good practice.
    filter: theme.vars?.palette.appBackground.imageFilter ?? 'none',

    transition: 'filter 0.3s ease-in-out',
}));

// background image of home page
export function Image1() {
    // This component just renders the styled Box
    return <Background1 />;
}

// background image of blog page
export function Image2() {
    // This component just renders the styled Box
    return <Background2 />;
}