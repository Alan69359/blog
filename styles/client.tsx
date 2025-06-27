// src/styles/client.tsx

'use client';

import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';

// --- Unchanged Components ---
export const SloganWrapper = styled(Box)({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const PostsGridWrapper = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
}));

// --- Updated Reusable Background Component ---

interface StyledPageBackgroundProps {
    imageUrl: string;
}

export const StyledPageBackground = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'imageUrl',
})<StyledPageBackgroundProps>(
    ({ imageUrl }: StyledPageBackgroundProps) => ({ // We no longer need `theme` here
        // --- The container itself holds the image ---
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url('${imageUrl}')`,

        // --- The ::before pseudo-element acts as our overlay ---
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transition: 'background-color 0.3s ease-in-out',

            // --- THE FIX: Let CSS handle the theme change ---

            // 1. Define the default (light mode) overlay color
            backgroundColor: 'rgba(255, 255, 255, 0.4)',

            // 2. Define the dark mode override using a CSS selector.
            // MUI adds `data-mui-color-scheme="dark"` to the <html> tag in dark mode.
            // This selector says: "When an ancestor has that attribute, apply this style to me."
            '[data-mui-color-scheme="dark"] &': {
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
            },
        },
    })
);