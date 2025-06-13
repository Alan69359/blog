import * as React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Link from 'next/link';
import { format } from 'date-fns';
import Avatar1 from 'ui/avatar';

// Profile card component
export function Card1() {
  const postCount = 2;
  const tagCount = 0;

  return (
    <Card sx={{ margin: '32px' }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar1 />
      </CardContent>

      <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ margin: '8px', textAlign: 'center' }}>
          <Typography>
            Post<br />{postCount}
          </Typography>
        </Box>
        <Box sx={{ margin: '8px', textAlign: 'center' }}>
          <Typography>
            Tag<br />{tagCount}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button href="https://github.com/Alan69359">
          <GitHubIcon />
        </Button>
        <Button href="https://www.linkedin.com/in/ngai-kam-lun-a02a61174/">
          <LinkedInIcon />
        </Button>
      </CardActions>
    </Card>
  );
}

// Type definitions
export interface PostData {
  slug: string;
  title: string;
  date: string;
  contentHtml: string;
}

export interface BlogListProps {
  posts: PostData[];
}

// Helper function to validate and format date
const formatPostDate = (dateString: string): React.ReactNode => {
  const date = new Date(dateString);
  const isValidDate = !isNaN(date.getTime());

  if (isValidDate) {
    return (
      <Typography variant="caption" color="text.secondary">
        {format(date, 'MMMM d, yyyy')}
      </Typography>
    );
  }

  return (
    <Typography variant="caption" color="error">
      Invalid date
    </Typography>
  );
};

// Blog post card component
export const Card2: React.FC<{ post: PostData }> = ({ post }) => (
  <Card sx={{ mb: 3 }}>
    <Link href={`/blog/${post.slug}`}>
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom>
          {post.title}
        </Typography>

        {formatPostDate(post.date)}

        <Typography variant="body1" sx={{ mt: 2 }}>
          <span dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </Typography>
      </CardContent>
    </Link>
  </Card>
);

export function Card3 () {
  return (
    <Card
      sx={{
        // The main glassmorphism styles
        background: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
        backdropFilter: 'blur(10px)', // The frosted glass effect
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',

        // Layout and other styles
        maxWidth: 345,
        minHeight: 400,
        color: 'white',
        textAlign: 'center',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        <Avatar1/>
        <Typography variant="h5" component="div" sx={{ mt: 2, fontWeight: 'bold' }}>
          Jane Doe
        </Typography>
        <Typography sx={{ mb: 1.5, color: 'rgba(255, 255, 255, 0.8)' }}>
          Frontend Developer
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Crafting beautiful and functional web experiences with React, Next.js, and a cup of coffee.
        </Typography>
      </CardContent>

      <Box>
        <Box sx={{ my: 2 }}>
          <IconButton href="#" sx={{ color: 'white' }}>
            <GitHubIcon />
          </IconButton>
          <IconButton href="#" sx={{ color: 'white' }}>
            <LinkedInIcon />
          </IconButton>
          <IconButton href="#" sx={{ color: 'white' }}>
            <TwitterIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          sx={{
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#fda085',
            fontWeight: 'bold',
            '&:hover': {
              background: 'white'
            }
          }}
        >
          Follow
        </Button>
      </Box>
    </Card>
  );
};