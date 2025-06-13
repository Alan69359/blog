// app/page.tsx (or wherever your homepage is)

import { getSortedPostsData } from 'lib/posts';
import { Grid1 } from "ui/grid";
import { Box2 } from 'ui/box';
import { Box } from '@mui/material'; // Import MUI Box

type Post = {
  slug: string;
  date: string;
  title: string;
  contentHtml: string;
};

const allPostsData = (await getSortedPostsData()) as Post[];

export default async function Home() {
  return (
    <Box>
      {/* 
        SECTION 1: HERO / SLOGAN SCREEN
        This takes up the full viewport height. The sticky header will scroll with it initially.
      */}
      <Box
        sx={{
          minHeight: '100vh',
          // Your background is now global, so we don't need it here.
          // This Box's only job is to be 100vh tall and center the slogan.
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box2 />
      </Box>

      {/* 
        SECTION 2: CONTENT GRID
        This will appear immediately after the hero section with no gap.
      */}
      <Box
        sx={{
          // Give it a subtle background to distinguish it from the hero.
          // This will sit on top of your fixed wallpaper.
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          padding: { xs: 2, md: 4 }, // Add padding around the grid
        }}
      >
        <Grid1 posts={allPostsData} />
      </Box>
    </Box>
  );
}