// src/app/blog/page.tsx  (or whichever file is your homepage)

import * as React from 'react';
import { getSortedPostsData } from 'lib/posts';
import { Box } from '@mui/material';
import InteractiveBook from 'lib/InteractiveBook';
import { StyledPageBackground } from 'styles/client'; // Your background

const styles = {
    contentContainer: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        // THE FIX: Change paddingBottom to paddingTop.
        // This creates space at the top of the container, pushing the book down.
        // Adjust the value to get the perfect spacing.
        paddingTop: '64px',
    },
  };

export default async function BlogPage() {
    const allPosts = await getSortedPostsData();

    return (
        <>
            <StyledPageBackground imageUrl='images/wallpaper2.jpg' />

            <Box sx={styles.contentContainer}>
                {/* Now you can safely restore your book component. */}
                <InteractiveBook posts={allPosts} />
            </Box>
        </>
    );
}