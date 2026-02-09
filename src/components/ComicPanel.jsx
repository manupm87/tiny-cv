import React from 'react';
import { motion } from 'framer-motion';

const ComicPanel = ({ children, title, className = "" }) => {
  return (
    <section className={`comic-section ${className}`}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, rotate: -1 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        viewport={{ once: false, amount: 0.3 }}
        className="comic-panel"
      >
        {title && (
          <div className="comic-badge">
            <h2>{title}</h2>
          </div>
        )}
        <div className="comic-content">
          {children}
        </div>
      </motion.div>
    </section>
  );
};

export default ComicPanel;
