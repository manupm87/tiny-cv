import React, { useState, useEffect } from 'react';
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

    // Reset expansion when data changes (though key-based remounting handled by container does this too)
    useEffect(() => {
        setIsExpanded(false);
    }, [data?.id]);

    if (!data) {
        console.error('TimelineSlideMobile: Missing data prop');
        return <div style={{ color: 'red' }}>Error: Missing Data</div>;
    }

    if (!data.header) {
        console.error('TimelineSlideMobile: Missing data.header', data);
        // Fallback if we accidentally passed a raw section object without the 'header' shape
        if (data.title) {
            data.header = { title: data.title, subtitle: data.description };
        } else {
            return <div style={{ color: 'red' }}>Error: Check Console</div>;
        }
    }

    return (
        <section className={`${styles.section} ${styles.mobileSlide}`} id={data.id}>
            <div className={`${styles.contentWrapper} ${styles.mobileWrapper}`}>
                <div className={styles.mobileHeader}>
                    <h2 className={`${styles.title} ${styles.mobileTitle}`}>{data.header?.title}</h2>
                    <h3 className={`${styles.subtitle} ${styles.mobileSubtitle}`}>{data.header?.subtitle}</h3>
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
            </div>
        </section>
    );
};

export default TimelineSlideMobile;
