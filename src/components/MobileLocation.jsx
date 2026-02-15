import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InfoCard from './InfoCard';
import styles from '../styles/components/MobileTimelineContainer.module.css';

const cardVariants = {
    enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    })
};

const MobileLocation = ({ locationData, currentCardIndex, direction = 1 }) => {
    const currentCard = locationData.cards ? locationData.cards[currentCardIndex] : null;

    // State to track card expansion. Resets when card changes.
    const [isCardExpanded, setIsCardExpanded] = useState(false);

    useEffect(() => {
        setIsCardExpanded(false); // Default to collapsed on swap
    }, [currentCardIndex, locationData]);

    const toggleExpand = () => setIsCardExpanded(!isCardExpanded);

    return (
        <div className={styles.locationContainer}>
            {/* City Image - Flex item between title and card */}
            {locationData.image && (
                <div className={styles.imageContainer}>
                    <img
                        src={locationData.image}
                        alt={locationData.city}
                        className={styles.locationImage}
                    />
                    <div className={styles.gradientOverlay} />
                </div>
            )}

            {/* Card Container - Handles sliding between cards */}
            <div className={styles.cardWrapper} style={{ zIndex: isCardExpanded ? 40 : 10 }}>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    {currentCard && (
                        <motion.div
                            key={currentCardIndex}
                            custom={direction}
                            variants={cardVariants}
                            initial="enter"
                            animate={isCardExpanded ? { ...cardVariants.center, zIndex: 30 } : { ...cardVariants.center, zIndex: 10 }}
                            exit="exit"
                            className={styles.cardInner}
                            style={{ position: 'relative', pointerEvents: 'auto' }}
                        >
                            <InfoCard
                                {...currentCard}
                                location={locationData.city}
                                isExpanded={isCardExpanded}
                                onClick={toggleExpand}
                                isMobile={true}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MobileLocation;
