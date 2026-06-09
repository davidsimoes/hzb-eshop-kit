// Orientační benchmarky českého e-commerce — aktualizace 2026.
//
// POZOR: Tohle nejsou záruky ani přesná čísla pro tvůj obor. Jsou to orientační
// rozsahy, které ti pomůžou poznat, jestli jsou tvoje vstupy do kalkulačky
// realistické. Skutečná čísla se liší podle značky, ceny, sezóny a marketingu.
//
// Kontext 2026 (zdroj: Exec, CzechCrunch TOP 100, Velký test e-shopů 2026):
//  - Roste tlak na marže — marketplaces (Temu, Shein) stlačují ceny dolů.
//  - Průměrný limit pro dopravu zdarma vyrostl na ~2 012 Kč.
//  - Malé multibrandy do ~50 mil. Kč obratu mají bez vlastní značky těžkou pozici.
//  - Konverze na mobilu jsou nižší než na desktopu — proto se průměry drží nízko.

export interface IndustryBenchmark {
  industry: string;          // klíč (stabilní, nepřekládá se)
  label: string;             // český název pro UI
  averageAOV: number;        // průměrná hodnota objednávky (Kč)
  averageConversion: number; // průměrná konverze (%)
  averageMargin: number;     // průměrná hrubá marže (%)
  averageCOGS: number;       // odvozené náklady na zboží (Kč)
  marketingBudgetPercent: number; // doporučený podíl marketingu z obratu (%)
  description: string;
}

export const BENCHMARKS_UPDATED = '2026-06';

export const industryBenchmarks: IndustryBenchmark[] = [
  {
    industry: 'fashion',
    label: 'Móda a oblečení',
    averageAOV: 950,
    averageConversion: 1.4,
    averageMargin: 50,
    averageCOGS: 475,
    marketingBudgetPercent: 18,
    description: 'Oblečení, obuv a módní doplňky. Vysoká konkurence, hodně vratek.'
  },
  {
    industry: 'cosmetics',
    label: 'Kosmetika a péče',
    averageAOV: 700,
    averageConversion: 2.4,
    averageMargin: 60,
    averageCOGS: 280,
    marketingBudgetPercent: 20,
    description: 'Kosmetika, drogerie a osobní péče. Dobrá marže, opakované nákupy.'
  },
  {
    industry: 'handmade',
    label: 'Ruční výroba a řemeslo',
    averageAOV: 650,
    averageConversion: 1.8,
    averageMargin: 65,
    averageCOGS: 228,
    marketingBudgetPercent: 15,
    description: 'Ručně vyráběné zboží a malé série. Vysoká marže, omezená kapacita výroby.'
  },
  {
    industry: 'jewelry',
    label: 'Šperky a doplňky',
    averageAOV: 1100,
    averageConversion: 1.5,
    averageMargin: 62,
    averageCOGS: 418,
    marketingBudgetPercent: 18,
    description: 'Šperky, bižuterie a doplňky. Silný vliv fotek a značky na konverzi.'
  },
  {
    industry: 'kids',
    label: 'Děti a maminky',
    averageAOV: 800,
    averageConversion: 2.0,
    averageMargin: 45,
    averageCOGS: 440,
    marketingBudgetPercent: 16,
    description: 'Dětské zboží, hračky a potřeby pro maminky. Loajální, vracející se zákaznice.'
  },
  {
    industry: 'home',
    label: 'Domácnost a zahrada',
    averageAOV: 1300,
    averageConversion: 1.4,
    averageMargin: 42,
    averageCOGS: 754,
    marketingBudgetPercent: 14,
    description: 'Bytové doplňky, nábytek a zahrada. Vyšší AOV, delší rozhodování.'
  },
  {
    industry: 'food',
    label: 'Potraviny a nápoje',
    averageAOV: 550,
    averageConversion: 3.0,
    averageMargin: 32,
    averageCOGS: 374,
    marketingBudgetPercent: 22,
    description: 'Potraviny, doplňky stravy a nápoje. Nízká marže, vysoká frekvence nákupů.'
  },
  {
    industry: 'sports',
    label: 'Sport a volný čas',
    averageAOV: 1000,
    averageConversion: 1.7,
    averageMargin: 38,
    averageCOGS: 620,
    marketingBudgetPercent: 17,
    description: 'Sportovní vybavení a volný čas. Sezónní výkyvy.'
  },
  {
    industry: 'electronics',
    label: 'Elektronika',
    averageAOV: 1800,
    averageConversion: 1.1,
    averageMargin: 22,
    averageCOGS: 1404,
    marketingBudgetPercent: 10,
    description: 'Elektronika a spotřebiče. Nízká marže, silná cenová konkurence — pro start těžké.'
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
