import { DollarSign, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { useCurrency, Currency } from '@/contexts/CurrencyContext';

export const CurrencySelector = () => {
  const { t, ready } = useTranslation();
  const { currency, setCurrency } = useCurrency();

  // Don't render if i18n is not ready - maintain layout space
  if (!ready) {
    return (
      <div 
        className="w-8 h-8 lg:w-auto lg:h-9 lg:px-3 bg-muted/30 rounded animate-pulse" 
        aria-hidden="true"
      />
    );
  }

  const currencies = [
    { 
      code: 'CZK' as Currency, 
      name: t('currency.names.czk', 'Česká koruna'), 
      symbol: 'Kč',
      region: t('currency.regions.czech', 'Česká republika')
    },
    { 
      code: 'EUR' as Currency, 
      name: t('currency.names.eur', 'Euro'), 
      symbol: '€',
      region: t('currency.regions.europe', 'Evropa')
    }
  ];
  
  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    // Announce change to screen readers
    const selectedCurr = currencies.find(c => c.code === newCurrency);
    if (selectedCurr) {
      const announcement = t('currency.changed', `Currency changed to ${selectedCurr.name}`, {
        currency: selectedCurr.name
      });
      // Create a live region announcement
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.textContent = announcement;
      document.body.appendChild(announcer);
      setTimeout(() => document.body.removeChild(announcer), 1000);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 lg:h-9 lg:w-auto lg:px-3 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={t('currency.selector.label', `Select currency. Current: ${currentCurrency.name}`, {
            current: currentCurrency.name
          })}
          aria-haspopup="menu"
          aria-expanded="false"
        >
          <DollarSign 
            className="h-3 w-3 lg:h-4 lg:w-4 lg:mr-1" 
            aria-hidden="true"
          />
          <span className="font-medium hidden lg:inline">
            {currentCurrency.symbol}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="z-50 bg-popover border shadow-lg min-w-[180px] p-1"
        role="menu"
        aria-label={t('currency.menu.label', 'Currency selection menu')}
      >
        <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
          {t('currency.menu.title', 'Select Currency')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {currencies.map((curr) => {
          const isSelected = currentCurrency.code === curr.code;
          return (
            <DropdownMenuItem
              key={curr.code}
              onClick={() => handleCurrencyChange(curr.code)}
              className={`cursor-pointer transition-colors p-2 rounded-sm focus:bg-accent focus:text-accent-foreground ${
                isSelected ? 'bg-accent/50 text-accent-foreground' : 'hover:bg-accent/30'
              }`}
              role="menuitem"
              aria-current={isSelected ? 'true' : 'false'}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <span 
                    className="font-mono text-sm font-medium min-w-[1.5rem]"
                    aria-hidden="true"
                  >
                    {curr.symbol}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {curr.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {curr.code}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <Check 
                    className="h-4 w-4 text-primary" 
                    aria-label={t('currency.selected', 'Selected')}
                  />
                )}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};