import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileLocation from './MobileLocation';
import IntroSlide from './IntroSlide';
import styles from '../styles/components/MobileTimelineContainer.module.css';

const horizontalVariants = {
    enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    })
};

const MobileSection = ({ sectionData, locationIndex, cardIndex, direction }) => {
    // If it's the Intro section
    if (sectionData.type === 'intro') {
        return (
            <div className={styles.sectionContainer}>
                <IntroSlide data={sectionData} isMobile={true} isActive={true} />
            </div>
        );
    }

    const locations = sectionData.locations || [];
    const currentLocation = locations[locationIndex];

    return (
        <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{sectionData.title}</h2>
                <h3 className={styles.sectionSubtitle}>{sectionData.description}</h3>
            </div>

            <div className={styles.locationsWrapper}>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={locationIndex}
                        custom={direction}
                        variants={horizontalVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className={styles.horizontalSlide}
                    >
                        {currentLocation && (
                            <MobileLocation
                                locationData={currentLocation}
                                currentCardIndex={cardIndex}
                                direction={direction}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MobileSection;
