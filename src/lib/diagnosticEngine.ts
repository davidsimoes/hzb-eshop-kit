// Diagnostický engine — "Co když to neprodává?"
//
// Vychází ze stejné logiky jako kalkulačka (návštěvnost × konverze × marže × CAC),
// ale obráceně: vezme TVOJE současná čísla a najde nejslabší článek řetězu —
// místo, kde se ztrácí nejvíc peněz. Pak doporučí, co řešit jako první.
//
// Čistá funkce bez závislosti na Reactu, aby se dala snadno testovat i použít
// v promptu pro AI.

import { getAverageMetrics } from '@/data/benchmarks';

export interface DiagnosticInput {
  monthlyVisitors: number; // návštěvnost za měsíc
  conversionRate: number;  // konverze v % (kolik % návštěv vede k objednávce)
  aov: number;             // průměrná hodnota objednávky (Kč)
  cogs: number;            // náklady na zboží v 1 objednávce (Kč)
  extraCosts: number;      // ostatní náklady na objednávku (doprava, balení, poplatky)
  monthlyMarketing: number; // měsíční výdaje na marketing (Kč)
}

export type IssueSeverity = 'critical' | 'warning' | 'ok';

export interface DiagnosticIssue {
  id: string;
  area: 'traffic' | 'conversion' | 'margin' | 'cac' | 'aov';
  severity: IssueSeverity;
  title: string;
  finding: string;       // co se děje (s čísly)
  fix: string;           // co s tím
  priority: number;      // 1 = řešit první
}

export interface DiagnosticResult {
  // odvozená čísla
  monthlyOrders: number;
  monthlyRevenue: number;
  profitPerOrder: number;
  grossMargin: number;        // %
  monthlyGrossProfit: number; // před marketingem
  cac: number;                // náklad na získání 1 objednávky
  monthlyNetProfit: number;   // po marketingu
  roas: number;
  marketingShare: number;     // % marketingu z obratu
  // diagnóza
  isProfitable: boolean;
  headline: string;
  issues: DiagnosticIssue[];  // seřazené podle priority
  topFix: DiagnosticIssue | null;
}

const fmtCZK = (n: number) =>
  new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }).format(
    Math.round(n)
  );

