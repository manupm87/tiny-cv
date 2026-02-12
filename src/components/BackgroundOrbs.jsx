import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import '../styles/BackgroundOrbs.css';

/**
 * Animated background gradient orbs that move based on scroll position
 * @param {Object} props
 * @param {Object} props.scrollContainer - Ref to the scroll container for tracking scroll position
 */
const BackgroundOrbs = ({ scrollContainer }) => {
    const { scrollYProgress } = useScroll({
        container: scrollContainer
    });

    // Smooth out the scroll progress
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // We map scroll (0 to 1) to a series of random positions
    const scrollPoints = [0, 0.2, 0.4, 0.6, 0.8, 1];

    // Orb 1: Starts Top-Left, wanders to Right-Bottom then back Top-Right
    const y1 = useTransform(smoothScroll, scrollPoints, ['0vh', '80vh', '20vh', '90vh', '10vh', '50vh']);
    const x1 = useTransform(smoothScroll, scrollPoints, ['0vw', '60vw', '-20vw', '50vw', '-40vw', '20vw']);

    // Orb 2: Starts Bottom-Right, wanders to Top-Left then Bottom-Center
    const y2 = useTransform(smoothScroll, scrollPoints, ['0vh', '-90vh', '-30vh', '-80vh', '-10vh', '-60vh']);
    const x2 = useTransform(smoothScroll, scrollPoints, ['0vw', '-70vw', '30vw', '-60vw', '40vw', '-20vw']);

    // Orb 3: Starts Middle/Left, wanders across the screen horizontally and vertically
    const y3 = useTransform(smoothScroll, scrollPoints, ['0vh', '40vh', '-40vh', '60vh', '-60vh', '20vh']);
    const x3 = useTransform(smoothScroll, scrollPoints, ['0vw', '80vw', '10vw', '70vw', '-10vw', '50vw']);
    const rotate = useTransform(smoothScroll, [0, 1], [0, 360]);

    return (
        <div className="orbContainer">
            {/* Orb 1: Primary Blue - Top Left */}
            <motion.div
                className="orb orb1"
                style={{
                    y: y1,
                    x: x1,
                    rotate: rotate,
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Orb 2: Secondary Purple - Bottom Right */}
            <motion.div
                className="orb orb2"
                style={{
                    y: y2,
                    x: x2,
                    rotate: rotate,
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            {/* Orb 3: Accent/Highlight - Middle Left-ish */}
            <motion.div
                className="orb orb3"
                style={{
                    y: y3,
                    x: x3,
                    rotate: rotate,
                }}
                animate={{
                    scale: [1, 1.15, 0.9, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />
        </div>
    );
};

export default BackgroundOrbs;
