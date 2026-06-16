// Orientační benchmarky českého e-commerce, aktualizace 2026.
//
// POZOR: Tohle nejsou záruky ani přesná čísla pro tvůj obor. Jsou to orientační
// rozsahy, které ti pomůžou poznat, jestli jsou tvoje vstupy do kalkulačky
// realistické. Skutečná čísla se liší podle značky, ceny, sezóny a marketingu.
//
// ZDROJE A METODIKA (validováno 2026-06):
//  - Konverze: průměr českých e-shopů ~2 %, "zdravé" pásmo 2 až 4 %, ideál 2 až 5 %,
//    pod 1 % je problém. Reálná konverze bývá spíš na spodní hranici (mobil, malé e-shopy).
//    Zdroj: SmartEmailing, grou.cz, Shoptet (CZ 2025). Hodnoty u oborů jsou konzervativní odhady
//    v rámci tohoto pásma, upravené podle charakteru nákupu (impulz vs. zvážený nákup).
//  - AOV: průměr CZ e-commerce ~1 605 Kč (Q2 2025) až ~1 900 Kč (celý 2025).
//    Zdroj: Heureka E-commerce Insider 2025, APEK. Hodnoty u oborů jsou typické pro kategorii (odhad).
//  - Marže (hrubá): kategoriální pásma z mezinárodních e-commerce benchmarků (stabilní napříč trhy):
//    kosmetika 50–70 %, móda 40–60 %, domácnost 35–55 %, doplňky stravy/wellness 55–70 %,
//    elektronika 15–25 %. Zdroj: nstarfinance / Eightx / Opensend e-commerce margin benchmarks 2025/26.
//    CZ-specifická tabulka marží podle oboru veřejně neexistuje → použity tato pásma + obor. korekce.
//  - averageCOGS je dopočítané: COGS = AOV × (1 − marže/100). Není to nezávislé měření.
//
// Kontext 2026 (Exec talks – kvalitativní, CzechCrunch TOP 100, firemní výsledky):
//  - Roste tlak na marže, marketplaces (Temu, Shein) stlačují ceny dolů a polarizují trh
//    (Astratex, Freshlabels, Sportisimo – Exec talks). Přeshraniční nákupy ~15 % CZ trhu.
//  - Průměrný limit pro dopravu zdarma se drží kolem ~1 500 až 2 000 Kč.
//  - Malé multibrandy bez vlastní značky mají těžkou pozici.
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
    // Marže 40–60 % (benchmark) → 50 % pro vlastní značku. AOV pod CZ průměrem (typické). Konverze nízká: hodně vratek a srovnávání.
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
    // Marže 50–70 % (benchmark) → 60 %. AOV nižší (časté, menší nákupy), konverze nad médian díky opakovaným nákupům.
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
    // Veřejný CZ benchmark neexistuje → odhad pro kategorii. Vysoká marže (ruční přirážka), ALE nezahrnuje cenu práce. Konverze: malá, ale loajální/cílená návštěvnost.
    industry: 'handmade',
    label: 'Ruční výroba a řemeslo',
    averageAOV: 650,
    averageConversion: 1.8,
    averageMargin: 65,
    averageCOGS: 227,
    marketingBudgetPercent: 15,
    description: 'Ručně vyráběné zboží a malé série. Vysoká marže (ale nezahrnuje tvůj čas!), omezená kapacita.'
  },
  {
    // Veřejný CZ benchmark neexistuje → odhad pro kategorii. Vysoká marže (bižuterie i šperky), konverze závisí silně na fotkách a důvěře ve značku.
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
    // Odhad pro kategorii (smíšené značkové hračky + vlastní textil). Marže 45 % je blended. Silný tlak marketplaců (Temu/Shein) na konverzi.
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
    // Marže 35–55 % (benchmark) → 42 %. Vyšší AOV, delší rozhodování → nižší konverze. (Nábytek by mělo AOV výrazně vyšší; tady bytové doplňky + zahrada.)
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
    // Doplňky stravy/wellness mají marži 55–70 %, balené potraviny méně → blended 38 %. Konverze nad průměrem díky opakovaným nákupům (2,6 % je konzervativní horní pásmo, ne maximum).
    industry: 'food',
    label: 'Potraviny a doplňky stravy',
    averageAOV: 750,
    averageConversion: 2.6,
    averageMargin: 38,
    averageCOGS: 465,
    marketingBudgetPercent: 17,
    description: 'Doplňky stravy a specializované potraviny (ne čerstvá donáška). Doplňky mají marži 50 až 65 %, čerstvé 20 až 30 %. Vysoká frekvence opakovaných nákupů.'
  },
  {
    // Marže 38 % odráží tlak globálních značek na ceny (Sportisimo: online EBIT jen 5–10 % po letech optimalizace – Exec talks). Sezónní výkyvy.
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
    // Odhad pro kategorii (veřejný CZ benchmark chybí). Konverze nad průměrem (chování skoro jako předplatné – krmivo), 2,4 % je konzervativní. Marže 42 % blended: vlastní značka výš, značkové krmivo níž.
    industry: 'pets',
    label: 'Mazlíčci a chovatelské potřeby',
    averageAOV: 850,
    averageConversion: 2.4,
    averageMargin: 42,
    averageCOGS: 493,
    marketingBudgetPercent: 14,
    description: 'Krmivo, pomůcky a potřeby pro zvířata. Velmi věrné, vracející se zákaznice (skoro jako předplatné). Vlastní značka má marži vyšší, značkové krmivo nižší.'
  },
  {
    // Marže 15–25 % (benchmark) → 22 %. Nejvyšší AOV, nejnižší konverze (zvážený nákup + price scraping Alza/Datart – Exec talks). Pro malý e-shop těžké.
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
