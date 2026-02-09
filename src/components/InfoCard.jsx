import React from 'react';
import { motion } from 'framer-motion';

const InfoCard = ({ title, organization, period, details, tags, type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, margin: "-50px" }}
      className={`info-card glass-card ${type || 'job'}`}
    >
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <h4 className="card-org">{organization}</h4>
        <span className="card-period">{period}</span>

        {details && details.length > 0 && (
          <ul className="card-details">
            {details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        )}
      </div>

      {tags && (
        <div className="card-tags">
          {tags.map((tag, idx) => (
            <span key={idx} className="card-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default InfoCard;
