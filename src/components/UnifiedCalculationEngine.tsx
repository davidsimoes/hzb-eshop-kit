import { useMemo } from 'react';

export interface BusinessMetrics {
  // Basic business data
  aov: number;
  cogs: number;
  extraCosts: number;
  conversionRate: number;
  marketingCosts: number;
  
  // Goals
  desiredProfit: number;
  isYearly: boolean;
  
  // Advanced
  fixedCosts?: number;
  ltvMultiplier?: number;
  netMargin?: number;
}

export interface CalculatedResults {
  // Revenue & Profit
  monthlyRevenue: number;
  yearlyRevenue: number;
  monthlyProfit: number;
  yearlyProfit: number;
  profitAfterMarketing: number;
  
  // Margins
  grossMargin: number;
  netMargin: number;
  profitPerOrder: number;
  
  // Volume requirements
  requiredOrders: number;
  requiredVisitors: number;
  dailyOrders: number;
  dailyVisitors: number;
  
  // Marketing metrics
  cac: number;
  ltv: number;
  roas: number;
  breakEvenPoint: number;
  
  // Health indicators
  isViable: boolean;
  profitability: 'excellent' | 'good' | 'acceptable' | 'poor' | 'loss';
  marketingEfficiency: 'excellent' | 'good' | 'acceptable' | 'poor';
  
  // Recommendations
  recommendations: string[];
  warnings: string[];
}

export const useUnifiedCalculationEngine = (metrics: BusinessMetrics): CalculatedResults => {
  return useMemo(() => {
    const {
      aov,
      cogs,
      extraCosts,
      conversionRate,
      marketingCosts,
      desiredProfit,
      isYearly,
      fixedCosts = 0,
      ltvMultiplier = 2.5,
      netMargin = 20
    } = metrics;

    // Validate inputs
    if (!aov || aov <= 0 || !desiredProfit || desiredProfit <= 0 || conversionRate <= 0) {
      return {
        monthlyRevenue: 0,
        yearlyRevenue: 0,
        monthlyProfit: 0,
        yearlyProfit: 0,
        profitAfterMarketing: 0,
        grossMargin: 0,
        netMargin: 0,
        profitPerOrder: 0,
        requiredOrders: 0,
        requiredVisitors: 0,
        dailyOrders: 0,
        dailyVisitors: 0,
        cac: 0,
        ltv: 0,
        roas: 0,
        breakEvenPoint: 0,
        isViable: false,
        profitability: 'loss',
        marketingEfficiency: 'poor',
        recommendations: ['Zkontroluj zadané údaje'],
        warnings: ['Neplatné vstupní údaje']
      };
    }

    // Basic calculations
    const monthlyProfit = isYearly ? desiredProfit / 12 : desiredProfit;
    const yearlyProfit = isYearly ? desiredProfit : desiredProfit * 12;
    
    const grossMargin = ((aov - cogs) / aov) * 100;
    const profitPerOrder = Math.max(aov - cogs - extraCosts, 0);
    const calculatedNetMargin = profitPerOrder > 0 ? (profitPerOrder / aov) * 100 : 0;
    
    // Volume calculations
    const requiredOrders = profitPerOrder > 0 ? Math.ceil((monthlyProfit + marketingCosts) / profitPerOrder) : 0;
    const requiredVisitors = conversionRate > 0 ? Math.ceil(requiredOrders / (conversionRate / 100)) : 0;
    const dailyOrders = Math.ceil(requiredOrders / 30);
    const dailyVisitors = Math.ceil(requiredVisitors / 30);
    
    // Revenue calculations
    const monthlyRevenue = requiredOrders * aov;
    const yearlyRevenue = monthlyRevenue * 12;
    const profitAfterMarketing = (requiredOrders * profitPerOrder) - marketingCosts;
    
    // Marketing metrics
    const cac = requiredOrders > 0 && marketingCosts > 0 ? marketingCosts / requiredOrders : 0;
    const ltv = aov * ltvMultiplier;
    const roas = marketingCosts > 0 ? monthlyRevenue / marketingCosts : 0;
    const breakEvenPoint = marketingCosts > 0 && profitPerOrder > 0 ? Math.ceil(marketingCosts / profitPerOrder) : 0;
    
    // Health indicators
    const isViable = profitPerOrder > 0 && requiredOrders > 0 && (cac === 0 || cac < ltv * 0.3);
    
    const getProfitability = (): CalculatedResults['profitability'] => {
      if (calculatedNetMargin >= 25) return 'excellent';
      if (calculatedNetMargin >= 20) return 'good';
      if (calculatedNetMargin >= 15) return 'acceptable';
      if (calculatedNetMargin >= 5) return 'poor';
      return 'loss';
    };
    
    const getMarketingEfficiency = (): CalculatedResults['marketingEfficiency'] => {
      if (cac === 0) return 'good'; // No marketing costs
      if (cac < ltv * 0.2) return 'excellent';
      if (cac < ltv * 0.3) return 'good';
      if (cac < ltv * 0.5) return 'acceptable';
      return 'poor';
    };
    
    // Generate recommendations
    const recommendations: string[] = [];
    const warnings: string[] = [];
    
    if (grossMargin < 30) {
      recommendations.push('Zvaž vyjednání lepších cen s dodavateli nebo mírné zvýšení prodejních cen');
    }
    
    if (conversionRate < 1.5) {
      recommendations.push('Zlepši konverzi - trust signály, UX, zjednodušení objednávky');
    }
    
    if (aov < 700) {
      recommendations.push('Navyš AOV pomocí cross-sellingu, upsellingu nebo bundlů');
    }
    
    if (cac > ltv * 0.3 && cac > 0) {
      warnings.push('CAC je příliš vysoký vzhledem k LTV - optimalizuj kampaně');
    }
    
    if (dailyOrders > 100) {
      warnings.push('Cíl vyžaduje vysoký objem - ujisti se, že máš kapacitu na fulfillment');
    }
    
    if (marketingCosts > monthlyRevenue * 0.25) {
      warnings.push('Marketingový rozpočet je nad 25% obratu - může být neudržitelný');
    }

    return {
      monthlyRevenue,
      yearlyRevenue,
      monthlyProfit,
      yearlyProfit,
      profitAfterMarketing,
      grossMargin,
      netMargin: calculatedNetMargin,
      profitPerOrder,
      requiredOrders,
      requiredVisitors,
      dailyOrders,
      dailyVisitors,
      cac,
      ltv,
      roas,
      breakEvenPoint,
      isViable,
      profitability: getProfitability(),
      marketingEfficiency: getMarketingEfficiency(),
      recommendations,
      warnings
    };
  }, [metrics]);
};