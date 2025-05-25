import type { Metadata } from "next";

const siteTitle = "Alan's Blog";

export const metadata: Metadata = {
  title: siteTitle,
  description: "Learn how to build a personal website using Next.js",
  openGraph: {
    title: siteTitle,
    images: [`https://og-image.vercel.app/${encodeURI(siteTitle)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.app%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`],
  },
  twitter: {
    card: 'summary_large_image',
  },
}; 