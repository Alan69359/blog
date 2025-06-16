// src/components/InteractiveBook.tsx
'use client';

import React, { useState } from 'react';
import { List, ListItemButton, ListItemText, Typography, Divider, Box } from '@mui/material';
import Link from 'next/link';
import { type PostSummary } from 'lib/posts';

// This is just the visual component for the cover's title
const CoverTitle = () => (
    <Box sx={{
        backgroundColor: '#fdfaf5', padding: '1rem 0.5rem', border: '1px solid #d3c3a7',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', height: '250px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
        <Typography sx={{
            fontFamily: '"Yuji Syuku", serif', fontSize: '2.5rem', color: 'black',
            writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '0.5rem',
        }}>
            友人帳
        </Typography>
    </Box>
);

export default function InteractiveBook({ posts }: { posts: PostSummary[] }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenBook = () => {
        setIsOpen(true);
    };

    return (
        // This is the main book container.
        <Box
            onClick={!isOpen ? handleOpenBook : undefined}
            sx={{
                position: 'relative',

                width: '40vh',
                height: '70vh',

                // Set maximums to prevent it from getting too big on large screens
                maxWidth: '400px',
                maxHeight: '600px',
                cursor: isOpen ? 'default' : 'pointer',
            }}
        >
            {/* Layer 1: The Cover Page - (no changes) */}
            <Box
                sx={{
                    position: 'absolute', width: '100%', height: '100%',
                    backgroundColor: '#385145', border: '3px solid #3e2723',
                    borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'opacity 0.5s ease-out',
                    opacity: isOpen ? 0 : 1,
                    pointerEvents: isOpen ? 'none' : 'auto',
                }}
            >
                {/* The red binding only appears on the front */}
                <Box sx={{
                    position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)',
                    width: 'calc(100% - 4rem)', height: '0.25rem', backgroundColor: '#c62828',
                    '&::before, &::after': {
                        content: '""', position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                        width: '1rem', height: '1rem', borderRadius: '50%', backgroundColor: '#1a2e24',
                        border: '2px solid #3e2723',
                    },
                    '&::before': { left: '2rem' },
                    '&::after': { right: '2rem' },
                }} />
                <CoverTitle />
            </Box>

            {/* Layer 2: The Content Page */}
            <Box
                sx={{
                    position: 'absolute', width: '100%', height: '100%',
                    backgroundColor: '#fbfaf5', border: '3px solid #3e2723',
                    borderRadius: '8px', padding: '1rem', color: '#444',
                    transition: 'opacity 0.5s ease-in',
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                }}
            >
                {/*
                    VVV THIS IS THE CHANGE VVV
                    The decorative Box that created the ruled lines has been completely removed.
                */}

                {/* The List of posts now fills the entire content area directly. */}
                <List sx={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                    {posts.map(({ slug, title, date }) => (
                        <ListItemButton key={slug} component={Link} href={`/posts/${slug}`}>
                            <ListItemText
                                primary={<Typography variant="h6" component="span" sx={{ fontFamily: 'serif' }}>{title}</Typography>}
                                secondary={new Date(date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Box>
    );
}