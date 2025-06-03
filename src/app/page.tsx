import { getSortedPostsData } from '@/lib/posts';
import ColumnsGrid from "@/components/grid"

type Post = {
  id: string;
  date: string;
  title: string;
};

const allPostsData = (await getSortedPostsData()) as Post[];

export default async function Home() {
  return (
    <>
      <ColumnsGrid posts={allPostsData}/>
    </>
  );
}