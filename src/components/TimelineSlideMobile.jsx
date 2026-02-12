import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import InfoCard from './InfoCard';
import styles from '../styles/components/TimelineSlide.module.css';

const TimelineSlideMobile = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <section className={`${styles.section} ${styles.mobileSlide}`} id={data.id}>
            <Motion.div
                className={`${styles.contentWrapper} ${styles.mobileWrapper}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
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
            </Motion.div>
        </section>
    );
};

export default TimelineSlideMobile;
