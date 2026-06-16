
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tooltip } from './Tooltip';
import { Target, TrendingUp, ArrowRight, CheckCircle, Zap } from 'lucide-react';

interface ScenarioPlannerProps {
  requiredRevenue: number;
  desiredProfit: number;
  fixedCosts: number;
  aov: number;
  isYearly: boolean;
}

export const ScenarioPlanner = ({ 
  requiredRevenue, 
  desiredProfit, 
  fixedCosts, 
  aov, 
  isYearly 
}: ScenarioPlannerProps) => {
  const [marketingBudget, setMarketingBudget] = useState<number>(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    // Set smart default to 15% of revenue
    const recommendedBudget = requiredRevenue * 0.15;
    setMarketingBudget(recommendedBudget);
  }, [requiredRevenue]);

  const formatCurrency = (num: number) => {
    if (!isFinite(num) || isNaN(num)) return "0 Kč";
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const getBudgetStrategy = (budget: number) => {
    const percentage = (budget / requiredRevenue) * 100;
    
    if (percentage < 10) {
      return {
        name: 'Konzervativní start',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        description: 'Testuj opatrně, učí se',
        icon: '🐌',
        channels: ['Google Ads (60%)', 'Facebook (30%)', 'Email (10%)'],
        timeframe: '3-6 měsíců na testování'
      };
    } else if (percentage > 20) {
      return {
        name: 'Agresivní růst',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        description: 'Rychle škáluj, ale riskuj',
        icon: '🚀',
        channels: ['Google Ads (50%)', 'Facebook (30%)', 'TikTok (20%)'],
        timeframe: '1-2 měsíce na škálování'
      };
    } else {
      return {
        name: 'Vyvážený přístup',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        description: 'Stabilní růst s kontrolou',
        icon: '⚖️',
        channels: ['Google Ads (50%)', 'Facebook (30%)', 'Email (20%)'],
        timeframe: '2-3 měsíce na optimalizaci'
      };
    }
  };

  const strategy = getBudgetStrategy(marketingBudget);
  const rawPercentage = (marketingBudget / requiredRevenue) * 100;
  const currentPercentage = isFinite(rawPercentage) ? rawPercentage : 0;
  const maxBudget = requiredRevenue * 0.3;

  const getNextSteps = () => {
    const baseSteps = [
      'Nastav konverze v Google Analytics',
      'Vytvoř základní kampaně podle rozpočtu',
      'Sleduj CAC první 2 týdny'
    ];

    if (currentPercentage < 10) {
      return [
        'Začni s Google Ads (60% rozpočtu)',
        'Testuj 3-5 klíčových slov',
        'Sleduj ROAS každý den',
        'Po 2 týdnech zvyš úspěšné kampaně'
      ];
    } else if (currentPercentage > 20) {
      return [
        'Rozděl rozpočet na víc kanálů',
        'Testuj nové cílové skupiny',
        'Sleduj CAC velmi pečlivě',
        'Měj připravený plán na snížení'
      ];
    } else {
      return [
        'Začni s Google a Facebook 50:50',
        'Testuj různé kreativy',
        'Optimalizuj týdně',
        'Postupně navyšuj úspěšné kampaně'
      ];
    }
  };

  if (!isFinite(requiredRevenue) || requiredRevenue <= 0) {
    return (
      <Card className="shadow-soft">
        <CardHeader className="bg-brand-pink text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Tvůj marketingový plán
            <Tooltip content="Doporučený rozpočet a strategie na základě tvých cílů" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center p-6 bg-brand-light-pink rounded-lg text-brand-wine">
            Doplň cílový zisk a marži, ať je z čeho počítat.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-soft">
      <CardHeader className="bg-brand-pink text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Tvůj marketingový plán
          <Tooltip content="Doporučený rozpočet a strategie na základě tvých cílů" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        
        {/* Main Recommendation */}
        <div className="text-center space-y-3">
          <div className="text-sm text-muted-foreground">
            Doporučujeme začít s rozpočtem:
          </div>
          <div className="text-3xl font-bold text-brand-wine">
            {formatCurrency(marketingBudget)}
          </div>
          <div className="text-sm text-muted-foreground">
            měsíčně ({currentPercentage.toFixed(1)}% z potřebného obratu)
          </div>
        </div>

        {/* Strategy Card */}
        <div className={`p-4 rounded-lg border ${strategy.bgColor} ${strategy.borderColor}`}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{strategy.icon}</span>
            <div>
              <h3 className={`font-bold ${strategy.color}`}>
                {strategy.name}
              </h3>
              <p className={`text-sm ${strategy.color}`}>
                {strategy.description}
              </p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {strategy.timeframe}
          </div>
        </div>

        {/* Budget Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Upravit rozpočet:</label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setMarketingBudget(requiredRevenue * 0.15)}
              className="text-xs"
            >
              Resetovat
            </Button>
          </div>
          
          <div className="px-2">
            <Slider
              value={[marketingBudget]}
              onValueChange={(value) => setMarketingBudget(value[0])}
              max={maxBudget}
              min={requiredRevenue * 0.05}
              step={1000}
              className="w-full"
            />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5%</span>
            <span>15% (doporučeno)</span>
            <span>30%</span>
          </div>
        </div>

        {/* Channel Distribution */}
        <div className="space-y-3">
          <h4 className="font-semibold text-brand-wine flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Rozděl rozpočet takto:
          </h4>
          
          <div className="grid grid-cols-1 gap-2">
            {strategy.channels.map((channel, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-brand-light-pink rounded">
                <span className="text-sm text-brand-wine">{channel}</span>
                <span className="text-sm font-medium text-brand-wine">
                  {formatCurrency(marketingBudget * (parseInt(channel.match(/\d+/)?.[0] || '0') / 100))}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-4">
          <h4 className="font-semibold text-brand-wine flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            Tvoje první kroky:
          </h4>
          
          <div className="space-y-2">
            {getNextSteps().map((step, index) => (
              <div key={index} className="flex items-start gap-3 text-sm">
                <div className="w-5 h-5 bg-brand-orange text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span className="text-brand-wine">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <div className="border-t pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-center gap-2 text-brand-wine"
          >
            <Zap className="w-4 h-4" />
            {showAdvanced ? 'Skrýt' : 'Zobrazit'} pokročilé tipy
          </Button>
          
          {showAdvanced && (
            <div className="mt-4 p-4 bg-brand-light-pink rounded-lg space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-brand-wine mt-0.5 flex-shrink-0" />
                <div className="text-sm text-brand-wine">
                  <strong>Měř CAC týdně:</strong> Náklady na zákazníka by neměly přesáhnout 30% z AOV
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-brand-wine mt-0.5 flex-shrink-0" />
                <div className="text-sm text-brand-wine">
                  <strong>ROAS cíl:</strong> Minimálně 3:1 (3 Kč obratu za 1 Kč reklamy)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-brand-wine mt-0.5 flex-shrink-0" />
                <div className="text-sm text-brand-wine">
                  <strong>Testuj postupně:</strong> Nespouštěj všechny kanály najednou
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground text-center border-t pt-4">
          💡 Tento plán je výchozí bod. Upravuj podle skutečných výsledků každý měsíc.
        </div>
      </CardContent>
    </Card>
  );
};
