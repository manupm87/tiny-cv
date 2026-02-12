import React from 'react';
import { motion as Motion } from 'framer-motion';

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
        background: 'var(--glass-border)',
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
                background: 'var(--glass-bg)',
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                opacity: isActive ? 1 : 0,
                pointerEvents: 'none',
                transition: 'opacity 0.2s',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                border: '1px solid var(--glass-border)',
                boxShadow: 'var(--glass-shadow)'
              }}
            >
              {section.period}
            </div>

            {/* Dot */}
            <Motion.div
              animate={{
                scale: isActive ? 1.5 : 1,
                backgroundColor: isActive ? 'var(--primary-blue)' : 'var(--glass-border)',
                border: isActive ? '2px solid var(--primary-glow)' : '2px solid transparent'
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
