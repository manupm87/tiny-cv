import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import InfoCard from './InfoCard';
import styles from '../styles/components/MobileTimelineContainer.module.css';
import { HORIZONTAL_SLIDE } from '../utils/animations';

const MobileLocation = ({ locationData, currentCardIndex, direction = 1 }) => {
    const currentCard = locationData.cards ? locationData.cards[currentCardIndex] : null;

    // Remember WHICH card is expanded, so swapping card/location collapses without an effect.
    const [expandedCard, setExpandedCard] = useState(null);
    const isCardExpanded = currentCard !== null && expandedCard === currentCard;

    const toggleExpand = () => setExpandedCard(isCardExpanded ? null : currentCard);

    return (
        <div className={styles.locationContainer}>
            {/* City Image - Flex item between title and card */}
            {locationData.image && (
                <div className={styles.imageContainer}>
                    <img
                        src={locationData.image}
                        srcSet={locationData.imageSmall ? `${locationData.imageSmall} 550w, ${locationData.image} 1100w` : undefined}
                        sizes="100vw"
                        width={1100}
                        height={913}
                        decoding="async"
                        loading="lazy"
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

MobileLocation.propTypes = {
    locationData: PropTypes.shape({
        city: PropTypes.string,
        image: PropTypes.string,
        imageSmall: PropTypes.string,
        cards: PropTypes.array.isRequired,
    }).isRequired,
    currentCardIndex: PropTypes.number.isRequired,
    direction: PropTypes.number,
};

export default MobileLocation;
