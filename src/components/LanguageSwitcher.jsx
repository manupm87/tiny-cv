import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import '../styles/LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="language-switcher-container" ref={containerRef}>
      <Motion.button
        className="language-toggle-btn"
        onClick={toggleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={language === 'es' ? 'Cambiar idioma' : 'Change language'}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={24} />
      </Motion.button>

      <AnimatePresence>
        {isOpen && (
          <Motion.div
            className="language-dropdown"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className={`language-option ${language === 'en' ? 'active' : ''}`}
              onClick={() => { setLanguage('en'); setIsOpen(false); }}
            >
              <span aria-hidden="true">🇬🇧</span> English
            </button>
            <button
              className={`language-option ${language === 'es' ? 'active' : ''}`}
              onClick={() => { setLanguage('es'); setIsOpen(false); }}
            >
              <span aria-hidden="true">🇪🇸</span> Español
            </button>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
