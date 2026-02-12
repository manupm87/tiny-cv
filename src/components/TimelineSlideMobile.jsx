import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InfoCard from './InfoCard';
import styles from '../styles/components/TimelineSlide.module.css';
import { FADE_IN } from '../utils/animations';

/**
 * Mobile version of timeline slide with accordion-style card expansion
 * @param {Object} props
 * @param {Object} props.data - Slide data including header, image, and card content
 */
const TimelineSlideMobile = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <section className={`${styles.section} ${styles.mobileSlide}`} id={data.id}>
            <motion.div
                className={`${styles.contentWrapper} ${styles.mobileWrapper}`}
                {...FADE_IN}
            >
                <div className={styles.mobileHeader}>
                    <h2 className={`${styles.title} ${styles.mobileTitle}`}>{data.header.title}</h2>
                    <h3 className={`${styles.subtitle} ${styles.mobileSubtitle}`}>{data.header.subtitle}</h3>
                </div>

                <div className={styles.mobileImageContainer}>
                    {data.image && (
                        <img
                            src={data.image}
                            alt={data.header.title}
                            className={styles.mobileLocationImage}
                        />
                    )}
                </div>

                <div className={`${styles.mobileCardContainer} ${isExpanded ? styles.expanded : ''}`}>
                    {data.card && (
                        <InfoCard
                            {...data.card}
                            isMobile={true}
                            isExpanded={isExpanded}
                            onClick={() => setIsExpanded(prev => !prev)}
                        />
                    )}
                </div>

                <div className={styles.mobileFooter}>
                    {/* Footer component - customized later */}
                    <span>↓ Scroll for more</span>
                </div>
            </motion.div>
        </section>
    );
};

export default TimelineSlideMobile;
