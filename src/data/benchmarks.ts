// Orientační benchmarky českého e-commerce, aktualizace 2026.
//
// POZOR: Tohle nejsou záruky ani přesná čísla pro tvůj obor. Jsou to orientační
// rozsahy, které ti pomůžou poznat, jestli jsou tvoje vstupy do kalkulačky
// realistické. Skutečná čísla se liší podle značky, ceny, sezóny a marketingu.
//
// Kontext 2026 (zdroj: VTE 2025/2026 vzorek čes. e-shopů, Exec, CzechCrunch TOP 100,
// firemní výsledky GymBeam/Footshop/Pilulka):
//  - Roste tlak na marže, marketplaces (Temu, Shein) stlačují ceny dolů.
//  - Průměrný limit pro dopravu zdarma vyrostl na ~2 012 Kč, medián 1 500 Kč.
//  - Malé multibrandy bez vlastní značky mají těžkou pozici.
//  - Konverze na mobilu jsou nižší než na desktopu, reálná konverze bývá spíš na spodní hranici.
//
// Kaveáty (důležité pro orientaci):
//  - Ruční výroba: marže NEZAHRNUJE hodnotu tvojí práce, připočítej čas, ať se neklameš.
//  - Potraviny: hodně heterogenní, doplňky stravy mají marži klidně 50 až 65 %, čerstvé 20 až 30 %.
//  - Móda: 50 % platí pro vlastní značku, přeprodej cizích značek spíš 30 až 40 %.
//  - Elektronika: AOV i marže sedí jen pro drobnou elektroniku a příslušenství.

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
    averageAOV: 1100,
    averageConversion: 1.4,
    averageMargin: 50,
    averageCOGS: 550,
    marketingBudgetPercent: 18,
    description: 'Oblečení, obuv a módní doplňky. Vysoká konkurence, hodně vratek. Marže 50 % platí pro vlastní značku, u přeprodeje spíš 30 až 40 %.'
  },
  {
    industry: 'cosmetics',
    label: 'Kosmetika a péče',
    averageAOV: 700,
    averageConversion: 1.8,
    averageMargin: 60,
    averageCOGS: 280,
    marketingBudgetPercent: 15,
    description: 'Kosmetika, drogerie a osobní péče. Dobrá marže, opakované nákupy. Vyšší konverze mají hlavně velcí hráči s velkou základnou věrných zákaznic.'
  },
  {
    industry: 'handmade',
    label: 'Ruční výroba a řemeslo',
    averageAOV: 650,
    averageConversion: 1.8,
    averageMargin: 65,
    averageCOGS: 228,
    marketingBudgetPercent: 15,
    description: 'Ručně vyráběné zboží a malé série. Vysoká marže (ale nezahrnuje tvůj čas!), omezená kapacita.'
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
    averageConversion: 1.6,
    averageMargin: 45,
    averageCOGS: 440,
    marketingBudgetPercent: 16,
    description: 'Dětské zboží, hračky a potřeby pro maminky. Loajální zákaznice, ale silný tlak marketplaců (Temu, Shein) na konverzi.'
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
    label: 'Potraviny a doplňky stravy',
    averageAOV: 750,
    averageConversion: 3.0,
    averageMargin: 38,
    averageCOGS: 465,
    marketingBudgetPercent: 17,
    description: 'Doplňky stravy a specializované potraviny (ne čerstvá donáška). Doplňky mají marži 50 až 65 %, čerstvé 20 až 30 %. Vysoká frekvence opakovaných nákupů.'
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
    industry: 'pets',
    label: 'Mazlíčci a chovatelské potřeby',
    averageAOV: 850,
    averageConversion: 2.7,
    averageMargin: 42,
    averageCOGS: 493,
    marketingBudgetPercent: 14,
    description: 'Krmivo, pomůcky a potřeby pro zvířata. Velmi věrné, vracející se zákaznice (skoro jako předplatné). Vlastní značka má marži vyšší, značkové krmivo nižší.'
  },
  {
    industry: 'electronics',
    label: 'Elektronika',
    averageAOV: 1800,
    averageConversion: 1.1,
    averageMargin: 22,
    averageCOGS: 1404,
    marketingBudgetPercent: 13,
    description: 'Elektronika a spotřebiče. Nízká marže, silná cenová konkurence, pro start těžké. Malý e-shop musí na marketing dát víc než velcí hráči.'
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
