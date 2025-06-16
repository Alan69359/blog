// src/lib/posts.ts
"use server";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Define the shapes of your data
export interface PostFrontMatter {
  title: string;
  date: string;
  excerpt: string;
}

export type PostSummary = PostFrontMatter & {
  slug: string;
};

export type PostData = PostFrontMatter & {
  slug: string;
  contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), "src/app/posts"); // Assuming posts are in the root `posts` folder

export async function getSortedPostsData(): Promise<PostSummary[]> {
  const fileNames = await fs.readdir(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        ...(data as PostFrontMatter),
      };
    })
  );

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllPostSlugs() {
  const fileNames = await fs.readdir(postsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ""),
  }));
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Now TypeScript knows that matterResult.data contains a title, date, etc.
  return {
    slug,
    contentHtml,
    ...(matterResult.data as PostFrontMatter),
  };
}
