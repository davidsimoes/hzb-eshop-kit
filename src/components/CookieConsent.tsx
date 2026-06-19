import { useState, useEffect } from 'react';
import * as safeStorage from '@/lib/safeStorage';

const STORAGE_KEY = 'hzb_consent';

type Consent = 'granted' | 'denied';

const getGtag = () =>
  (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = safeStorage.getItem(STORAGE_KEY) as Consent | null;

    if (stored === 'granted') {
      // Returning visitor who already opted in: re-grant so analytics keeps working.
      const gtag = getGtag();
      if (typeof gtag === 'function') {
        gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'granted',
        });
      }
      return;
    }

    if (stored === 'denied') {
      // Choice already made, consent stays denied (the Consent Mode v2 default).
      return;
    }

    // No stored choice yet: show the banner.
    setVisible(true);
  }, []);

  const accept = () => {
    safeStorage.setItem(STORAGE_KEY, 'granted');
    const gtag = getGtag();
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }
    setVisible(false);
  };

  const reject = () => {
    safeStorage.setItem(STORAGE_KEY, 'denied');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-brand-light-pink text-brand-wine shadow-lg">
      <div className="container mx-auto flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          Používáme cookies k měření návštěvnosti (Google Analytics), abychom web vylepšovali. Souhlasíš?
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={accept}
            className="rounded-md bg-brand-orange px-4 py-2 text-sm font-semibold text-white"
          >
            Souhlasím
          </button>
          <button
            type="button"
            onClick={reject}
            className="rounded-md border border-brand-light-pink px-4 py-2 text-sm font-semibold text-brand-wine"
          >
            Jen nutné
          </button>
        </div>
      </div>
    </div>
  );
};
