import * as React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from 'next/link';
import { format } from 'date-fns';
import Avatar1 from 'ui/avatar';

// Profile card component
export function Card1() {
  const postCount = 0;
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
interface PostData {
  slug: string;
  title: string;
  date: string;
  contentHtml: string;
}

interface BlogListProps {
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
const Card2: React.FC<{ post: PostData }> = ({ post }) => (
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

// Blog list component
export function Box1({ posts }: BlogListProps): React.JSX.Element {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Latest Posts
      </Typography>

      {posts.map((post, index) => (
        <React.Fragment key={post.slug}>
          <Card2 post={post} />
          {index < posts.length - 1 && <Divider sx={{ my: 2 }} />}
        </React.Fragment>
      ))}
    </Box>
  );
}