import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export type Currency = 'CZK' | 'EUR' | 'USD' | 'PLN';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatCurrency: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const currencyFormats: Record<Currency, { symbol: string; locale: string }> = {
  CZK: { symbol: 'Kč', locale: 'cs-CZ' },
  EUR: { symbol: '€', locale: 'de-DE' },
  USD: { symbol: '$', locale: 'en-US' },
  PLN: { symbol: 'zł', locale: 'pl-PL' }
};

const getDefaultCurrencyForLanguage = (language: string): Currency => {
  switch (language) {
    case 'cs': return 'CZK';
    case 'sk': return 'EUR';
    case 'pl': return 'PLN';
    case 'en': return 'USD';
    default: return 'CZK';
  }
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [currency, setCurrency] = useState<Currency>(() => 
    getDefaultCurrencyForLanguage(i18n.language)
  );

  // Update currency when language changes (if not manually overridden)
  useEffect(() => {
    if (i18n.isInitialized) {
      const storedCurrency = localStorage.getItem('selectedCurrency');
      if (!storedCurrency) {
        const defaultCurrency = getDefaultCurrencyForLanguage(i18n.language);
        setCurrency(defaultCurrency);
      }
    }
  }, [i18n.language, i18n.isInitialized]);

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem('selectedCurrency', newCurrency);
  };

  const formatCurrency = (amount: number): string => {
    const format = currencyFormats[currency];
    
    try {
      return new Intl.NumberFormat(format.locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      // Fallback formatting
      return `${amount.toLocaleString()} ${format.symbol}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};