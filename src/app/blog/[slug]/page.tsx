// src/app/posts/[slug]/page.tsx

import { getPostData, getAllPostSlugs } from "lib/posts"; // Using the '@/' alias is common
import { notFound } from "next/navigation";
import { Typography, Box } from '@mui/material'; // Let's use MUI components!

// This function is perfect. It tells Next.js which pages to build.
// A small simplification: `getAllPostSlugs` already returns the correct format, so you don't need to .map() again.
export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts; // This is enough!
}

// Generate dynamic metadata for the <head> of the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);
  return {
    title: postData.title,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <Box component="article">
      <Typography variant="h3" component="h1" gutterBottom>
        {post.title}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        {new Date(post.date).toLocaleDateString(/* ... your date options ... */)}
      </Typography>

      {/* This is your existing post content */}
      <Box
        sx={{ /* ... your existing sx styles for content ... */ }}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* 
        VVV  ADD THIS NEW SECTION  VVV
        This is the author signature and seal.
      */}
      <Box sx={{
        mt: 6, // Add some margin top to separate it from the content
        display: 'flex',
        justifyContent: 'flex-end', // Aligns the box to the right
        alignItems: 'center'
      }}>
        <Typography variant="body1" sx={{ mr: 1.5, fontStyle: 'italic' }}>
          Your Name
        </Typography>

        {/* This is the hanko (seal) */}
        <Box sx={{
          width: 36,
          height: 36,
          backgroundColor: '#c62828', // A deep, rich red
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
          fontFamily: '"Zen Kurenaido", sans-serif', // A font that looks good for seals
          fontSize: '1.2rem',
          border: '2px solid #a32020', // A slightly darker border
          boxShadow: '1px 1px 3px rgba(0,0,0,0.2)' // A subtle shadow to give it depth
        }}>
          印
        </Box>
      </Box>
      {/* ^^^ END OF NEW SECTION ^^^ */}
    </Box>
  );
}