import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import '../styles/LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="language-switcher-container">
      <Motion.button
        className="language-toggle-btn"
        onClick={toggleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change Language"
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
              <span role="img" aria-label="UK Flag">🇬🇧</span> English
            </button>
            <button
              className={`language-option ${language === 'es' ? 'active' : ''}`}
              onClick={() => { setLanguage('es'); setIsOpen(false); }}
            >
              <span role="img" aria-label="Spain Flag">🇪🇸</span> Español
            </button>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
