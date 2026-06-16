import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  // Track SPA route changes in Google Analytics (gtag loaded in index.html).
  useEffect(() => {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_path: pathname + search,
        page_location: window.location.href,
      });
    }
  }, [pathname, search]);

  return null;
};