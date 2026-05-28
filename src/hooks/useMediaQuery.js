import { useEffect, useState } from 'react';

export const useMediaQuery = (query, defaultValue = false) => {
  const [matches, setMatches] = useState(() => {
    if (!query || typeof window === 'undefined' || !window.matchMedia) return defaultValue;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (!query || typeof window === 'undefined' || !window.matchMedia) return undefined;

    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMatches);
    } else {
      mediaQuery.addListener?.(updateMatches);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateMatches);
      } else {
        mediaQuery.removeListener?.(updateMatches);
      }
    };
  }, [query]);

  return matches;
};
