import React from 'react';
import { motion as Motion } from 'framer-motion';
import InfoCard from './InfoCard';
import styles from '../styles/components/TimelineSlide.module.css';

const TimelineSlideMobile = ({ data }) => {
    return (
        <section className={`${styles.section} ${styles.mobileSlide}`} id={data.id}>
            <Motion.div
                className={`${styles.contentWrapper} ${styles.mobileWrapper}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ amount: 0.2 }}
            >
                <div className={styles.mobileHeader}>
                    <h2 className={`${styles.title} ${styles.mobileTitle}`}>{data.title}</h2>
                    <h3 className={`${styles.subtitle} ${styles.mobileSubtitle}`}>{data.description}</h3>
                </div>

                {data.mobileCard && data.mobileCard.image && (
                    <div className={styles.mobileImageContainer}>
                        <img
                            src={data.mobileCard.image}
                            alt={data.title}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '220px',
                                width: 'auto',
                                borderRadius: '16px',
                                objectFit: 'contain',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                            }}
                        />
                    </div>
                )}

                <div className={styles.mobileCardContainer}>
                    {data.mobileCard && (
                        <InfoCard {...data.mobileCard} isMobile={true} />
                    )}
                </div>
            </Motion.div>
        </section>
    );
};

export default TimelineSlideMobile;
