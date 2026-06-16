import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { TrendingUp } from 'lucide-react';
import { Tooltip } from './Tooltip';
interface MarketingBudgetSliderProps {
  targetProfit: number;
  aov: number;
  margin: number;
  onBudgetChange: (budget: number) => void;
}
export const MarketingBudgetSlider = ({
  targetProfit,
  aov,
  margin,
  onBudgetChange
}: MarketingBudgetSliderProps) => {
  const [budgetPercentage, setBudgetPercentage] = useState([15]);
  const [budgetAmount, setBudgetAmount] = useState(0);
  useEffect(() => {
    if (targetProfit > 0 && margin > 0) {
      const revenue = targetProfit / (margin / 100);
      const budget = revenue * (budgetPercentage[0] / 100);
      setBudgetAmount(budget);
      onBudgetChange(budget);
    } else {
      setBudgetAmount(0);
      onBudgetChange(0);
    }
  }, [targetProfit, margin, budgetPercentage, onBudgetChange]);
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };
  const getBudgetDescription = (percentage: number) => {
    if (percentage <= 10) return 'Konzervativní růst';
    if (percentage <= 15) return 'Vyvážený přístup';
    return 'Agresivní škálování';
  };
  const getBudgetAdvice = (percentage: number) => {
    if (percentage <= 10) return 'Vhodné pro pomalý, ale stabilní růst';
    if (percentage <= 15) return 'Doporučeno pro většinu e-shopů v ČR';
    return 'Pro rychlé škálování s vyšším rizikem';
  };
  const channels = [
    {
      name: 'Srovnávače zboží',
      detail: 'Heureka + Zboží.cz',
      share: 0.3,
      note: 'V ČR často nejlepší ROI, lidé jsou připravení koupit.'
    },
    {
      name: 'Vyhledávání',
      detail: 'Google Ads + Sklik (Seznam)',
      share: 0.35,
      note: 'Rozděl zhruba 70 / 30 Google a Sklik. Sklik bývá levnější za proklik.',
      subChannels: [
        { name: 'Google Ads', share: 0.35 * 0.7 },
        { name: 'Sklik (Seznam)', share: 0.35 * 0.3 }
      ]
    },
    {
      name: 'Sociální sítě',
      detail: 'Facebook + Instagram',
      share: 0.25,
      note: 'Budování povědomí a remarketing.'
    },
    {
      name: 'E-mail / remarketing',
      detail: '',
      share: 0.1,
      note: 'Nejlevnější kanál, drží ti zákazníky.'
    }
  ];
  if (targetProfit === 0 || margin === 0) {
    return null;
  }
  return (
    <Card className="shadow-soft">
      <CardHeader className="bg-brand-wine text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Doporučený marketingový rozpočet
          <Tooltip content="Kolik měsíčně investovat do marketingu podle tvého cíle zisku a marže" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">

        <div className="text-center p-6 bg-brand-light-pink rounded-lg">
          <div className="text-sm text-brand-wine/70 mb-2">
            {budgetPercentage[0]} % z potřebného obratu
          </div>
          <div className="text-3xl font-bold text-brand-wine">
            {formatCurrency(budgetAmount)}
          </div>
          <div className="text-sm text-brand-wine/70 mt-1">měsíčně</div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-brand-wine">
              Podíl marketingu na obratu
            </span>
            <span className="text-sm font-bold text-brand-wine">
              {budgetPercentage[0]} %
            </span>
          </div>
          <div className="px-2">
            <Slider
              value={budgetPercentage}
              onValueChange={setBudgetPercentage}
              max={30}
              min={5}
              step={1}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-xs text-brand-wine/60">
            <span>5 %</span>
            <span>15 % (doporučeno)</span>
            <span>30 %</span>
          </div>
        </div>

        <div className="p-4 bg-brand-light-pink rounded-lg space-y-1">
          <div className="font-semibold text-brand-wine">
            {getBudgetDescription(budgetPercentage[0])}
          </div>
          <div className="text-sm text-brand-wine/70">
            {getBudgetAdvice(budgetPercentage[0])}
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-semibold text-brand-wine">
            Rozděl rozpočet takto
          </div>
          {channels.map((channel) => (
            <div
              key={channel.name}
              className="p-3 bg-brand-light-pink/60 rounded-lg space-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-brand-wine">
                    {channel.name}
                  </span>
                  {channel.detail && (
                    <span className="text-sm text-brand-wine/60">
                      {' '}({channel.detail})
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-bold text-brand-wine">
                    {formatCurrency(budgetAmount * channel.share)}
                  </span>
                  <span className="text-sm text-brand-wine/60">
                    {' '}({Math.round(channel.share * 100)} %)
                  </span>
                </div>
              </div>
              <div className="text-sm text-brand-wine/70">{channel.note}</div>
              {channel.subChannels && (
                <div className="pl-3 pt-1 space-y-0.5 border-l-2 border-brand-wine/15">
                  {channel.subChannels.map((sub) => (
                    <div
                      key={sub.name}
                      className="flex items-center justify-between text-sm text-brand-wine/70"
                    >
                      <span>{sub.name}</span>
                      <span>
                        {formatCurrency(budgetAmount * sub.share)}
                        {' '}({Math.round(sub.share * 100)} %)
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 bg-brand-light-pink rounded-lg space-y-1">
          <div className="font-semibold text-brand-wine">
            Jak rozdělit rozpočet?
          </div>
          <div className="text-sm text-brand-wine/70">
            Tohle je výchozí rozdělení, ne dogma. Začni u srovnávačů a vyhledávání,
            tam jsou lidé připravení koupit. Testuj v malém a postupně přesouvej peníze
            tam, kde ti vychází nejlevnější objednávka. Sleduj cenu za objednávku
            (ne za proklik) v každém kanálu, to je tvoje hlavní čísla.
          </div>
        </div>

        <div className="p-4 bg-brand-light-pink/50 rounded-lg space-y-1">
          <div className="font-semibold text-brand-wine">
            A co marketplaces?
          </div>
          <div className="text-sm text-brand-wine/70">
            Marketplaces jako Aukro nebo Allegro jsou volitelný kanál navíc. Hodí se
            na rozjezd, ověření poptávky a rychlý dosah. Počítej ale s tím, že platíš
            provizi a nevlastníš zákaznická data, takže to neber jako součást základního
            rozpočtu na reklamu, spíš jako doplněk.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};