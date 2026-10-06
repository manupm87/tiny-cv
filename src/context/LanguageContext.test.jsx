import React, { act, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LanguageProvider, useLanguage } from './LanguageContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const seen = { current: null };
const Probe = () => {
  const value = useLanguage();
  useEffect(() => {
    seen.current = value;
  });
  return null;
};
vi.mock('../data/timeline', () => ({ timelineDataEn: [], timelineDataEs: [] }));

const mount = () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => root.render(<LanguageProvider><Probe /></LanguageProvider>));
  return root;
};

describe('LanguageProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['es-ES']);
    globalThis.fetch = vi.fn();
  });
  afterEach(() => vi.restoreAllMocks());

  it('detects from the browser without network or persisting', () => {
    const root = mount();
    expect(seen.current.language).toBe('es');
    expect(document.documentElement.lang).toBe('es');
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(window.localStorage.getItem('app-language')).toBeNull();
    expect(Object.keys(seen.current).sort()).toEqual(['content', 'language', 'setLanguage']);
    act(() => root.unmount());
  });

  it('persists an explicit choice and syncs html lang', () => {
    const root = mount();
    act(() => seen.current.setLanguage('en'));
    expect(seen.current.language).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(window.localStorage.getItem('app-language')).toBe('en');
    act(() => root.unmount());
  });
});
