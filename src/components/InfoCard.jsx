import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './../styles/GlassCard.css';
import { FADE_UP, EXPAND_HEIGHT } from '../utils/animations';

const InfoCard = ({ title, organization, period, details, tags, type, isExpanded, onClick, location }) => {
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
              {location && (
                <div className="card-location" style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>📍 {location}</span>
                </div>
              )}
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

      {/* Expand indicator - shows clickability */}
      {onClick && (
        <motion.div
          className="expand-indicator"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </motion.div>
      )}
    </motion.div>
  );
};

export default InfoCard;
