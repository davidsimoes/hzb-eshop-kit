import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip } from './Tooltip';
import { MarketingBudgetSlider } from './MarketingBudgetSlider';
import { CACCalculator } from './CACCalculator';
import { MetricExplainer } from './MetricExplainer';
import { ValidationAlerts } from './ValidationAlerts';
import { RequiredRevenueCalculator } from './RequiredRevenueCalculator';
import { ScenarioPlanner } from './ScenarioPlanner';
import { CalculatorWizard } from './CalculatorWizard';
import { ActionableResults } from './ActionableResults';
import { ScenarioComparison } from './ScenarioComparison';
import { ExportData } from './ExportData';
import { IndustryBenchmarks } from './Benchmarks/IndustryBenchmarks';
import { LoadingSpinner, ResultsSkeleton } from './Loading/LoadingStates';
import { useUnifiedCalculationEngine, BusinessMetrics } from './UnifiedCalculationEngine';
import { Calculator, TrendingUp, Users, ShoppingCart, Target, DollarSign, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

  const calculateResults = useCallback(() => {
    if (!wizardData || !wizardData.desiredProfit || !wizardData.aov || wizardData.cogs < 0) {
      setResults(null);
      return;
    }

    const { desiredProfit, isYearly, aov, cogs, extraCosts, conversionRate, marketingCosts } = wizardData;

    if (cogs >= aov) {
      setResults(null);
      return;
    }

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
    setShowWizard(true);
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
    return (
      <>
        {isLoading ? (
          <ResultsSkeleton />
        ) : (
          <CalculatorWizard onComplete={handleWizardComplete} />
        )}
      </>
    );
  }

  return (
    <>
      {/* Header with restart option */}
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

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Industry Benchmarks */}
          {wizardData && (
            <IndustryBenchmarks
              currentAOV={wizardData.aov}
              currentConversion={wizardData.conversionRate}
              currentMargin={results?.grossMargin || 0}
            />
          )}

          {/* Forward-Looking Features */}
          {wizardData && (
            <div className="grid lg:grid-cols-2 gap-8">
              <RequiredRevenueCalculator
                desiredProfit={wizardData.desiredProfit}
                isYearly={wizardData.isYearly}
                onRevenueChange={setRequiredRevenue}
              />
              
              {requiredRevenue > 0 && wizardData.aov > 0 && (
                <ScenarioPlanner
                  requiredRevenue={requiredRevenue}
                  desiredProfit={wizardData.desiredProfit}
                  fixedCosts={wizardData.cogs + wizardData.extraCosts}
                  aov={wizardData.aov}
                  isYearly={wizardData.isYearly}
                />
              )}
            </div>
          )}

          {/* Results Grid */}
          {results && wizardData && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Basic Results */}
              <div className="space-y-4">
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
              </div>

              <div className="space-y-6">
                <MarketingBudgetSlider
                  targetProfit={wizardData.isYearly ? wizardData.desiredProfit / 12 : wizardData.desiredProfit}
                  aov={wizardData.aov}
                  margin={results.grossMargin}
                  onBudgetChange={setRecommendedMarketingBudget}
                />

                <CACCalculator
                  marketingBudget={wizardData.marketingCosts || recommendedMarketingBudget}
                  requiredOrders={results.requiredOrders}
                  aov={wizardData.aov}
                  customLTVMultiplier={ltvMultiplier}
                  onLTVMultiplierChange={setLtvMultiplier}
                />

                <MetricExplainer
                  aov={wizardData.aov}
                  cogs={wizardData.cogs}
                  margin={results.grossMargin}
                  conversionRate={wizardData.conversionRate}
                />
              </div>
            </div>
          )}

          {/* Validation Alerts */}
          {results && wizardData && (
            <ValidationAlerts
              aov={wizardData.aov}
              cogs={wizardData.cogs}
              margin={results.grossMargin}
              conversionRate={wizardData.conversionRate}
              cac={results ? wizardData.marketingCosts / results.requiredOrders : 0}
              marketingCosts={wizardData.marketingCosts}
            />
          )}

          {/* Enhanced Results Section */}
          {results && wizardData && (
            <div className="space-y-8">
              {/* Actionable Results */}
              <ActionableResults 
                results={results}
                wizardData={wizardData}
                onExportData={handleExportData}
              />

              {/* Scenario Comparison */}
              <ScenarioComparison 
                baseMetrics={wizardData}
              />


              {/* Terminology Section */}
              <div className="mt-16 max-w-4xl mx-auto">
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
                </div>
              </div>
            </div>
          )}
        </div>
    </>
  );
};
