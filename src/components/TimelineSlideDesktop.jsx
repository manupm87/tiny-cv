import React from 'react';
import { motion } from 'framer-motion';
import InfoCard from './InfoCard';
import styles from '../styles/components/TimelineSlide.module.css';

const TimelineSlideDesktop = ({ data, index }) => {
    const isMultiLocation = data.locations && data.locations.length > 1;

    return (
        <section className={styles.section} id={data.id}>
            <motion.div
                className={styles.contentWrapper}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ amount: 0.3 }}
            >
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
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
                                    <div className={styles.cardsList}>
                                        {location.cards.map((card, cardIndex) => (
                                            <InfoCard key={cardIndex} {...card} isExpanded={true} />
                                        ))}
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

export default TimelineSlideDesktop;
