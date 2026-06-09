import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import cs from './locales/cs.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'cs',
    fallbackLng: 'cs',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    resources: {
      cs: { translation: cs }
    },
    
    react: {
      useSuspense: false,
    }
  });

// Set document language to Czech
document.documentElement.lang = 'cs';

// Update skip link text
const skipLink = document.getElementById('skip-link');
if (skipLink) {
  skipLink.textContent = 'Přeskočit na hlavní obsah';
}

export default i18n;