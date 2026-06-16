import { useEffect } from 'react';

export const usePerformance = () => {
  useEffect(() => {
    // Service worker disabled: it cached stale assets and broke pages for returning
    // visitors. Actively unregister any previously-installed SW and purge its caches
    // so existing clients recover on next load.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations()
        .then((registrations) => registrations.forEach((r) => r.unregister()))
        .catch(() => {});
      if ('caches' in window) {
        caches.keys().then((keys) => keys.forEach((k) => caches.delete(k))).catch(() => {});
      }
    }

    // Basic performance monitoring
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
          
          // Log performance metrics (could be sent to analytics)
          console.log('Page Load Time:', loadTime + 'ms');
          
          // Mark as ready for analytics
          document.dispatchEvent(new CustomEvent('app-performance-ready', {
            detail: { loadTime }
          }));
        }, 0);
      });
    }
  }, []);
};

export default usePerformance;