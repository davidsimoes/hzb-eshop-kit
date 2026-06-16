import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip } from './Tooltip';
import { MarketingBudgetSlider } from './MarketingBudgetSlider';
import { CACCalculator } from './CACCalculator';
import { MetricExplainer } from './MetricExplainer';
import { ValidationAlerts } from './ValidationAlerts';
import { RequiredRevenueCalculator } from './RequiredRevenueCalculator';
import { CalculatorWizard } from './CalculatorWizard';
import { ActionableResults } from './ActionableResults';
import { ScenarioComparison } from './ScenarioComparison';
import { ExportData } from './ExportData';
import { IndustryBenchmarks } from './Benchmarks/IndustryBenchmarks';
import { LoadingSpinner, ResultsSkeleton } from './Loading/LoadingStates';
import { useUnifiedCalculationEngine, BusinessMetrics } from './UnifiedCalculationEngine';
import { Calculator, TrendingUp, Users, ShoppingCart, Target, DollarSign, RefreshCw, AlertTriangle, Sparkles, UserPlus, Percent } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ---------------------------------------------------------------------------
// Prefill scenarios — realistické příklady pro různé niše, aby šlo demo hned.
// Hodnoty vycházejí z benchmarks.ts (averageAOV / averageMargin / averageConversion).
// ---------------------------------------------------------------------------
interface PrefillScenario {
  label: string;
  emoji: string;
  data: {
    desiredProfit: number;
    isYearly: boolean;
    aov: number;
    cogs: number;
    extraCosts: number;
    conversionRate: number;
    marketingCosts: number;
  };
}

const PREFILL_SCENARIOS: PrefillScenario[] = [
  {
    label: 'Šperky',
    emoji: '💍',
    data: {
      desiredProfit: 25000,
      isYearly: false,
      aov: 1100,
      cogs: 418,
      extraCosts: 80,
      conversionRate: 1.5,
      marketingCosts: 8000,
    },
  },
  {
    label: 'Kosmetika',
    emoji: '🌸',
    data: {
      desiredProfit: 20000,
      isYearly: false,
      aov: 700,
      cogs: 280,
      extraCosts: 70,
      conversionRate: 1.8,
      marketingCosts: 6000,
    },
  },
  {
    label: 'Móda',
    emoji: '👗',
    data: {
      desiredProfit: 30000,
      isYearly: false,
      aov: 1100,
      cogs: 550,
      extraCosts: 100,
      conversionRate: 1.4,
      marketingCosts: 12000,
    },
  },
  {
    label: 'Mazlíčci',
    emoji: '🐾',
    data: {
      desiredProfit: 15000,
      isYearly: false,
      aov: 850,
      cogs: 493,
      extraCosts: 60,
      conversionRate: 2.7,
      marketingCosts: 5000,
    },
  },
];

interface CalculatorResults {
  monthlyProfit: number;
  yearlyProfit: number;
  grossMargin: number;
  netMargin: number;
  requiredOrders: number;
  requiredVisitors: number;
  profitAfterMarketing: number;
  breakEvenPoint: number;
}

interface WizardData {
  desiredProfit: number;
  isYearly: boolean;
  aov: number;
  cogs: number;
  extraCosts: number;
  conversionRate: number;
  marketingCosts: number;
}

