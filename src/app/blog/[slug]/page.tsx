import { getPostData, getAllPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts.map(post => ({
    slug: post.slug,
  }));
}
 
// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({
  params,
}) {

  // First access params synchronously
  const { slug } = await params;
  
  // Then perform async operations
  const post = await getPostData(slug);
  if (!post) {
    notFound();
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div className="text-gray-500 mb-4">
        {new Date(post.date).toLocaleDateString()}
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}