
export interface IndustryBenchmark {
  industry: string;
  averageAOV: number;
  averageConversion: number;
  averageMargin: number;
  averageCOGS: number;
  marketingBudgetPercent: number;
  description: string;
}

export const industryBenchmarks: IndustryBenchmark[] = [
  {
    industry: 'fashion',
    averageAOV: 800,
    averageConversion: 1.8,
    averageMargin: 45,
    averageCOGS: 440,
    marketingBudgetPercent: 15,
    description: 'Oblečení a módní doplňky'
  },
  {
    industry: 'electronics',
    averageAOV: 1500,
    averageConversion: 1.2,
    averageMargin: 25,
    averageCOGS: 1125,
    marketingBudgetPercent: 12,
    description: 'Elektronika a spotřební zboží'
  },
  {
    industry: 'cosmetics',
    averageAOV: 600,
    averageConversion: 2.5,
    averageMargin: 60,
    averageCOGS: 240,
    marketingBudgetPercent: 20,
    description: 'Kosmetika a osobní péče'
  },
  {
    industry: 'home',
    averageAOV: 1200,
    averageConversion: 1.5,
    averageMargin: 40,
    averageCOGS: 720,
    marketingBudgetPercent: 14,
    description: 'Domácnost a zahrada'
  },
  {
    industry: 'sports',
    averageAOV: 900,
    averageConversion: 2.0,
    averageMargin: 35,
    averageCOGS: 585,
    marketingBudgetPercent: 18,
    description: 'Sport a volný čas'
  },
  {
    industry: 'food',
    averageAOV: 400,
    averageConversion: 3.0,
    averageMargin: 30,
    averageCOGS: 280,
    marketingBudgetPercent: 25,
    description: 'Potraviny a nápoje'
  }
];

export const getIndustryBenchmark = (industry: string): IndustryBenchmark | undefined => {
  return industryBenchmarks.find(b => b.industry === industry);
};

export const getAverageMetrics = () => {
  const totalIndustries = industryBenchmarks.length;
  
  return {
    averageAOV: Math.round(industryBenchmarks.reduce((sum, b) => sum + b.averageAOV, 0) / totalIndustries),
    averageConversion: Number((industryBenchmarks.reduce((sum, b) => sum + b.averageConversion, 0) / totalIndustries).toFixed(1)),
    averageMargin: Math.round(industryBenchmarks.reduce((sum, b) => sum + b.averageMargin, 0) / totalIndustries),
    averageCOGS: Math.round(industryBenchmarks.reduce((sum, b) => sum + b.averageCOGS, 0) / totalIndustries),
    marketingBudgetPercent: Math.round(industryBenchmarks.reduce((sum, b) => sum + b.marketingBudgetPercent, 0) / totalIndustries)
  };
};
