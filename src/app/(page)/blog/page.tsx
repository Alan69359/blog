// src/app/page.tsx (Server Component)

import { getSortedPostsData } from 'lib/posts';
import InteractiveBook from 'lib/InteractiveBook'; // Import our new component
import { Box } from '@mui/material';
import { Image2 } from 'lib/image';

export default async function BlogPage() {
    // 1. Fetch data on the server
    const allPosts = await getSortedPostsData();

    // 2. Render a simple layout wrapper
    return (
        <>
            <Image2 />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 200px)', // Adjust height to roughly center the book
                py: 4,
            }}>
                {/* 3. Pass the server-fetched data to the client component */}
                <InteractiveBook posts={allPosts} />
            </Box>
        </>
    );
}