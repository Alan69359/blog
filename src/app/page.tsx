// app/page.tsx

import { getSortedPostsData } from 'lib/posts';
import { Grid1 } from "ui/grid";
import { Box2 } from 'ui/box';
import { Box } from '@mui/material';
import { StyledPageBackground } from 'styles/client';
import { SloganWrapper, PostsGridWrapper } from 'styles/client';

type PostSummary = {
  slug: string;
  date: string;
  title: string;
};

export default async function Home() {
  const allPostsData = (await getSortedPostsData()) as PostSummary[];

  return (
    <>
      <StyledPageBackground imageUrl='/images/wallpaper1.jpg' />
      <Box>
        <SloganWrapper>
          <Box2 />
        </SloganWrapper>
        <PostsGridWrapper>
          <Grid1 posts={allPostsData} />
        </PostsGridWrapper>
      </Box>
    </>
  );
}