import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import InfoCard from './InfoCard';
import styles from '../styles/components/TimelineSlide.module.css';

const TimelineSlideDesktop = ({ data, index }) => {
    const isMultiLocation = data.locations && data.locations.length > 1;
    // Cards start collapsed so every slide fits the viewport; one card per slide can be open.
    const [expandedKey, setExpandedKey] = useState(null);

    return (
        <section className={styles.section} id={data.id}>
            <motion.div
                className={styles.contentWrapper}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ amount: 0.3 }}
            >
                <div className={styles.header}>
                    <h2 className={styles.title}>{data.title}</h2>
                    <h3 className={styles.subtitle}>{data.location}</h3>
                    <p className={styles.description}>
                        {data.description}
                    </p>
                </div>

                <div className={isMultiLocation ? styles.multiLocationRow : styles.locationsWrapper}>
                    {data.locations && data.locations.map((location, locIndex) => {
                        let layoutClass;
                        if (isMultiLocation) {
                            layoutClass = styles.locationCol;
                        } else {
                            const isReverse = index % 2 !== 0;
                            layoutClass = `${styles.locationRow} ${isReverse ? styles.locationRowReverse : ''}`;
                        }

                        return (
                            <div
                                key={locIndex}
                                className={layoutClass}
                            >
                                {/* Image Section */}
                                <div className={styles.locationImage}>
                                    {location.image && (
                                        <img
                                            src={location.image}
                                            alt={location.city}
                                            className={styles.locationImg}
                                        />
                                    )}
                                </div>

                                {/* Cards Section */}
                                <div className={styles.locationCards}>
                                    <div className={`${styles.cardsList} ${expandedKey && expandedKey.startsWith(`${locIndex}-`) ? styles.hasExpanded : ''}`}>
                                        {location.cards.map((card, cardIndex) => {
                                            const cardKey = `${locIndex}-${cardIndex}`;
                                            return (
                                                <InfoCard
                                                    key={cardKey}
                                                    {...card}
                                                    isExpanded={expandedKey === cardKey}
                                                    onClick={() => setExpandedKey(expandedKey === cardKey ? null : cardKey)}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
};

TimelineSlideDesktop.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        location: PropTypes.string,
        description: PropTypes.string,
        locations: PropTypes.arrayOf(
            PropTypes.shape({
                city: PropTypes.string,
                image: PropTypes.string,
                cards: PropTypes.arrayOf(PropTypes.object).isRequired,
            })
        ),
    }).isRequired,
    index: PropTypes.number.isRequired,
};

export default TimelineSlideDesktop;
