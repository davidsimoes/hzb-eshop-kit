import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { industryBenchmarks, getAverageMetrics } from '@/data/benchmarks';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
interface IndustryBenchmarksProps {
  currentAOV?: number;
  currentConversion?: number;
  currentMargin?: number;
}
export const IndustryBenchmarks = ({
  currentAOV = 0,
  currentConversion = 0,
  currentMargin = 0
}: IndustryBenchmarksProps) => {
  const {
    t
  } = useTranslation();
  const averageMetrics = getAverageMetrics();
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };
  const getPerformanceColor = (current: number, benchmark: number, higherIsBetter: boolean = true) => {
    if (current === 0) return 'secondary';
    const ratio = current / benchmark;
    if (higherIsBetter) {
      if (ratio >= 1.1) return 'default'; // green
      if (ratio >= 0.9) return 'secondary'; // yellow
      return 'destructive'; // red
    } else {
      if (ratio <= 0.9) return 'default'; // green
      if (ratio <= 1.1) return 'secondary'; // yellow
      return 'destructive'; // red
    }
  };
  return <div className="space-y-6">
      

      {currentAOV > 0 || currentConversion > 0 || currentMargin > 0}
    </div>;
};