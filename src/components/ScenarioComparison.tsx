import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, BarChart3, Target, Zap } from 'lucide-react';
import { useUnifiedCalculationEngine, BusinessMetrics } from './UnifiedCalculationEngine';
interface ScenarioComparisonProps {
  baseMetrics: BusinessMetrics;
}
export const ScenarioComparison = ({
  baseMetrics
}: ScenarioComparisonProps) => {
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'base' | 'aggressive'>('base');

  // Create different scenarios
  const conservativeMetrics: BusinessMetrics = {
    ...baseMetrics,
    conversionRate: Math.max(baseMetrics.conversionRate * 0.8, 1),
    marketingCosts: baseMetrics.marketingCosts * 0.7,
    aov: baseMetrics.aov * 0.9
  };
  const aggressiveMetrics: BusinessMetrics = {
    ...baseMetrics,
    conversionRate: baseMetrics.conversionRate * 1.3,
    marketingCosts: baseMetrics.marketingCosts * 1.5,
    aov: baseMetrics.aov * 1.2
  };

  // Calculate results for each scenario
  const conservativeResults = useUnifiedCalculationEngine(conservativeMetrics);
  const baseResults = useUnifiedCalculationEngine(baseMetrics);
  const aggressiveResults = useUnifiedCalculationEngine(aggressiveMetrics);
  const scenarios = [{
    id: 'conservative' as const,
    name: 'Konzervativní',
    description: 'Opatrný přístup s nižšími riziky',
    color: 'bg-blue-50 border-blue-200',
    metrics: conservativeMetrics,
    results: conservativeResults,
    icon: '🐌',
    strategy: 'Postupný růst s malými kroky',
    timeframe: '6-12 měsíců'
  }, {
    id: 'base' as const,
    name: 'Realistický',
    description: 'Tvůj původní plán',
    color: 'bg-green-50 border-green-200',
    metrics: baseMetrics,
    results: baseResults,
    icon: '⚖️',
    strategy: 'Vyvážený přístup s kontrolovaným rizikem',
    timeframe: '3-6 měsíců'
  }, {
    id: 'aggressive' as const,
    name: 'Agresivní',
    description: 'Rychlý růst s vyšším rizikem',
    color: 'bg-red-50 border-red-200',
    metrics: aggressiveMetrics,
    results: aggressiveResults,
    icon: '🚀',
    strategy: 'Rychlé škálování a investice',
    timeframe: '1-3 měsíce'
  }];
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('cs-CZ').format(Math.round(num));
  };
  const getComparisonIcon = (current: number, base: number) => {
    if (current > base) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (current < base) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <BarChart3 className="w-4 h-4 text-gray-600" />;
  };
  const getComparisonColor = (current: number, base: number) => {
    if (current > base) return 'text-green-600';
    if (current < base) return 'text-red-600';
    return 'text-gray-600';
  };
  const selectedScenarioData = scenarios.find(s => s.id === selectedScenario)!;
  return <div className="space-y-6">
      {/* Scenario Selection */}
      

      {/* Results Comparison */}
      
    </div>;
};