import { getSortedPostsData } from 'lib/posts';
import {Grid1} from "ui/grid";
import {Box11} from 'ui/box';

type Post = {
  slug: string;
  date: string;
  title: string;
  contentHtml: string;
};

const allPostsData = (await getSortedPostsData()) as Post[];

export default async function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    }}>
      {/* Box1 takes exactly one screen height minus header/footer */}
      <div style={{
        height: 'calc(100vh - 128px)', // Adjust this value based on your actual header + footer height
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <Box11 style={{
          height: '100%',
          overflow: 'auto'
        }} />
      </div>

      {/* Remaining content flows below Box1 */}
      <div style={{
        flex: '0 0 auto'
      }}>
        <Grid1 posts={allPostsData} />
      </div>
    </div>
  );
}