import { useCallback, useSyncExternalStore } from 'react';
import { BREAKPOINTS } from '../utils/constants';

/**
 * Tracks whether the viewport is below the mobile breakpoint.
 * matchMedia is the external store; React re-renders only when the query flips.
 */
const useIsMobile = (breakpoint = BREAKPOINTS.mobile) => {
    const query = `(max-width: ${breakpoint - 1}px)`;

    const subscribe = useCallback((onChange) => {
        const mediaQuery = window.matchMedia(query);
        mediaQuery.addEventListener('change', onChange);
        return () => mediaQuery.removeEventListener('change', onChange);
    }, [query]);

    const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

    return useSyncExternalStore(subscribe, getSnapshot, () => false);
};

export default useIsMobile;
