// lib/InteractiveBook.tsx
"use client";

import React, { useState, useRef } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import Link from "next/link";
import { type PostSummary } from "lib/posts";
import SearchIcon from "@mui/icons-material/Search";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// The styles object for the component.
// We no longer need CSS keyframe animations.
const styles = {
  // Styles for the sticky book container
  mainContainer: {
    position: "sticky",
    top: "15vh",
    width: "40vh",
    height: "70vh",
    maxWidth: "400px",
    maxHeight: "600px",
    perspective: "1500px",
  },
  // Styles for the cover container (will be animated)
  coverContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 3,
    transformStyle: "preserve-3d",
    transformOrigin: "top center",
  },
  // Styles for the content page inside the book
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
  // Styles for the search input field
  searchInput: {
    mb: 2,
    flexShrink: 0,
    "& .MuiOutlinedInput-root": {
      fontFamily: '"Yuji Syuku", serif',
      backgroundColor: "rgba(211, 195, 167, 0.1)",
      "& fieldset": {
        borderColor: "rgba(62, 39, 35, 0.3)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(62, 39, 35, 0.6)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3e2723",
      },
      "& .MuiInputBase-input::placeholder": {
        color: "#3e2723",
        opacity: 0.6,
      },
    },
  },
  // Styles for the list of posts
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
  // Styles for the front and back faces of the cover
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
  // Styles for decorative elements on the cover
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
} as const;

// Unchanged CoverTitle component
const CoverTitle = () => (
  <Box sx={styles.coverTitleBox}>
    <Typography sx={styles.coverTitleText}>友人帳</Typography>
  </Box>
);

// The complete and corrected InteractiveBook component
export default function InteractiveBook({ posts }: { posts: PostSummary[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const scrollTriggerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollTriggerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to animation values
  const coverRotateX = useTransform(scrollYProgress, [0, 0.5], [0, 180]);
  const coverOpacity = useTransform(scrollYProgress, [0.4, 0.5], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const contentPointerEvents = useTransform(scrollYProgress, (v) =>
    v > 0.6 ? "auto" : "none"
  );

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // This is the invisible scrollable area that drives the animation
    <Box ref={scrollTriggerRef} sx={{ height: "200vh", position: "relative" }}>

      {/* This is the book itself, which sticks to the viewport while scrolling */}
      <Box sx={styles.mainContainer}>

        {/* The book's content page, animated with Framer Motion */}
        <motion.div
          style={{
            opacity: contentOpacity,
            pointerEvents: contentPointerEvents as MotionValue<"auto" | "none">,
          }}
        >
          <Box sx={styles.contentPage}>
            <Typography variant="h5" component="h2" sx={styles.contentPageTitle}>
              目次
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="記事名を呼ぶ..."
              sx={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#3e2723" }} />
                  </InputAdornment>
                ),
              }}
            />
            <List sx={styles.postList}>
              {filteredPosts.map((post) => (
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
        </motion.div>

        {/* The book's cover, animated with Framer Motion */}
        <motion.div
          style={{
            ...styles.coverContainer,
            rotateX: coverRotateX,
            opacity: coverOpacity,
          }}
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
        </motion.div>
      </Box>
    </Box>
  );
}