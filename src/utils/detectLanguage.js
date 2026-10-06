export const LANGUAGE_STORAGE_KEY = 'app-language';
const SUPPORTED = ['en', 'es'];

export const readSavedLanguage = () => {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return SUPPORTED.includes(saved) ? saved : null;
  } catch {
    return null;
  }
};

export const saveLanguage = (lang) => {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // storage unavailable (private mode); the choice lasts for this session only
  }
};

export const detectBrowserLanguage = () => {
  if (typeof navigator === 'undefined') return 'en';
  const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
  const hasSpanish = tags.some((tag) => typeof tag === 'string' && /^es(-|_|$)/i.test(tag));
  return hasSpanish ? 'es' : 'en';
};

export const detectLanguage = () => readSavedLanguage() ?? detectBrowserLanguage();
