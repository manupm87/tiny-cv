import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileSection from './MobileSection';
import { getNextIndices, getPrevIndices } from '../utils/timelineHelpers';
import styles from '../styles/components/MobileTimelineContainer.module.css';

const SWIPE_THRESHOLD = 50;

// Vertical transition variants for Sections
const verticalVariants = {
    enter: (direction) => ({
        y: direction > 0 ? '100%' : '-100%',
        opacity: 0,
        zIndex: 1
    }),
    center: {
        y: 0,
        opacity: 1,
        zIndex: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction) => ({
        y: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        zIndex: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    })
};

const MobileTimelineContainer = ({ timelineData }) => {
    // State: { sectionIndex, locationIndex, cardIndex }
    const [indices, setIndices] = useState({ sectionIndex: 0, locationIndex: 0, cardIndex: 0 });
    const [direction, setDirection] = useState(0);
    const containerRef = useRef(null);

    // Current Section Data
    if (!timelineData) return null;
    const currentSection = timelineData[indices.sectionIndex];

    const handleDragEnd = (e, { offset, velocity }) => {
        const swipe = offset.y;
        if (swipe < -SWIPE_THRESHOLD) {
            handleNavigation(1); // Swipe UP (Navigate NEXT)
        } else if (swipe > SWIPE_THRESHOLD) {
            handleNavigation(-1); // Swipe DOWN (Navigate PREV)
        }
    };

    const handleNavigation = (dir) => {
        let newIndices = null;
        if (dir === 1) {
            newIndices = getNextIndices(indices, timelineData);
        } else {
            newIndices = getPrevIndices(indices, timelineData);
        }

        if (newIndices) {
            setDirection(dir);
            setIndices(newIndices);
        }
    };

    if (!currentSection) return null;

    return (
        <div className={styles.container} ref={containerRef}>
            <motion.div
                className={styles.dragArea}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
            >
                {/* Vertical Section Transition */}
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={indices.sectionIndex}
                        custom={direction}
                        variants={verticalVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className={styles.sectionContainer}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                    >
                        <MobileSection
                            sectionData={currentSection}
                            locationIndex={indices.locationIndex}
                            cardIndex={indices.cardIndex}
                            direction={direction}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Hints */}
                <div className={styles.navHints}>
                    {(indices.sectionIndex < timelineData.length - 1 ||
                        (currentSection.locations && indices.locationIndex < currentSection.locations.length - 1) ||
                        (currentSection.locations && currentSection.locations[indices.locationIndex].cards && indices.cardIndex < currentSection.locations[indices.locationIndex].cards.length - 1)
                    ) && (
                            <div className={styles.scrollHint}>Swipe Up</div>
                        )}
                </div>
            </motion.div>
        </div>
    );
};

export default MobileTimelineContainer;
