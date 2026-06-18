import { AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '@/contexts/CurrencyContext';

interface ValidationAlertsProps {
  aov: number;
  cogs: number;
  margin: number;
  conversionRate: number;
  cac: number;
  marketingCosts: number;
}

export const ValidationAlerts = ({ 
  aov, 
  cogs, 
  margin, 
  conversionRate, 
  cac,
  marketingCosts 
}: ValidationAlertsProps) => {
  const { t } = useTranslation();
  const { formatCurrency } = useCurrency();
  
  const alerts = [];

  // Margin checks
  if (aov > 0 && cogs >= aov) {
    alerts.push({
      type: 'error' as const,
      title: 'Záporná marže',
      message: 'Marže je 0% nebo záporná, zkus zvýšit cenu nebo snížit náklady',
      suggestion: 'Zvýš prodejní cenu nebo vyjednávej lepší nákupní ceny.'
    });
  } else if (margin > 80) {
    alerts.push({
      type: 'warning' as const,
      title: 'Velmi vysoká marže',
      message: 'Hrubá marže nad 80 % je výjimečná, zkontroluj AOV nebo COGS',
      suggestion: 'Ověř, že do nákladů na zboží počítáš úplně všechno (výroba, doprava, poplatky).'
    });
  }

  // Conversion rate checks
  if (conversionRate > 3) {
    alerts.push({
      type: 'info' as const,
      title: 'Vysoká konverze',
      message: 'Konverze nad 3% přesahuje český průměr ~2 %',
      suggestion: 'Skvělá práce! Tvůj e-shop konvertuje nadprůměrně.'
    });
  }

  // CAC checks
  if (marketingCosts > 0 && cac > 0) {
    if (cac < 100) {
      alerts.push({
        type: 'warning' as const,
        title: 'Nízký CAC',
        message: `CAC ${formatCurrency(cac)} je podezřele nízký pro český trh`,
        suggestion: 'V ČR bývá CAC 200-600 Kč kvůli nákladům na PPC reklamy.'
      });
    } else if (cac > 600) {
      alerts.push({
        type: 'info' as const,
        title: 'Vysoký CAC',
        message: `CAC ${formatCurrency(cac)} je nad českým průměrem`,
        suggestion: 'Zvaž optimalizaci kampaní nebo cílení.'
      });
    }
  }

  // AOV checks
  if (aov > 0) {
    if (aov < 500) {
      alerts.push({
        type: 'info' as const,
        title: 'Nízké AOV',
        message: `AOV ${formatCurrency(aov)} je pod českým průměrem`,
        suggestion: 'Zvaž cross-sell, up-sell nebo balíčkové nabídky.'
      });
    } else if (aov > 2000) {
      alerts.push({
        type: 'success' as const,
        title: 'Vysoké AOV',
        message: `AOV ${formatCurrency(aov)} je nadprůměrné`,
        suggestion: 'Skvělá práce! Zákazníci u tebe utrácejí hodně.'
      });
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getVariant = (type: string) => {
    switch (type) {
      case 'error': return 'destructive' as const;
      default: return 'default' as const;
    }
  };

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3" role="region" aria-label="Upozornění a doporučení">
      <h3 className="font-semibold text-brand-wine">
        Doporučení pro zlepšení
      </h3>
      {alerts.map((alert, index) => (
        <Alert 
          key={index} 
          variant={getVariant(alert.type)}
          className={`border-l-4 ${
            alert.type === 'error' ? 'border-l-destructive' : 
            alert.type === 'success' ? 'border-l-green-500' : 
            alert.type === 'warning' ? 'border-l-yellow-500' :
            'border-l-brand-orange'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={
              alert.type === 'error' ? 'text-destructive' :
              alert.type === 'success' ? 'text-green-600' :
              alert.type === 'warning' ? 'text-yellow-600' :
              'text-brand-orange'
            }>
              {getIcon(alert.type)}
            </div>
            <div className="space-y-1">
              <h4 className="font-medium">{alert.title}</h4>
              <AlertDescription className="text-sm">
                {alert.message}
              </AlertDescription>
              <p className="text-xs font-medium text-brand-orange">
                💡 {alert.suggestion}
              </p>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
};