import { getSortedPostsData } from '@/lib/posts';
import Grid1 from "@/components/grid"
import Box1 from '@/components/box';

type Post = {
  id: string;
  date: string;
  title: string;
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