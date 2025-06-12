// components/OpenBook.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, Typography, IconButton, CardMedia, Box } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from 'styles/a.module.css';

// 1. More sample data for our posts
const posts = [
    { id: 1, title: "Exploring the Alps", content: "A journey through the breathtaking landscapes of the Swiss Alps...", imageUrl: "https://source.unsplash.com/random/400x200?alps" },
    { id: 2, title: "The Art of Japanese Cuisine", content: "From sushi to ramen, a deep dive into the flavors and traditions of Japan.", imageUrl: "https://source.unsplash.com/random/400x200?sushi" },
    { id: 3, title: "Ancient Roman Architecture", content: "The Colosseum, the Pantheon, and the engineering marvels of an empire.", imageUrl: "https://source.unsplash.com/random/400x200?rome" },
    { id: 4, title: "Deep Sea Mysteries", content: "Discovering the strange and wonderful creatures that inhabit the ocean's depths.", imageUrl: "https://source.unsplash.com/random/400x200?ocean" },
    { id: 5, title: "The Life of a Coder", content: "A day in the life, debugging, creating, and drinking lots of coffee.", imageUrl: "https://source.unsplash.com/random/400x200?code" },
    { id: 6, title: "Urban Gardening Guide", content: "How to grow your own food, even with limited space in a bustling city.", imageUrl: "https://source.unsplash.com/random/400x200?garden" },
];

// A helper component for a single post card
const PostCard = ({ post }: { post: typeof posts[0] }) => (
    <Card sx={{ height: '100%' }}>
        <CardMedia
            component="img"
            height="140"
            image={post.imageUrl}
            alt={post.title}
        />
        <CardContent>
            <Typography gutterBottom variant="h6" component="div">
                {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {post.content}
            </Typography>
        </CardContent>
    </Card>
);

export default function OpenBook() {
    // postIndex is the index of the post on the LEFT page
    const [postIndex, setPostIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('');

    const handlePaginate = (direction: number) => {
        if (animationClass) return; // Prevent clicking during animation

        if (direction === 1) { // Turning page forward
            if (postIndex < posts.length - 2) {
                setAnimationClass(styles.flipForward);
            }
        } else { // Turning page backward
            if (postIndex > 0) {
                setAnimationClass(styles.flipBackward);
            }
        }
    };

    const handleAnimationEnd = () => {
        if (animationClass === styles.flipForward) {
            setPostIndex(prev => prev + 2);
        } else if (animationClass === styles.flipBackward) {
            setPostIndex(prev => prev - 2);
        }
        setAnimationClass(''); // Reset animation state
    };

    const leftPost = posts[postIndex];
    const rightPost = posts[postIndex + 1];

    return (
        <div className={styles.bookContainer}>
            <div className={styles.book}>
                {/* Left Page */}
                <div className={styles.page}>
                    {leftPost ? <PostCard post={leftPost} /> : <div />}
                </div>

                {/* Right Page (The one that animates) */}
                <div
                    className={`${styles.page} ${styles.flippingPage} ${animationClass}`}
                    onAnimationEnd={handleAnimationEnd}
                >
                    {/* This page has two faces: a front and a back */}
                    <div className={`${styles.pageFace} ${styles.front}`}>
                        {rightPost ? <PostCard post={rightPost} /> : <div />}
                    </div>
                    <div className={`${styles.pageFace} ${styles.back}`}>
                        {/* The content of the *next* left page is on the back */}
                        {posts[postIndex + 2] ? <PostCard post={posts[postIndex + 2]} /> : <div />}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, width: '100%' }}>
                <IconButton onClick={() => handlePaginate(-1)} disabled={postIndex === 0 || !!animationClass}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Typography sx={{ mx: 4 }}>
                    Showing posts {postIndex + 1}-{postIndex + 2} of {posts.length}
                </Typography>
                <IconButton onClick={() => handlePaginate(1)} disabled={postIndex >= posts.length - 2 || !!animationClass}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </div>
    );
}