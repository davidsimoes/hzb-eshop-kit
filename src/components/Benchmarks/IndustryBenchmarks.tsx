import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { industryBenchmarks, getAverageMetrics, BENCHMARKS_UPDATED } from '@/data/benchmarks';
import { BarChart3 } from 'lucide-react';

interface IndustryBenchmarksProps {
  currentAOV?: number;
  currentConversion?: number;
  currentMargin?: number;
}

const formatCurrency = (num: number) =>
  new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);

// vrátí variantu Badge podle toho, jak si uživatelka stojí vůči průměru trhu
const perfVariant = (
  current: number,
  benchmark: number,
  higherIsBetter = true
): 'default' | 'secondary' | 'destructive' => {
  if (!current) return 'secondary';
  const ratio = current / benchmark;
  if (higherIsBetter) {
    if (ratio >= 1.1) return 'default';
    if (ratio >= 0.9) return 'secondary';
    return 'destructive';
  }
  if (ratio <= 0.9) return 'default';
  if (ratio <= 1.1) return 'secondary';
  return 'destructive';
};

const perfLabel = (variant: 'default' | 'secondary' | 'destructive') =>
  variant === 'default' ? 'Nad průměrem' : variant === 'secondary' ? 'V průměru' : 'Pod průměrem';

export const IndustryBenchmarks = ({
  currentAOV = 0,
  currentConversion = 0,
  currentMargin = 0
}: IndustryBenchmarksProps) => {
  const avg = getAverageMetrics();
  const hasInput = currentAOV > 0 || currentConversion > 0 || currentMargin > 0;

  const rows = [
    {
      label: 'Hodnota objednávky (AOV)',
      current: currentAOV,
      benchmark: avg.averageAOV,
      fmt: formatCurrency,
      higherIsBetter: true
    },
    {
      label: 'Konverze',
      current: currentConversion,
      benchmark: avg.averageConversion,
      fmt: (n: number) => `${n.toFixed(1)} %`,
      higherIsBetter: true
    },
    {
      label: 'Hrubá marže',
      current: currentMargin,
      benchmark: avg.averageMargin,
      fmt: (n: number) => `${n.toFixed(1)} %`,
      higherIsBetter: true
    }
  ];

  return (
    <Card className="shadow-soft border-brand-light-pink">
      <CardHeader className="bg-gradient-brand text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Jak si stojíš vůči trhu
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {hasInput && (
          <div className="space-y-3">
            {rows.map((r) => {
              const variant = perfVariant(r.current, r.benchmark, r.higherIsBetter);
              return (
                <div
                  key={r.label}
                  className="flex flex-wrap items-center justify-between gap-2 p-3 bg-brand-light-pink rounded-lg"
                >
                  <span className="text-brand-wine font-semibold">{r.label}</span>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-brand-wine">
                      ty: <strong>{r.fmt(r.current)}</strong>
                    </span>
                    <span className="text-brand-wine/60">
                      trh: {r.fmt(r.benchmark)}
                    </span>
                    {r.current > 0 && <Badge variant={variant}>{perfLabel(variant)}</Badge>}
                  </div>
                </div>
              );
            })}
            <p className="text-xs text-brand-wine/60">
              Průměr napříč obory. Najdi svůj obor v tabulce níž — bude přesnější.
            </p>
          </div>
        )}

        <div>
          <h4 className="text-sm font-bold text-brand-wine mb-3">
            Orientační benchmarky podle oboru (aktualizace {BENCHMARKS_UPDATED})
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-brand-wine/60 border-b border-brand-light-pink">
                  <th className="py-2 pr-2 font-medium">Obor</th>
                  <th className="py-2 px-2 font-medium text-right">AOV</th>
                  <th className="py-2 px-2 font-medium text-right">Konverze</th>
                  <th className="py-2 px-2 font-medium text-right">Marže</th>
                  <th className="py-2 pl-2 font-medium text-right">Marketing</th>
                </tr>
              </thead>
              <tbody>
                {industryBenchmarks.map((b) => (
                  <tr key={b.industry} className="border-b border-brand-light-pink/50">
                    <td className="py-2 pr-2 text-brand-wine font-medium">{b.label}</td>
                    <td className="py-2 px-2 text-right text-brand-wine/80">{formatCurrency(b.averageAOV)}</td>
                    <td className="py-2 px-2 text-right text-brand-wine/80">{b.averageConversion.toFixed(1)} %</td>
                    <td className="py-2 px-2 text-right text-brand-wine/80">{b.averageMargin} %</td>
                    <td className="py-2 pl-2 text-right text-brand-wine/80">{b.marketingBudgetPercent} %</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-brand-wine/50 mt-3">
            Orientační rozsahy, ne záruky. Slouží jen ke kontrole, jestli jsou tvoje čísla
            realistická. Skutečnost závisí na značce, ceně, sezóně a marketingu.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
