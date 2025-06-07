import { getSortedPostsData } from '@/lib/posts';
import Grid1 from "ui/grid";
import Box1 from 'ui/box';

type Post = {
  slug: string;
  date: string;
  title: string;
  contentHtml:string;
};

const allPostsData = (await getSortedPostsData()) as Post[];

export default async function Home() {
  return (
    <>
      <Box1/>
      <Grid1 posts={allPostsData}/>
    </>
  );
}