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
  if (targetProfit === 0 || margin === 0) {
    return null;
  }
  return;
};