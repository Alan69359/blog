import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Avatar1 from '@/components/avatar';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  Typography,
  Divider,
} from '@mui/material';
import Box from '@mui/material/Box';
import {PostData} from '@/src/app/posts/[id]/page';
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
          <Button
            href='https://github.com/Alan69359'
          ><GitHubIcon />
          </Button>
          <Button><LinkedInIcon/></Button>
        </CardActions>
      </Card>
  );
}

interface BlogListProps {
  posts: PostData[];
}

// const BasicCard3 : React.FC<PostData> = ({ posts}) => {
export function Cards1 ({ posts }: BlogListProps):React.JSX.Element {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Latest Posts
      </Typography>
      
      {posts.map((post) => (
        <React.Fragment key={post.id}>
          <Card sx={{ mb: 3 }}>
            <Link href={`/posts/${post.id}`}>
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
    // <h2>Blog</h2>
    //         <ul>
    //           {posts.map(({ id, date, title }) => (
    //             <li key={id}>
    //               <Link href={`/posts/${id}`}>{title}</Link>
    //               <br />
    //               <small>
    //                 <Date dateString={date}/>
    //               </small>
    //             </li>
    //           ))}
    //         </ul>       
}