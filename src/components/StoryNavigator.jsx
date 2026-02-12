import React from 'react';
import { motion } from 'framer-motion';
import '../styles/StoryNavigator.css';

/**
 * Fixed navigation component showing timeline sections as dots
 * @param {Object} props
 * @param {Array} props.sections - Timeline sections data
 * @param {string} props.activeId - Currently active section ID
 */
const StoryNavigator = ({ sections, activeId }) => {
  return (
    <div className="navigator">
      {/* Connecting Line */}
      <div className="connectingLine" />

      {sections.map((section) => {
        const isActive = activeId === section.id;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="navLink"
            aria-label={`Go to ${section.title}`}
          >
            {/* Tooltip on hover */}
            <div className={`tooltip ${isActive ? 'active' : ''}`}>
              {section.period}
            </div>

            {/* Dot */}
            <motion.div
              animate={{
                scale: isActive ? 1.5 : 1,
                backgroundColor: isActive ? 'var(--primary-blue)' : 'var(--glass-border)',
                border: isActive ? '2px solid var(--primary-glow)' : '2px solid transparent'
              }}
              className="dot"
              whileHover={{ scale: 1.8 }}
            />
          </a>
        );
      })}
    </div>
  );
};

export default StoryNavigator;
