import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import './../styles/GlassCard.css';

const InfoCard = ({ title, organization, period, details, tags, type, isExpanded, onClick }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.3 }
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={`info-card glass-card ${type || 'job'} ${isExpanded ? 'expanded' : 'collapsed'}`}
      onClick={onClick}
    >
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <h4 className="card-org">{organization}</h4>
        <span className="card-period">{period}</span>
        <AnimatePresence>
          {isExpanded && (
            <Motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <ul className="card-details">
                {details && details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </Motion.div>
          )}
        </AnimatePresence>
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
    </Motion.div>
  );
};

export default InfoCard;
