import React from 'react';
import { motion } from 'framer-motion';
import InfoCard from './InfoCard';

const TimelineSlide = ({ data, index }) => {
  const isFoundations = data.id === 'education';

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

        <div className="locations-wrapper">
          {data.locations && data.locations.map((location, locIndex) => {
            let layoutClass;
            if (isFoundations) {
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
