import React from 'react';
import { motion } from 'framer-motion';

const StoryNavigator = ({ sections, activeId }) => {
  return (
    <div style={{
      position: 'fixed',
      right: '2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem'
    }}>
      {/* Connecting Line */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '2px',
        background: 'rgba(255, 255, 255, 0.1)',
        zIndex: -1
      }} />

      {sections.map((section) => {
        const isActive = activeId === section.id;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none'
            }}
            aria-label={`Go to ${section.title}`}
          >
            {/* Tooltip on hover */}
            <div
               className="nav-tooltip"
               style={{
                 position: 'absolute',
                 right: '100%',
                 marginRight: '1rem',
                 background: 'rgba(15, 23, 42, 0.8)',
                 padding: '0.5rem 1rem',
                 borderRadius: '4px',
                 color: 'white',
                 fontSize: '0.875rem',
                 whiteSpace: 'nowrap',
                 opacity: isActive ? 1 : 0,
                 pointerEvents: 'none',
                 transition: 'opacity 0.2s',
                 backdropFilter: 'blur(4px)',
                 border: '1px solid rgba(255,255,255,0.1)'
               }}
            >
              {section.period}
            </div>

            {/* Dot */}
            <motion.div
              animate={{
                scale: isActive ? 1.5 : 1,
                backgroundColor: isActive ? 'var(--primary-blue)' : 'rgba(255, 255, 255, 0.2)',
                border: isActive ? '2px solid rgba(56, 189, 248, 0.5)' : '2px solid transparent'
              }}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              whileHover={{ scale: 1.8 }}
            />
          </a>
        );
      })}
    </div>
  );
};

export default StoryNavigator;
