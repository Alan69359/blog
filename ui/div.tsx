"use client"; // This component uses client-side features.

import Lottie from "lottie-react";
import animationData from "public/animation/Animation - 1749455805129.json";
import styles from "styles/a.module.css";

export function AnimeLoader () {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.lottieWrapper}>
                <Lottie animationData={animationData} loop={true} />
            </div>
            <p className={styles.loadingText}>Loading...</p>
        </div>
    );
};