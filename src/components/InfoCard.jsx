import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './../styles/GlassCard.css';
import { FADE_UP, EXPAND_HEIGHT } from '../utils/animations';

/**
 * InfoCard component displaying job or education information
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string} props.organization - Organization name
 * @param {string} props.period - Time period
 * @param {string[]} props.details - Detailed description items
 * @param {string[]} props.tags - Technology/skill tags
 * @param {string} props.type - Card type ('job' or 'education')
 * @param {boolean} props.isExpanded - Whether card is expanded
 * @param {Function} props.onClick - Click handler for expansion
 */
const InfoCard = ({ title, organization, period, details, tags, type, isExpanded, onClick }) => {
  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <motion.div
      {...FADE_UP}
      className={`info-card glass-card ${type || 'job'} ${isExpanded ? 'expanded' : 'collapsed'}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      aria-expanded={onClick ? isExpanded : undefined}
      aria-label={`${type || 'job'} card: ${title} at ${organization}`}
    >
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <h4 className="card-org">{organization}</h4>
        <span className="card-period">{period}</span>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              {...EXPAND_HEIGHT}
              style={{ overflow: "hidden" }}
            >
              <ul className="card-details">
                {details && details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </motion.div>
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
    </motion.div>
  );
};

export default InfoCard;
