import React from 'react';
import { motion as Motion, useScroll, useTransform, useSpring } from 'framer-motion';

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

    const containerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
    };

    const orb1Style = {
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '60vw',
        height: '60vw',
        maxWidth: '800px',
        maxHeight: '800px',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: -1,
        y: y1,
        x: x1,
        rotate: rotate,
        background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.8) 0%, rgba(56, 189, 248, 0) 70%)",
    };

    const orb2Style = {
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '70vw',
        height: '70vw',
        maxWidth: '900px',
        maxHeight: '900px',
        borderRadius: '50%',
        filter: 'blur(100px)',
        zIndex: -1,
        y: y2,
        x: x2,
        rotate: rotate,
        background: "radial-gradient(circle at center, rgba(192, 132, 252, 0.8) 0%, rgba(192, 132, 252, 0) 70%)",
    };

    const orb3Style = {
        position: 'absolute',
        top: '40%',
        left: '20%',
        width: '40vw',
        height: '40vw',
        maxWidth: '600px',
        maxHeight: '600px',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: -1,
        y: y3,
        x: x3,
        rotate: rotate,
        background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.6) 0%, rgba(192, 132, 252, 0.2) 100%)",
    };


    return (
        <div style={containerStyle}>
            {/* Orb 1: Primary Blue - Top Left */}
            <Motion.div
                style={orb1Style}
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
            <Motion.div
                style={orb2Style}
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
            <Motion.div
                style={orb3Style}
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
