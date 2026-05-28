import { useEffect, useState } from 'react';

export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof document === 'undefined') return true;
    return document.visibilityState !== 'hidden';
  });

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(document.visibilityState !== 'hidden');
    };

    document.addEventListener('visibilitychange', updateVisibility);
    window.addEventListener('pageshow', updateVisibility);
    window.addEventListener('pagehide', updateVisibility);

    return () => {
      document.removeEventListener('visibilitychange', updateVisibility);
      window.removeEventListener('pageshow', updateVisibility);
      window.removeEventListener('pagehide', updateVisibility);
    };
  }, []);

  return isVisible;
};