export const FinancialCalculator = () => {
  const { t } = useTranslation();
  const [showWizard, setShowWizard] = useState(true);
  const [wizardData, setWizardData] = useState<WizardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requiredRevenue, setRequiredRevenue] = useState<number>(0);
  const [recommendedMarketingBudget, setRecommendedMarketingBudget] = useState<number>(0);
  const [ltvMultiplier, setLtvMultiplier] = useState<number>(2.5);
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [costError, setCostError] = useState<boolean>(false);

  const calculateResults = useCallback(() => {
    if (!wizardData || !wizardData.desiredProfit || !wizardData.aov || wizardData.cogs < 0) {
      setResults(null);
      setCostError(false);
      return;
    }

    const { desiredProfit, isYearly, aov, cogs, extraCosts, conversionRate, marketingCosts } = wizardData;

    if (cogs + extraCosts >= aov) {
      setResults(null);
      setCostError(true);
      return;
    }

    setCostError(false);

    try {
      const monthlyProfit = isYearly ? desiredProfit / 12 : desiredProfit;
      const yearlyProfit = isYearly ? desiredProfit : desiredProfit * 12;
      
      const grossMargin = ((aov - cogs) / aov) * 100;
      const netMargin = ((aov - cogs - extraCosts) / aov) * 100;
      
      const profitPerOrder = Math.max(aov - cogs - extraCosts, 0);
      const requiredOrders = profitPerOrder > 0 ? Math.ceil((monthlyProfit + marketingCosts) / profitPerOrder) : 0;
      const requiredVisitors = conversionRate > 0 ? Math.ceil(requiredOrders / (conversionRate / 100)) : 0;
      
      const profitAfterMarketing = (requiredOrders * profitPerOrder) - marketingCosts;
      const breakEvenPoint = marketingCosts > 0 && profitPerOrder > 0 ? Math.ceil(marketingCosts / profitPerOrder) : 0;

      setResults({
        monthlyProfit,
        yearlyProfit,
        grossMargin,
        netMargin,
        requiredOrders,
        requiredVisitors,
        profitAfterMarketing,
        breakEvenPoint
      });
    } catch (error) {
      console.error('Calculation error:', error);
      setResults(null);
    }
  }, [wizardData]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  const handleWizardComplete = async (data: WizardData) => {
    setIsLoading(true);
    // Simulate calculation time
    await new Promise(resolve => setTimeout(resolve, 1500));
    setWizardData(data);
    setShowWizard(false);
    setIsLoading(false);
  };

  const handleStartOver = () => {
    setWizardData(null);
    setResults(null);
    setRequiredRevenue(0);
    setCostError(false);
    setShowWizard(true);
  };

  const handlePrefill = async (scenario: PrefillScenario) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setWizardData(scenario.data);
    setShowWizard(false);
    setIsLoading(false);
  };

  const handleExportData = () => {
    // Export functionality will be handled by ExportData component
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('cs-CZ').format(Math.round(num));
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

  if (showWizard) {
    if (isLoading) {
      return <ResultsSkeleton />;
    }
    return (
      <>
        {/* Prefill scenario tlacitka */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-brand-wine/70 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Vyzkoušej příklad:
            </span>
            {PREFILL_SCENARIOS.map((s) => (
              <Button
                key={s.label}
                variant="outline"
                size="sm"
                onClick={() => handlePrefill(s)}
                className="border-brand-wine/40 text-brand-wine hover:bg-brand-wine hover:text-white text-xs h-8"
              >
                {s.emoji} {s.label}
              </Button>
            ))}
          </div>
        </div>
        <CalculatorWizard onComplete={handleWizardComplete} />
      </>
    );
  }

  return (
    <>
      {/* Vždy viditelné: tlačítko změnit data + chybová hláška */}
      <div className="text-center mb-8">
        <Button
          variant="outline"
          onClick={handleStartOver}
          className="flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          {t('calculator.results.changeData')}
        </Button>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Cost error: náklady jsou vyšší než cena */}
        {costError && (
          <Card className="shadow-soft border border-red-200 mb-8">
            <CardContent className="p-6 flex items-start gap-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-red-700">
                  Náklady jsou vyšší než cena
                </div>
                <div className="text-sm text-red-700/80">
                  Náklady na zboží a ostatní náklady na objednávku dohromady převyšují prodejní cenu. Na každé objednávce bys prodělávala. Uprav cenu nebo náklady, ať je z objednávky zisk.
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Taby — zobrazí se jen pokud máme data */}
        {wizardData && (
          <Tabs defaultValue="answer" className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-1 mb-8 bg-brand-light-pink/50 p-1 rounded-lg">
              <TabsTrigger
                value="answer"
                className="flex-1 min-w-[140px] data-[state=active]:bg-brand-wine data-[state=active]:text-white"
              >
                Vyjde mi to?
              </TabsTrigger>
              <TabsTrigger
                value="detail"
                className="flex-1 min-w-[140px] data-[state=active]:bg-brand-wine data-[state=active]:text-white"
              >
                Detail a scénáře
              </TabsTrigger>
              <TabsTrigger
                value="marketing"
                className="flex-1 min-w-[140px] data-[state=active]:bg-brand-wine data-[state=active]:text-white"
              >
                Marketing a další kroky
              </TabsTrigger>
            </TabsList>

            {/* ── TAB 1: Vyjde mi to? ── */}
            <TabsContent value="answer" className="space-y-8">
              {/* Industry Benchmarks */}
              <IndustryBenchmarks
                currentAOV={wizardData.aov}
                currentConversion={wizardData.conversionRate}
                currentMargin={results?.grossMargin || 0}
              />

              {/* RequiredRevenueCalculator */}
              <RequiredRevenueCalculator
                desiredProfit={wizardData.desiredProfit}
                isYearly={wizardData.isYearly}
                onRevenueChange={setRequiredRevenue}
                initialNetMargin={results ? Math.round(results.netMargin) : 20}
              />

              {/* Tvoje výsledky */}
              {results && (
                <Card className="shadow-soft">
                  <CardHeader className="bg-brand-wine text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      {t('calculator.results.yourResults')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-brand-light-pink rounded-lg">
                        <div className="text-2xl font-bold text-brand-wine">
                          {formatCurrency(results.monthlyProfit)}
                        </div>
                        <div className="text-sm text-brand-wine/70">
                          {t('calculator.results.monthlyProfit')}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-brand-light-pink rounded-lg">
                        <div className="text-2xl font-bold text-brand-wine">
                          {formatCurrency(results.yearlyProfit)}
                        </div>
                        <div className="text-sm text-brand-wine/70">
                          {t('calculator.results.yearlyProfit')}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gradient-brand text-white rounded-lg">
                        <div className="text-2xl font-bold">
                          {results.grossMargin.toFixed(1)}%
                        </div>
                        <div className="text-sm opacity-90">
                          {t('calculator.results.grossMargin')}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-brand-pink text-white rounded-lg">
                        <div className="text-2xl font-bold">
                          {results.netMargin.toFixed(1)}%
                        </div>
                        <div className="text-sm opacity-90">
                          {t('calculator.results.netMargin')}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Požadavky na dosažení cíle */}
              {results && (
                <Card className="shadow-soft">
                  <CardHeader className="bg-brand-pink text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      {t('calculator.results.requirements')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-4 bg-brand-light-pink rounded-lg">
                      <div className="flex items-center gap-3">
                        <ShoppingCart className="w-5 h-5 text-brand-wine" />
                        <span className="text-brand-wine font-semibold">
                          {t('calculator.results.ordersPerMonth')}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-brand-wine">
                        {formatNumber(results.requiredOrders)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-brand-light-pink rounded-lg">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-brand-wine" />
                        <span className="text-brand-wine font-semibold">
                          {t('calculator.results.visitorsPerMonth')}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-brand-wine">
                        {formatNumber(results.requiredVisitors)}
                      </span>
                    </div>
                    {wizardData.marketingCosts > 0 && (
                      <>
                        <div className="flex items-center justify-between p-4 bg-brand-light-pink rounded-lg">
                          <div className="flex items-center gap-3">
                            <DollarSign className="w-5 h-5 text-brand-wine" />
                            <span className="text-brand-wine font-semibold">
                              {t('calculator.results.profitAfterMarketing')}
                            </span>
                          </div>
                          <span className="text-2xl font-bold text-brand-wine">
                            {formatCurrency(results.profitAfterMarketing)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-brand-light-pink rounded-lg">
                          <div className="flex items-center gap-3">
                            <Target className="w-5 h-5 text-brand-wine" />
                            <span className="text-brand-wine font-semibold">
                              {t('calculator.results.breakEven')}
                            </span>
                          </div>
                          <span className="text-2xl font-bold text-brand-wine">
                            {formatNumber(results.breakEvenPoint)}
                          </span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Validation Alerts */}
              {results && (
                <ValidationAlerts
                  aov={wizardData.aov}
                  cogs={wizardData.cogs}
                  margin={results.grossMargin}
                  conversionRate={wizardData.conversionRate}
                  cac={results.requiredOrders > 0 ? wizardData.marketingCosts / results.requiredOrders : 0}
                  marketingCosts={wizardData.marketingCosts}
                />
              )}
            </TabsContent>

            {/* ── TAB 2: Detail a scénáře ── */}
            <TabsContent value="detail" className="space-y-8">
              {/* ScenarioComparison */}
              {results && (
                <ScenarioComparison
                  baseMetrics={wizardData}
                />
              )}

              {/* MetricExplainer */}
              {results && (
                <MetricExplainer
                  aov={wizardData.aov}
                  cogs={wizardData.cogs}
                  margin={results.grossMargin}
                  conversionRate={wizardData.conversionRate}
                />
              )}

              {/* CACCalculator */}
              {results && (wizardData.marketingCosts > 0 || recommendedMarketingBudget > 0) && (
                <CACCalculator
                  marketingBudget={wizardData.marketingCosts || recommendedMarketingBudget}
                  requiredOrders={results.requiredOrders}
                  aov={wizardData.aov}
                  customLTVMultiplier={ltvMultiplier}
                  onLTVMultiplierChange={setLtvMultiplier}
                />
              )}

              {/* Terminology / Vysvětlení pojmů */}
              {results && (
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold text-brand-wine text-center mb-8">
                    {t('calculator.results.terminology.title')}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="shadow-soft">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-brand-wine mb-3 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          {t('calculator.results.terminology.profit.title')}
                        </h3>
                        <p className="text-brand-wine/80">
                          {t('calculator.results.terminology.profit.description')}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-soft">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-brand-wine mb-3 flex items-center gap-2">
                          <ShoppingCart className="w-5 h-5" />
                          {t('calculator.results.terminology.aov.title')}
                        </h3>
                        <p className="text-brand-wine/80">
                          {t('calculator.results.terminology.aov.description')}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-soft">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-brand-wine mb-3 flex items-center gap-2">
                          <DollarSign className="w-5 h-5" />
                          {t('calculator.results.terminology.cogs.title')}
                        </h3>
                        <p className="text-brand-wine/80">
                          {t('calculator.results.terminology.cogs.description')}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-soft">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-brand-wine mb-3 flex items-center gap-2">
                          <Target className="w-5 h-5" />
                          {t('calculator.results.terminology.margin.title')}
                        </h3>
                        <p className="text-brand-wine/80">
                          {t('calculator.results.terminology.margin.description')}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-soft">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-brand-wine mb-3 flex items-center gap-2">
                          <UserPlus className="w-5 h-5" />
                          {t('calculator.results.terminology.cac.title')}
                        </h3>
                        <p className="text-brand-wine/80">
                          {t('calculator.results.terminology.cac.description')}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-soft">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-brand-wine mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          {t('calculator.results.terminology.ltv.title')}
                        </h3>
                        <p className="text-brand-wine/80">
                          {t('calculator.results.terminology.ltv.description')}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-soft">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-brand-wine mb-3 flex items-center gap-2">
                          <Percent className="w-5 h-5" />
                          {t('calculator.results.terminology.conversion.title')}
                        </h3>
                        <p className="text-brand-wine/80">
                          {t('calculator.results.terminology.conversion.description')}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-soft">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-brand-wine mb-3 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          {t('calculator.results.terminology.roi.title')}
                        </h3>
                        <p className="text-brand-wine/80">
                          {t('calculator.results.terminology.roi.description')}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* ── TAB 3: Marketing a další kroky ── */}
            <TabsContent value="marketing" className="space-y-8">
              {/* MarketingBudgetSlider */}
              {results && (
                <MarketingBudgetSlider
                  targetProfit={wizardData.isYearly ? wizardData.desiredProfit / 12 : wizardData.desiredProfit}
                  aov={wizardData.aov}
                  margin={results.grossMargin}
                  onBudgetChange={setRecommendedMarketingBudget}
                />
              )}

              {/* ActionableResults */}
              {results && (
                <ActionableResults
                  results={results}
                  wizardData={wizardData}
                  onExportData={handleExportData}
                />
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </>
  );
};
