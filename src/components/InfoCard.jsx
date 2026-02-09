import React from 'react';
import { motion } from 'framer-motion';

const InfoCard = ({ title, organization, period, details, tags }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, margin: "-50px" }}
      className="glass-card flex flex-col justify-between h-full hover:bg-white/5 transition-colors"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        borderLeft: '4px solid var(--primary-blue)'
      }}
    >
      <div>
        <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>{title}</h3>
        <h4 style={{ margin: '0.25rem 0', color: 'var(--accent)', fontWeight: 500 }}>{organization}</h4>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '1rem' }}>
          {period}
        </span>

        {details && details.length > 0 && (
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', margin: '0.5rem 0' }}>
            {details.map((detail, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{detail}</li>
            ))}
          </ul>
        )}
      </div>

      {tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              style={{
                background: 'rgba(56, 189, 248, 0.2)',
                color: 'var(--primary-blue)',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default InfoCard;
