import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import InfoCard from './InfoCard';
import styles from '../styles/components/TimelineSlide.module.css';

/**
 * Mobile version of timeline slide with accordion-style card expansion
 * @param {Object} props
 * @param {Object} props.data - Slide data including header, image, and card content
 */
const TimelineSlideMobile = ({ data }) => {
    // Expansion is keyed on the slide id, so a different slide always starts collapsed.
    const [expandedId, setExpandedId] = useState(null);
    const isExpanded = Boolean(data) && expandedId === data.id;

    if (!data) {
        console.error('TimelineSlideMobile: Missing data prop');
        return <div style={{ color: 'red' }}>Error: Missing Data</div>;
    }

    // Fall back to the raw section shape (title/description) when no 'header' was provided
    const header = data.header || (data.title ? { title: data.title, subtitle: data.description } : null);
    if (!header) {
        console.error('TimelineSlideMobile: Missing data.header', data);
        return <div style={{ color: 'red' }}>Error: Check Console</div>;
    }

    return (
        <section className={`${styles.section} ${styles.mobileSlide}`} id={data.id}>
            <div className={`${styles.contentWrapper} ${styles.mobileWrapper}`}>
                <div className={styles.mobileHeader}>
                    <h2 className={`${styles.title} ${styles.mobileTitle}`}>{header.title}</h2>
                    <h3 className={`${styles.subtitle} ${styles.mobileSubtitle}`}>{header.subtitle}</h3>
                </div>

                <div className={`${styles.mobileCardContainer} ${isExpanded ? styles.expanded : ''}`}>
                    {data.card && (
                        <InfoCard
                            {...data.card}
                            isMobile={true}
                            isExpanded={isExpanded}
                            onClick={() => setExpandedId(isExpanded ? null : data.id)}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

TimelineSlideMobile.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        header: PropTypes.shape({
            title: PropTypes.string,
            subtitle: PropTypes.string,
        }),
        card: PropTypes.object,
    }),
};

export default TimelineSlideMobile;
