import React from 'react';
import { motion } from 'framer-motion';
import InfoCard from './InfoCard';

const TimelineSlide = ({ data, isActive }) => {
  return (
    <section className="timeline-section" id={data.id}>
      <motion.div
        className="content-wrapper"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ amount: 0.3 }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="section-title">{data.title}</h2>
          <h3 className="section-subtitle">{data.location}</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.6 }}>
            {data.description}
          </p>
        </div>

        <div className="cards-grid">
          {data.cards.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TimelineSlide;
