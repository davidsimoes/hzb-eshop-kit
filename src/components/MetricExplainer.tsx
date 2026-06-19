import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, TrendingUp, ShoppingCart, Target, Percent } from 'lucide-react';

interface MetricExplainerProps {
  aov: number;
  cogs: number;
  margin: number;
  conversionRate: number;
}

export const MetricExplainer = ({ aov, cogs, margin, conversionRate }: MetricExplainerProps) => {
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const getCzechBenchmark = (metric: string, value: number) => {
    switch (metric) {
      case 'aov':
        if (value < 800) return 'Pod českým průměrem (800-1200 Kč)';
        if (value > 1200) return 'Nad českým průměrem (800-1200 Kč)';
        return 'V českém průměru (800-1200 Kč)';
      
      case 'margin':
        if (value < 40) return 'Pod českým průměrem (40-60%)';
        if (value > 60) return 'Nad českým průměrem (40-60%)';
        return 'V českém průměru (40-60%)';
      
      case 'conversion':
        if (value < 1) return 'Pod českým průměrem (1-2%)';
        if (value > 3) return 'Nad českým průměrem (1-2%)';
        return 'V českém průměru (1-2%)';
      
      default:
        return '';
    }
  };

  const getInteractionExample = () => {
    const increasedAOV = aov * 1.125; // 12.5% increase
    const newOrders = Math.ceil(100 / ((increasedAOV - cogs) / increasedAOV * 100));
    const currentOrders = Math.ceil(100 / (margin / 100));
    const reduction = Math.round(((currentOrders - newOrders) / currentOrders) * 100);
    
    return {
      increasedAOV,
      reduction
    };
  };

  const example = getInteractionExample();

  return (
    <Card className="shadow-soft">
      <CardHeader className="bg-brand-orange text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Jak metriky ovlivňují zisk
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        
        {/* Current Metrics Analysis */}
        <div className="space-y-4">
          <h4 className="font-semibold text-brand-wine">Tvoje aktuální metriky:</h4>
          
          <div className="grid gap-3">
            <div className="flex items-center justify-between p-3 bg-brand-light-pink rounded-lg">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-brand-wine" />
                <span className="text-brand-wine">AOV: {formatCurrency(aov)}</span>
              </div>
              <span className="text-sm text-brand-wine/70">
                {getCzechBenchmark('aov', aov)}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-brand-light-pink rounded-lg">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-brand-wine" />
                <span className="text-brand-wine">Marže: {margin.toFixed(1)}%</span>
              </div>
              <span className="text-sm text-brand-wine/70">
                {getCzechBenchmark('margin', margin)}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-brand-light-pink rounded-lg">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-brand-wine" />
                <span className="text-brand-wine">Konverze: {conversionRate}%</span>
              </div>
              <span className="text-sm text-brand-wine/70">
                {getCzechBenchmark('conversion', conversionRate)}
              </span>
            </div>
          </div>
        </div>

        {/* Interaction Example */}
        {aov > 0 && margin > 0 && (
          <div className="bg-gradient-brand text-white p-4 rounded-lg">
            <h4 className="font-semibold mb-3">💡 Příklad optimalizace:</h4>
            <p className="text-sm opacity-90 mb-2">
              Kdybys zvýšila AOV z {formatCurrency(aov)} na {formatCurrency(example.increasedAOV)}:
            </p>
            <ul className="text-sm opacity-90 space-y-1">
              <li>• Snížíš potřebné objednávky o {example.reduction}%</li>
              <li>• Nebo dosáhneš stejného zisku s méně prací</li>
              <li>• Možnosti: balíčky, cross-selling, prémiové produkty</li>
            </ul>
          </div>
        )}

        {/* Czech Market Tips */}
        <div className="space-y-3">
          <h4 className="font-semibold text-brand-wine">Tipy pro český trh:</h4>
          
          <div className="grid gap-3 text-sm">
            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <TrendingUp className="w-4 h-4 text-brand-orange mt-0.5" />
              <div>
                <div className="font-medium">Zvýšení AOV:</div>
                <div className="text-muted-foreground">Doprava zdarma od určité částky, doporučené produkty, množstevní slevy</div>
              </div>
            </div>
            
            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <Percent className="w-4 h-4 text-brand-orange mt-0.5" />
              <div>
                <div className="font-medium">Optimalizace marže:</div>
                <div className="text-muted-foreground">Vyjednávání s dodavateli, efektivnější balení, vlastní značka</div>
              </div>
            </div>
            
            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <Target className="w-4 h-4 text-brand-orange mt-0.5" />
              <div>
                <div className="font-medium">Vyšší konverze:</div>
                <div className="text-muted-foreground">Recenze zákazníků, lepší fotky produktů, zjednodušený nákupní proces</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};