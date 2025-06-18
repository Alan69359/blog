'use client';

import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';

// Styled component for the main slogan section, replacing the inline `sx` prop.
export const SloganWrapper = styled(Box)({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

// Styled component for the container of the blog posts grid.
export const PostsGridWrapper = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
}));

export const Background1 = styled(Box)(({ theme }) => ({
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

export const Background2 = styled(Box)({
    position: 'fixed',
    inset: 0,
    zIndex: -1,
    backgroundImage: "url('/images/wallpaper2.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});