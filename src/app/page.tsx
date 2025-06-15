// app/page.tsx

import { getSortedPostsData } from 'lib/posts';
import { Grid1 } from "ui/grid";
import { Box2 } from 'ui/box';
// Make sure to import Container
import { Box, Container } from '@mui/material';

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
      {/* SECTION 1: HERO / SLOGAN SCREEN (No change here) */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box2 />
      </Box>

      {/* 
        SECTION 2: CONTENT
        Replace the full-width Box with a Container.
        This centers your grid on the page with a responsive maximum width.
      */}
      <Container maxWidth="lg">
        <Grid1 posts={allPostsData} />
      </Container>
    </Box>
  );
}