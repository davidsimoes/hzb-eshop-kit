
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tooltip } from './Tooltip';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface RequiredRevenueCalculatorProps {
  desiredProfit: number;
  isYearly: boolean;
  onRevenueChange: (revenue: number) => void;
}

export const RequiredRevenueCalculator = ({ 
  desiredProfit, 
  isYearly, 
  onRevenueChange 
}: RequiredRevenueCalculatorProps) => {
  const [fixedCosts, setFixedCosts] = useState<number>(0);
  const [netMargin, setNetMargin] = useState<number>(20);
  const [requiredRevenue, setRequiredRevenue] = useState<number>(0);
  const [showAlert, setShowAlert] = useState<string>('');

  useEffect(() => {
    calculateRequiredRevenue();
  }, [desiredProfit, fixedCosts, netMargin, isYearly]);

  const calculateRequiredRevenue = () => {
    if (!desiredProfit || netMargin <= 0) {
      setRequiredRevenue(0);
      setShowAlert('');
      return;
    }

    if (netMargin > 100) {
      setShowAlert('Zadej realistickou marži (0-100%)');
      setRequiredRevenue(0);
      return;
    }

    try {
      const monthlyProfit = isYearly ? desiredProfit / 12 : desiredProfit;
      const monthlyFixedCosts = fixedCosts;
      const marginDecimal = netMargin / 100;
      
      const monthlyRevenue = (monthlyProfit + monthlyFixedCosts) / marginDecimal;
      
      if (monthlyRevenue < 0) {
        setShowAlert('Nelze dosáhnout zisku s touto kombinací');
        setRequiredRevenue(0);
        return;
      }

      setRequiredRevenue(monthlyRevenue);
      onRevenueChange(monthlyRevenue);
      
      // Market reality check
      const yearlyRevenue = monthlyRevenue * 12;
      const avgBenchmark = 500000; // Average Czech e-shop yearly revenue
      
      if (yearlyRevenue > avgBenchmark * 1.5) {
        setShowAlert('Tvůj cíl je ambiciózní, většina e-shopů dosahuje méně');
      } else if (yearlyRevenue < avgBenchmark * 0.5) {
        setShowAlert('Tvůj cíl je konzervativní, mohl bys zvážit růst');
      } else {
        setShowAlert('');
      }
    } catch (error) {
      console.error('Revenue calculation error:', error);
      setShowAlert('Nelze dosáhnout zisku s touto kombinací');
      setRequiredRevenue(0);
    }
  };

  const formatCurrency = (num: number) => {
    if (!isFinite(num) || isNaN(num)) return "0 Kč";
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="bg-brand-wine text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Potřebný obrat pro tvůj zisk
          <Tooltip content="Celkový obrat, který potřebuješ pro dosažení požadovaného zisku po odečtení všech nákladů" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        
        {/* Calculation Formula Explanation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Jak se počítá potřebný obrat?</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Vzorec:</strong> Obrat = (Požadovaný zisk + Fixní náklady) ÷ Čistá marže</p>
            <p><strong>Příklad:</strong> (50 000 Kč + 15 000 Kč) ÷ 20% = 325 000 Kč měsíčně</p>
          </div>
        </div>

        {/* Fixed Costs Input */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label className="text-brand-wine font-semibold">Fixní náklady měsíčně</Label>
            <Tooltip content="Nájem, mzdy, služby, náklady na zboží (COGS), ale BEZ marketingu. Marketing se počítá z marže." />
          </div>
          <Input
            type="number"
            placeholder="Např. 15000"
            value={fixedCosts || ''}
            onChange={(e) => setFixedCosts(Number(e.target.value))}
            className="text-lg"
          />
          <div className="text-xs text-muted-foreground bg-gray-50 p-2 rounded">
            <strong>Co zahrnout:</strong> nájem (3-8k), mzdy (20-40k), služby (2-5k), COGS (40-60% z prodejní ceny)
          </div>
        </div>

        {/* Net Margin Input */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label className="text-brand-wine font-semibold">Čistá marže (%)</Label>
            <Tooltip content="Kolik % z obratu ti zbude jako zisk po všech nákladech včetně marketingu" />
          </div>
          <Input
            type="number"
            step="0.1"
            placeholder="Např. 20"
            value={netMargin || ''}
            onChange={(e) => setNetMargin(Number(e.target.value))}
            className="text-lg"
          />
          <div className="text-xs text-muted-foreground bg-gray-50 p-2 rounded">
            <strong>Návod:</strong> Pokud z 100 Kč obratu ti zbude 20 Kč zisku (po VŠECH nákladech), máš 20% marži
          </div>
          <p className="text-sm text-muted-foreground">
            💡 Český průměr: 15-25% (podle Heureka.cz)
          </p>
        </div>

        {/* Results */}
        {requiredRevenue > 0 && (
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-brand-light-pink rounded-lg">
              <div className="text-2xl font-bold text-brand-wine">
                {formatCurrency(requiredRevenue)}
              </div>
              <div className="text-sm text-brand-wine/70">Měsíční obrat</div>
            </div>
            <div className="text-center p-4 bg-brand-light-pink rounded-lg">
              <div className="text-2xl font-bold text-brand-wine">
                {formatCurrency(requiredRevenue * 12)}
              </div>
              <div className="text-sm text-brand-wine/70">Roční obrat</div>
            </div>
          </div>
        )}

        {/* Alert Messages */}
        {showAlert && (
          <div className={`flex items-start gap-3 p-4 rounded-lg ${
            showAlert.includes('ambiciózní') || showAlert.includes('konzervativní')
              ? 'bg-blue-50 border border-blue-200'
              : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <AlertTriangle className={`w-5 h-5 mt-0.5 ${
              showAlert.includes('ambiciózní') || showAlert.includes('konzervativní')
                ? 'text-blue-600'
                : 'text-yellow-600'
            }`} />
            <p className={`text-sm font-medium ${
              showAlert.includes('ambiciózní') || showAlert.includes('konzervativní')
                ? 'text-blue-800'
                : 'text-yellow-800'
            }`}>
              {showAlert}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
