import { getAllPostIds, getPostData } from "@/lib/posts";
import Date from "@/components/date";
import { Metadata } from "next";

type PostData = {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
};

// Generate static params for all posts
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({
    id: path.params.id,
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  const postData = await getPostData(id) as PostData;
  return {
    title: postData.title,
  };
}

export default async function Post({ params }: { params: { id: string } }) {
  const { id } = await params;
  const postData = await getPostData(id) as PostData;
  
  return (
    <article>
      <h1>{postData.title}</h1>
      <div>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
} 