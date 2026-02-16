import React, { createContext, useState, useEffect, useContext } from 'react';
import { timelineDataEn, timelineDataEs } from '../data/timeline';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  // Initialize with local storage if available, otherwise default to 'en' temporarily
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('app-language');
      return saved || 'en';
    }
    return 'en';
  });

  const [hasCheckedLocation, setHasCheckedLocation] = useState(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
          return !!localStorage.getItem('app-language');
      }
      return false;
  });

  useEffect(() => {
    if (hasCheckedLocation) return;

    const checkLocation = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

        const response = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data.country_code === 'ES') {
            setLanguage('es');
            localStorage.setItem('app-language', 'es');
          }
        }
      } catch (error) {
        console.warn('Location detection failed, keeping default language:', error);
      } finally {
        setHasCheckedLocation(true);
      }
    };

    checkLocation();
  }, [hasCheckedLocation]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('app-language', lang);
    setHasCheckedLocation(true); // Ensure we don't overwrite user choice with auto-detection
  };

  const content = language === 'es' ? timelineDataEs : timelineDataEn;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, content }}>
      {children}
    </LanguageContext.Provider>
  );
};
