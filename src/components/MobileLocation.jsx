import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InfoCard from './InfoCard';
import styles from '../styles/components/MobileTimelineContainer.module.css';
import { HORIZONTAL_SLIDE } from '../utils/animations';

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
                            variants={HORIZONTAL_SLIDE}
                            initial="enter"
                            animate={isCardExpanded ? { ...HORIZONTAL_SLIDE.center, zIndex: 30 } : { ...HORIZONTAL_SLIDE.center, zIndex: 10 }}
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
