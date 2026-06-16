import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, Users, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface CACCalculatorProps {
  marketingBudget: number;
  requiredOrders: number;
  aov: number;
  customLTVMultiplier?: number;
  onLTVMultiplierChange?: (multiplier: number) => void;
}

export const CACCalculator = ({ 
  marketingBudget, 
  requiredOrders, 
  aov,
  customLTVMultiplier = 2.5,
  onLTVMultiplierChange
}: CACCalculatorProps) => {
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const cac = requiredOrders > 0 && marketingBudget > 0 ? marketingBudget / requiredOrders : 0;
  const ltv = aov * customLTVMultiplier;
  const isHealthy = cac > 0 && cac < ltv * 0.33;
  const defaultCACRange = "200-600 Kč";

  const getCACStatus = () => {
    if (cac === 0) return { color: 'text-muted-foreground', message: 'Zadej marketingový rozpočet' };
    if (cac < 100) return { color: 'text-yellow-600', message: 'CAC pod 100 Kč je v ČR nepravděpodobné' };
    if (cac > 600) return { color: 'text-red-600', message: 'CAC nad 600 Kč je v ČR nadprůměrné' };
    if (isHealthy) return { color: 'text-green-600', message: 'CAC je v pořádku pro český trh' };
    if (cac >= ltv) return { color: 'text-red-600', message: 'CAC převyšuje LTV, zvaž optimalizaci' };
    return { color: 'text-yellow-600', message: 'CAC je vysoký, ideál je pod 30 % LTV' };
  };

  const status = getCACStatus();

  if (marketingBudget === 0) {
    return null;
  }

  return (
    <Card className="shadow-soft">
      <CardHeader className="bg-brand-wine text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Náklady na získání zákazníka (CAC)
          <Tooltip content="CAC ukazuje, kolik tě stojí získat jednoho zákazníka. V ČR je běžné 200-600 Kč podle Acomware.cz" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-brand-light-pink rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-brand-wine" />
              <span className="font-semibold text-brand-wine">CAC</span>
            </div>
            <div className="text-2xl font-bold text-brand-wine">
              {cac > 0 ? formatCurrency(cac) : '-'}
            </div>
            <div className="text-sm text-brand-wine/70">na zákazníka</div>
          </div>
          
          <div className="text-center p-4 bg-brand-light-pink rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-brand-wine" />
              <span className="font-semibold text-brand-wine">LTV</span>
            </div>
            <div className="text-2xl font-bold text-brand-wine">
              {formatCurrency(ltv)}
            </div>
            <div className="text-sm text-brand-wine/70">životní hodnota</div>
          </div>
        </div>

        {/* LTV Multiplier Customization */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label className="text-brand-wine font-semibold">LTV násobitel</Label>
            <Tooltip content="Kolikrát zákazník nakoupí průměrně. V ČR je běžné 2-3x podle Shoptet.cz" />
          </div>
          <Input
            type="number"
            step="0.1"
            min="1"
            max="10"
            value={customLTVMultiplier}
            onChange={(e) => onLTVMultiplierChange?.(Number(e.target.value) || 2.5)}
            className="text-lg"
            placeholder="2.5"
          />
          <p className="text-sm text-muted-foreground">
            💡 Výchozí 2.5x je průměr pro české e-shopy
          </p>
        </div>

        {/* Status */}
        <div className={`flex items-center gap-3 p-4 rounded-lg ${isHealthy ? 'bg-green-50' : 'bg-yellow-50'}`}>
          {isHealthy ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          )}
          <div>
            <div className={`font-semibold ${status.color}`}>
              {isHealthy ? 'Tvůj plán je ziskový!' : 'Pozor na rentabilitu'}
            </div>
            <div className="text-sm text-muted-foreground">
              {status.message}
            </div>
            {isHealthy && (
              <p className="text-sm text-muted-foreground">
                Hlavní pravidlo: zisk z jedné objednávky musí být vyšší než CAC.
              </p>
            )}
          </div>
        </div>

        {/* Czech Market Context */}
        <div className="bg-gradient-brand text-white p-4 rounded-lg">
          <h4 className="font-semibold mb-2">České standardy:</h4>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• CAC: {defaultCACRange} (průměr 400 Kč)</li>
            <li>• LTV: 2-3x AOV (průměr 2.5x)</li>
            <li>• Cíl 3× LTV:CAC je aspirace pro e-shopy s ověřenými opakovanými nákupy, ne pravidlo pro start.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};