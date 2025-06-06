import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Avatar1 from 'ui/avatar';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  Typography,
  Divider,
} from '@mui/material';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { format } from 'date-fns';

export function Card1() {
  var int1 = 0, int2 = 0

  return (
      <Card sx={{ margin: '32px'}}>
        <CardContent sx={{ display: 'flex', justifyContent: 'center'}}>
          <Avatar1/>
        </CardContent>
        <CardContent sx={{ display: 'flex' ,justifyContent: 'center' }}>
          <Box sx={{margin:'8px', textAlign: 'center'}}>
            <Typography>Post<br/>{int1}</Typography>
          </Box>
          <Box sx={{margin:'8px', textAlign: 'center'}}>
            <Typography>Tag<br/>{int2}</Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button href='https://github.com/Alan69359'>
            <GitHubIcon />
          </Button>
          <Button href='https://www.linkedin.com/in/ngai-kam-lun-a02a61174/'>
            <LinkedInIcon/>
          </Button>
        </CardActions>
      </Card>
  );
}

type PostData = {
  slug: string;
  title: string;
  date: string;
  contentHtml: string;
};

interface BlogListProps {
  posts: PostData[];
}

export function Cards1 ({ posts }: BlogListProps):React.JSX.Element {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Latest Posts
      </Typography>
      
      {posts.map((post) => (
        <React.Fragment key={post.slug}>
          <Card sx={{ mb: 3 }}>
            <Link href={`/blog/${post.slug}`}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  {post.title}
                </Typography>
                {post.date && !isNaN(new Date(post.date).getTime()) ? (
                  <Typography variant="caption" color="text.secondary">
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </Typography>
                ) : (
                  <Typography variant="caption" color="error">
                    Invalid date
                  </Typography>
                )}
                <Typography variant="body1" sx={{ mt: 2 }}>
                  <span dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                </Typography>
              </CardContent>
            </Link>
          </Card>
          <Divider sx={{ my: 2 }} />
        </React.Fragment>
      ))}
    </Box>
  )     
}