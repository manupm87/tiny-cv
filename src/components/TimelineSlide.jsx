import React from 'react';
import { motion } from 'framer-motion';
import InfoCard from './InfoCard';

const TimelineSlide = ({ data, index, isMobile }) => {
  // If we are on mobile and have the special mobileCard prop
  if (isMobile && data.mobileCard) {
    return (
      <section className="timeline-section mobile-slide" id={data.id}>
        <motion.div
          className="content-wrapper mobile-wrapper"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ amount: 0.2 }}
        >
          <div className="mobile-header">
            <h2 className="section-title mobile-title">{data.title}</h2>
            <h3 className="section-subtitle mobile-subtitle">{data.location}</h3>
            {data.mobileCard.image && (
              <div className="mobile-image-container" style={{ margin: '1rem 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <img
                  src={data.mobileCard.image}
                  alt={data.location}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '150px',
                    borderRadius: '16px',
                    objectFit: 'cover',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                />
              </div>
            )}
          </div>

          <div className="mobile-card-container">
            <InfoCard {...data.mobileCard} isMobile={true} />
          </div>
        </motion.div>
      </section>
    );
  }

  // Desktop / Original Logic
  const isMultiLocation = data.locations && data.locations.length > 1;

  return (
    <section className="timeline-section" id={data.id}>
      <motion.div
        className="content-wrapper"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ amount: 0.3 }}
      >
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h2 className="section-title">{data.title}</h2>
          <h3 className="section-subtitle">{data.location}</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.6, margin: '1rem auto' }}>
            {data.description}
          </p>
        </div>

        <div className={isMultiLocation ? "multi-location-row" : "locations-wrapper"}>
          {data.locations && data.locations.map((location, locIndex) => {
            let layoutClass;
            if (isMultiLocation) {
              layoutClass = 'location-col';
            } else {
              const isReverse = index % 2 !== 0;
              layoutClass = `location-row ${isReverse ? 'reverse' : ''}`;
            }

            return (
              <div
                key={locIndex}
                className={layoutClass}
              >
                {/* Image Section */}
                <div className="location-image">
                  {location.image && (
                    <img
                      src={location.image}
                      alt={location.city}
                      className="location-img"
                    />
                  )}
                </div>

                {/* Cards Section */}
                <div className="location-cards">
                  <div className="cards-list">
                    {location.cards.map((card, cardIndex) => (
                      <InfoCard key={cardIndex} {...card} />
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

export default TimelineSlide;