export function diagnose(input: DiagnosticInput): DiagnosticResult {
  const avg = getAverageMetrics();
  const visitors = Math.max(0, input.monthlyVisitors);
  const conv = Math.max(0, input.conversionRate);
  const aov = Math.max(0, input.aov);
  const cogs = Math.max(0, input.cogs);
  const extra = Math.max(0, input.extraCosts);
  const marketing = Math.max(0, input.monthlyMarketing);

  const monthlyOrders = Math.round(visitors * (conv / 100));
  const monthlyRevenue = monthlyOrders * aov;
  const profitPerOrder = aov - cogs - extra;
  const grossMargin = aov > 0 ? ((aov - cogs) / aov) * 100 : 0;
  const monthlyGrossProfit = monthlyOrders * profitPerOrder;
  const cac = monthlyOrders > 0 ? marketing / monthlyOrders : 0;
  const monthlyNetProfit = monthlyGrossProfit - marketing;
  const roas = marketing > 0 ? monthlyRevenue / marketing : 0;
  const marketingShare = monthlyRevenue > 0 ? (marketing / monthlyRevenue) * 100 : 0;

  const issues: DiagnosticIssue[] = [];

  // 1) Marže / profit per order — nejzávažnější, když je záporná
  if (profitPerOrder <= 0) {
    issues.push({
      id: 'margin-negative',
      area: 'margin',
      severity: 'critical',
      title: 'Na každé objednávce prodělává­š',
      finding: `Z jedné objednávky ti po odečtení zboží a nákladů zbyde ${fmtCZK(profitPerOrder)}. To je záporné — čím víc prodáš, tím víc ztratíš.`,
      fix: 'Zvyš cenu, sniž náklady na zboží (vyjednej s dodavatelem, jiné balení), nebo přidej dražší produkty. Marketing teď neřeš — nejdřív musí být objednávka zisková.',
      priority: 1
    });
  } else if (grossMargin < 25) {
    issues.push({
      id: 'margin-thin',
      area: 'margin',
      severity: 'critical',
      title: 'Příliš tenká marže',
      finding: `Hrubá marže je ${grossMargin.toFixed(0)} %. Pod ~25 % je málo prostoru zaplatit marketing, dopravu a něco si vydělat. Trh: ${avg.averageMargin} %.`,
      fix: 'Zvyš cenu o 10–20 % a sleduj, jestli to ovlivní prodej (často ne). Vyjednej lepší nákup. Zaměř se na produkty s vyšší marží.',
      priority: 2
    });
  } else if (grossMargin < 40) {
    issues.push({
      id: 'margin-low',
      area: 'margin',
      severity: 'warning',
      title: 'Marže je spíš nižší',
      finding: `Hrubá marže ${grossMargin.toFixed(0)} % je pod průměrem trhu (${avg.averageMargin} %). Funguje to, ale na marketing zbývá málo.`,
      fix: 'Postupně testuj vyšší ceny a bundly (víc produktů v jedné objednávce zvedne marži i AOV).',
      priority: 5
    });
  }

  // 2) CAC vs. profit per order — platíš za zákazníka víc, než na něm vyděláš?
  if (marketing > 0 && monthlyOrders > 0) {
    if (cac >= profitPerOrder && profitPerOrder > 0) {
      issues.push({
        id: 'cac-over-profit',
        area: 'cac',
        severity: 'critical',
        title: 'Marketing tě stojí víc, než na objednávce vyděláš',
        finding: `Získat jednu objednávku tě stojí ${fmtCZK(cac)}, ale čistý zisk z objednávky je jen ${fmtCZK(profitPerOrder)}. Každá placená objednávka je ztrátová.`,
        fix: 'Sniž cenu reklamy (lepší cílení, levnější kanály), zvyš konverzi nebo AOV, nebo se opři o neplacené kanály (Instagram, doporučení, e-mail). Sleduj, jestli se zákazníci vracejí — pak se vyšší CAC vyplatí.',
        priority: 1
      });
    } else if (marketingShare > 30) {
      issues.push({
        id: 'marketing-too-high',
        area: 'cac',
        severity: 'warning',
        title: 'Marketing ukrajuje moc z obratu',
        finding: `Marketing je ${marketingShare.toFixed(0)} % obratu (ROAS ${roas.toFixed(1)}). Nad ~25–30 % bývá těžké být v zisku.`,
        fix: 'Zlepši ROAS (cílení, kreativy), nebo přesuň část rozpočtu do neplacených kanálů a opakovaných nákupů.',
        priority: 4
      });
    }
  }

  // 3) Konverze — chodí lidi, ale nekupují
  if (visitors >= 200 && conv > 0 && conv < 1.0) {
    issues.push({
      id: 'conversion-low',
      area: 'conversion',
      severity: 'critical',
      title: 'Lidé chodí, ale nekupují',
      finding: `Konverze je ${conv.toFixed(1)} %. Z ${visitors.toLocaleString('cs-CZ')} návštěv vznikne jen ${monthlyOrders} objednávek. Trh: ${avg.averageConversion} %.`,
      fix: 'Zaměř se na: jasné fotky a popisy, důvěru (recenze, kontakt, doprava/vrácení), jednoduchou objednávku bez registrace, rychlost na mobilu. Často je problém v jednom kroku košíku.',
      priority: 2
    });
  } else if (conv > 0 && conv < avg.averageConversion * 0.7) {
    issues.push({
      id: 'conversion-below',
      area: 'conversion',
      severity: 'warning',
      title: 'Konverze pod průměrem',
      finding: `Konverze ${conv.toFixed(1)} % je znatelně pod průměrem (${avg.averageConversion} %). Je tu prostor získat víc objednávek beze změny návštěvnosti.`,
      fix: 'Projdi objednávkový proces na mobilu jako zákaznice. Přidej recenze a trust prvky. Zjednoduš košík.',
      priority: 6
    });
  }

  // 4) Návštěvnost — máš dobrá čísla, ale málo lidí
  if (visitors < 500 && conv >= 1.0 && profitPerOrder > 0) {
    issues.push({
      id: 'traffic-low',
      area: 'traffic',
      severity: visitors < 200 ? 'critical' : 'warning',
      title: 'Málo návštěvnosti',
      finding: `Máš jen ${visitors.toLocaleString('cs-CZ')} návštěv měsíčně. Konverze i marže vypadají v pořádku — chybí hlavně lidé. Při téhle konverzi to dělá ${monthlyOrders} objednávek.`,
      fix: 'Tohle je dobrá zpráva: základ funguje, stačí přivést víc lidí. Vyber 1–2 kanály (Instagram/Reels, spolupráce, SEO, placená reklama) a buduj je pravidelně.',
      priority: 3
    });
  }

  // 5) AOV — nízká hodnota objednávky
  if (aov > 0 && aov < avg.averageAOV * 0.6) {
    issues.push({
      id: 'aov-low',
      area: 'aov',
      severity: 'warning',
      title: 'Nízká hodnota objednávky',
      finding: `Průměrná objednávka je ${fmtCZK(aov)}, hodně pod průměrem (${fmtCZK(avg.averageAOV)}). Při nízkém AOV je těžké zaplatit dopravu i marketing.`,
      fix: 'Přidej bundly a sady, „k tomu se hodí“ doporučení, limit pro dopravu zdarma (např. nad 1 500 Kč). Zvedne to tržby beze změny návštěvnosti.',
      priority: 7
    });
  }

  issues.sort((a, b) => a.priority - b.priority);

  const isProfitable = monthlyNetProfit > 0 && profitPerOrder > 0;

  let headline: string;
  if (monthlyOrders === 0) {
    headline = 'Zatím tu nejsou objednávky k diagnóze — doplň reálná (nebo odhadovaná) čísla.';
  } else if (isProfitable && issues.length === 0) {
    headline = `Vypadá to zdravě: čistý zisk ${fmtCZK(monthlyNetProfit)} měsíčně. Drž se toho a škáluj návštěvnost.`;
  } else if (isProfitable) {
    headline = `Jsi v plusu (${fmtCZK(monthlyNetProfit)}/měs.), ale je co zlepšit. Začni nejvyšší prioritou níž.`;
  } else {
    headline = `Takhle jsi měsíčně v minusu ${fmtCZK(monthlyNetProfit)}. Níž je seřazené, co řešit jako první.`;
  }

  return {
    monthlyOrders,
    monthlyRevenue,
    profitPerOrder,
    grossMargin,
    monthlyGrossProfit,
    cac,
    monthlyNetProfit,
    roas,
    marketingShare,
    isProfitable,
    headline,
    issues,
    topFix: issues[0] ?? null
  };
}
