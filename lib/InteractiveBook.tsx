// lib/InteractiveBook.tsx
"use client";

import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import Link from "next/link";
import { type PostSummary } from "lib/posts";

const styles = {
  // This is now the root style for the component.
  // It defines the size of the book itself.
  mainContainer: {
    "@keyframes flip-and-fade-out": {
      "0%": { transform: "rotateX(0deg)", opacity: 1 },
      "50%": { transform: "rotateX(180deg)", opacity: 1 },
      "100%": {
        transform: "rotateX(360deg)",
        opacity: 0,
        pointerEvents: "none",
      },
    },
    position: "relative",
    width: "40vh",
    height: "70vh",
    maxWidth: "400px",
    maxHeight: "600px",
    perspective: "1500px",
  },
  contentPage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#fbfaf5",
    border: "3px solid #3e2723",
    borderRadius: "8px",
    padding: "1rem",
    color: "#444",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
  },
  contentPageTitle: {
    textAlign: "center",
    mb: 2,
    fontFamily: '"Yuji Syuku", serif',
    flexShrink: 0,
  },
  postList: {
    overflowY: "auto",
    "&::-webkit-scrollbar": { width: "8px" },
    "&::-webkit-scrollbar-track": { backgroundColor: "#fdfaf5" },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#d3c3a7",
      borderRadius: "4px",
    },
  },
  postListItem: {
    textAlign: "right",
    "&:hover": { backgroundColor: "rgba(211, 195, 167, 0.2)" },
  },
  postListItemText: {
    "& .MuiListItemText-primary": {
      fontFamily: '"Yuji Syuku", serif',
      fontSize: "1.2rem",
      color: "#3e2723",
    },
  },
  coverContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 3,
    transformStyle: "preserve-3d",
    transformOrigin: "top center",
    animation: "flip-and-fade-out 1.5s ease-in-out forwards",
  },
  coverFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#385145",
    border: "3px solid #3e2723",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
  },
  coverFaceFront: {
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
  coverBinding: {
    position: "absolute",
    top: "1.5rem",
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100% - 4rem)",
    height: "0.25rem",
    backgroundColor: "#c62828",
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "1rem",
      height: "1rem",
      borderRadius: "50%",
      backgroundColor: "#1a2e24",
      border: "2px solid #3e2723",
    },
    "&::before": { left: "2rem" },
    "&::after": { right: "2rem" },
  },
  coverTitleBox: {
    backgroundColor: "#fdfaf5",
    padding: "1rem 0.5rem",
    border: "1px solid #d3c3a7",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    height: "250px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  coverTitleText: {
    fontFamily: '"Yuji Syuku", serif',
    fontSize: "2.5rem",
    color: "black",
    writingMode: "vertical-rl",
    textOrientation: "mixed",
    letterSpacing: "0.5rem",
  },
  // The problematic box1 style is now completely removed.
} as const;

const CoverTitle = () => (
  <Box sx={styles.coverTitleBox}>
    <Typography sx={styles.coverTitleText}>友人帳</Typography>
  </Box>
);

export default function InteractiveBook({ posts }: { posts: PostSummary[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBook = () => {
    if (!isOpen) setIsOpen(true);
  };

  // THE FIX: The root element is now the book's main container.
  // The outer wrapper <Box sx={styles.box1}> has been REMOVED.
  return (
    <Box
      onClick={handleOpenBook}
      sx={[styles.mainContainer, { cursor: isOpen ? "default" : "pointer" }]}
    >
      <Box
        sx={[
          styles.contentPage,
          {
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
          },
        ]}
      >
        <Typography variant="h5" component="h2" sx={styles.contentPageTitle}>
          目次
        </Typography>
        <List sx={styles.postList}>
          {posts.map((post) => (
            <ListItemButton
              key={post.slug}
              component={Link}
              href={`/blog/${post.slug}`}
              sx={styles.postListItem}
            >
              <ListItemText
                primary={post.title}
                sx={styles.postListItemText}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box
        sx={[
          styles.coverContainer,
          { animationPlayState: isOpen ? "running" : "paused" },
        ]}
      >
        <Box sx={[styles.coverFace, styles.coverFaceFront]}>
          <Box sx={styles.coverBinding} />
          <CoverTitle />
        </Box>
        <Box sx={[styles.coverFace, { transform: "rotateX(180deg)" }]}>
          <Typography variant="caption" sx={{ color: "#aaa" }}>
            The inside cover...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}