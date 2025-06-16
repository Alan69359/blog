// src/app/page.tsx

import { getSortedPostsData } from 'lib/posts';
import InteractiveBook from 'lib/InteractiveBook';
import { Box } from '@mui/material';

export default async function BlogPage() {
    const allPosts = await getSortedPostsData();

    return (
        // VVV THIS IS THE NEW, UNIFIED CONTAINER VVV
        <Box sx={{
            // 1. This tells the component to grow and fill the <main> area.
            flexGrow: 1,
            position: 'relative', // This is the anchor for our background.

            // 2. These styles center the InteractiveBook.
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            // 3. This is a crucial property for robust z-index layering.
            isolation: 'isolate',

            // 4. We create the background using a CSS pseudo-element.
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,

                // Your background styles are applied here
                backgroundImage: 'url(/images/wallpaper2.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',

                // This places the background behind the content of THIS box.
                zIndex: -1,
            },
        }}>
            {/* The InteractiveBook is now the only direct child, making centering simple. */}
            <InteractiveBook posts={allPosts} />
        </Box>
    );
}