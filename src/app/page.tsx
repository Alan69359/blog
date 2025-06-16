// app/page.tsx

import { getSortedPostsData } from 'lib/posts';
import { Grid1 } from "ui/grid";
import { Box2 } from 'ui/box';
import { Box, Container } from '@mui/material';
import { Image1 } from 'lib/image'; // Assuming you created this from the last step

type PostSummary = {
  slug: string;
  date: string;
  title: string;
};

// 3. Update the type assertion to use the correct type.
//    Now, what the function returns matches what you say it is.
const allPostsData = (await getSortedPostsData()) as PostSummary[];

export default async function Home() {
  return (
    <>
      <Image1 />

      <Box>
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

        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* 
            The Grid1 component likely expects a 'posts' prop. 
            Make sure its own internal type definition also matches PostSummary.
            If you get an error on the line below, you'll need to update the types inside `ui/grid.tsx`.
          */}
          <Grid1 posts={allPostsData} />
        </Container>
      </Box>
    </>
  );
}