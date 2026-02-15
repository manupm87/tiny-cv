import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import MobileLocation from './MobileLocation';
import IntroSlide from './IntroSlide';
import styles from '../styles/components/MobileTimelineContainer.module.css';
import { HORIZONTAL_SLIDE } from '../utils/animations';

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
                        variants={HORIZONTAL_SLIDE}
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

MobileSection.propTypes = {
    sectionData: PropTypes.shape({
        type: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        locations: PropTypes.array,
    }).isRequired,
    locationIndex: PropTypes.number.isRequired,
    cardIndex: PropTypes.number.isRequired,
    direction: PropTypes.number,
};

MobileSection.defaultProps = {
    direction: 1,
};

export default MobileSection;
