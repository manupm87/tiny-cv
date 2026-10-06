import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { detectLanguage, saveLanguage } from './detectLanguage';

const setNavigator = (languages, language = languages[0]) => {
  vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(languages);
  vi.spyOn(window.navigator, 'language', 'get').mockReturnValue(language);
};

describe('detectLanguage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    setNavigator(['en-US']);
  });
  afterEach(() => vi.restoreAllMocks());

  it('uses a saved es choice over the browser', () => {
    window.localStorage.setItem('app-language', 'es');
    expect(detectLanguage()).toBe('es');
  });

  it('ignores an invalid saved value', () => {
    window.localStorage.setItem('app-language', 'fr');
    expect(detectLanguage()).toBe('en');
  });

  it('detects es-ES', () => {
    setNavigator(['es-ES']);
    expect(detectLanguage()).toBe('es');
  });

  it('detects en-GB as English', () => {
    setNavigator(['en-GB']);
    expect(detectLanguage()).toBe('en');
  });

  it('finds es anywhere in the languages list', () => {
    setNavigator(['fr', 'es']);
    expect(detectLanguage()).toBe('es');
  });

  it('survives localStorage throwing', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });
    expect(detectLanguage()).toBe('en');
  });

  it('saveLanguage does not throw when storage fails', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('denied');
    });
    expect(() => saveLanguage('es')).not.toThrow();
  });
});
