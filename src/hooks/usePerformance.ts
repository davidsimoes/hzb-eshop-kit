import { useEffect } from 'react';

export const usePerformance = () => {
  useEffect(() => {
    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
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