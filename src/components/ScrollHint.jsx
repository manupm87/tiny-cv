import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import '../styles/ScrollHint.css';

/**
 * Scroll hint indicator that appears ONLY on intro section
 * Uses IntersectionObserver to detect when intro is visible  
 * Hides after first scroll interaction
 */
const ScrollHint = () => {
    const [visible, setVisible] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        // Hide after first scroll
        const handleScroll = () => {
            setHasScrolled(true);
            setVisible(false);
        };

        // Watch if intro section is visible
        // Use more specific selector to ensure we find it
        const introSection = document.querySelector('section[id="intro"]') ||
            document.getElementById('intro') ||
            document.querySelector('[id="intro"]');

        if (!introSection) {
            console.warn('ScrollHint: intro section not found');
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Only show if intro is visible AND user hasn't scrolled yet
                if (entry.isIntersecting && !hasScrolled) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            },
            {
                threshold: 0.3, // Lower threshold for better mobile detection
                rootMargin: '0px'
            }
        );

        observer.observe(introSection);
        window.addEventListener('scroll', handleScroll, { once: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasScrolled]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="scroll-hint"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 1 }}
                >
                    <motion.div
                        className="scroll-hint-icon"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                        <ChevronDown size={32} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollHint;
