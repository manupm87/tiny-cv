import React from 'react';
import { motion as Motion } from 'framer-motion';
import InfoCard from './InfoCard';
import styles from '../styles/components/TimelineSlide.module.css';

const TimelineSlideMobile = ({ data }) => {
    return (
        <section className={`${styles.section} ${styles.mobileSlide}`} id={data.id}>
            <Motion.div
                className={`${styles.contentWrapper} ${styles.mobileWrapper}`}
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.mobileHeader}>
                    <h2 className={`${styles.title} ${styles.mobileTitle}`}>{data.header.title}</h2>
                    <h3 className={`${styles.subtitle} ${styles.mobileSubtitle}`}>{data.header.subtitle}</h3>
                </div>

                {data.image && (
                    <div className={styles.mobileImageContainer}>
                        <img
                            src={data.image}
                            alt={data.header.title}
                            className={styles.mobileLocationImage}
                        />
                    </div>
                )}

                <div className={styles.mobileCardContainer}>
                    {data.card && (
                        <InfoCard {...data.card} isMobile={true} isExpanded={true} />
                    )}
                </div>
            </Motion.div>
        </section>
    );
};

export default TimelineSlideMobile;
