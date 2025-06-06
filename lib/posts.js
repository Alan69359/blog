'use server'

import fs from "fs/promises";
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), '/src/app/posts');

export async function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = await fs.readdir(postsDirectory);
    const allPostsData = await Promise.all(fileNames.map(async fileName => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents =await fs.readFile(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        slug,
        ...matterResult.data,
      };
    }));

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getAllPostSlugs() {
  const fileNames = await fs.readdir(postsDirectory);

  return fileNames.map(fileName => {
    return {
        slug: fileName.replace(/\.md$/, ""),
    };
  });
}

export async function getPostData(slug){
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents=await fs.readFile(fullPath,'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult=matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent=await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml=processedContent.toString();

    // Combine the data with the id
    return {
      slug,
      contentHtml,
      ...matterResult.data,
    };
}