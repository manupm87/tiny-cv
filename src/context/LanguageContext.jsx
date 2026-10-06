import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { timelineDataEn, timelineDataEs } from '../data/timeline';
import { detectLanguage, saveLanguage } from '../utils/detectLanguage';

const LanguageContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(detectLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'es'
      ? 'Manuel Pérez Martínez · Arquitecto de Plataformas Cloud'
      : 'Manuel Pérez Martínez · Cloud Platform Architect';
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    saveLanguage(lang);
  };

  const content = language === 'es' ? timelineDataEs : timelineDataEn;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, content }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node,
};
