// Diagnostický engine. "Co když to neprodává?"
//
// Vychází ze stejné logiky jako kalkulačka (návštěvnost × konverze × marže × CAC),
// ale obráceně: vezme TVOJE současná čísla a najde nejslabší článek řetězu,
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
  // VOLITELNÉ. Pro výpočet skutečného čistého zisku.
  // Když zůstanou prázdné (undefined / 0), chová se engine jako dosud a drží honest caveat.
  ownerSalary?: number;    // tvoje měsíční mzda / odměna, kterou si chceš vyplatit (Kč)
  fixedCosts?: number;     // měsíční fixní náklady mimo objednávky (nájem, software, předplatné) (Kč)
  // VOLITELNÉ. Pro hlubší diagnostiku (každé pole zachovává chování "prázdné = jako dosud").
  shippingCost?: number;          // doprava na 1 objednávku (Kč)
  returnRate?: number;            // % vrácených objednávek
  repeatRate?: number;            // % opakovaných zákazníků
  mobileShare?: number;           // % návštěv z mobilu
  mobileConversionRate?: number;  // konverze na mobilu (%)
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
  // skutečný čistý zisk (jen když uživatel doplnil mzdu/fixní náklady)
  hasTrueNetInputs: boolean;  // true, když je vyplněná mzda NEBO fixní náklady
  ownerSalary: number;        // co si chce vyplatit (0 = nevyplněno)
  fixedCosts: number;         // fixní náklady (0 = nevyplněno)
  trueNetProfit: number;      // monthlyNetProfit - ownerSalary - fixedCosts
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
  const ownerSalary = Math.max(0, input.ownerSalary ?? 0);
  const fixedCosts = Math.max(0, input.fixedCosts ?? 0);
  const hasTrueNetInputs = ownerSalary > 0 || fixedCosts > 0;

  const monthlyOrders = Math.round(visitors * (conv / 100));
  const monthlyRevenue = monthlyOrders * aov;
  const profitPerOrder = aov - cogs - extra;
  const grossMargin = aov > 0 ? ((aov - cogs) / aov) * 100 : 0;
  const monthlyGrossProfit = monthlyOrders * profitPerOrder;
  const cac = monthlyOrders > 0 ? marketing / monthlyOrders : 0;
  const monthlyNetProfit = monthlyGrossProfit - marketing;
  const roas = marketing > 0 ? monthlyRevenue / marketing : 0;
  const marketingShare = monthlyRevenue > 0 ? (marketing / monthlyRevenue) * 100 : 0;
  const trueNetProfit = monthlyNetProfit - ownerSalary - fixedCosts;

  const issues: DiagnosticIssue[] = [];

  // 1) Marže / profit per order. Nejzávažnější, když je záporná.
  if (profitPerOrder <= 0) {
    issues.push({
      id: 'margin-negative',
      area: 'margin',
      severity: 'critical',
      title: 'Na každé objednávce prodělává­š',
      finding: `Z jedné objednávky ti po odečtení zboží a nákladů zbyde ${fmtCZK(profitPerOrder)}. To je záporné, čím víc prodáš, tím víc ztratíš.`,
      fix: 'Zvyš cenu, sniž náklady na zboží (vyjednej s dodavatelem, jiné balení), nebo přidej dražší produkty. Marketing teď neřeš, nejdřív musí být objednávka zisková.',
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

  // 2) CAC vs. profit per order. Platíš za zákazníka víc, než na něm vyděláš?
  if (marketing > 0 && monthlyOrders > 0) {
    if (cac >= profitPerOrder && profitPerOrder > 0) {
      issues.push({
        id: 'cac-over-profit',
        area: 'cac',
        severity: 'critical',
        title: 'Marketing tě stojí víc, než na objednávce vyděláš',
        finding: `Získat jednu objednávku tě stojí ${fmtCZK(cac)}, ale čistý zisk z objednávky je jen ${fmtCZK(profitPerOrder)}. Každá placená objednávka je ztrátová.`,
        fix: 'Sniž cenu reklamy (lepší cílení, levnější kanály), zvyš konverzi nebo AOV, nebo se opři o neplacené kanály (Instagram, doporučení, e-mail). Sleduj, jestli se zákazníci vracejí, pak se vyšší CAC vyplatí.',
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
    } else if (marketing > 0 && marketingShare > 0 && marketingShare < 5 && grossMargin >= 40 && visitors < 1500) {
      issues.push({
        id: 'marketing-too-low',
        area: 'cac',
        severity: 'warning',
        title: 'Na marketing dáváš skoro nic',
        finding: `Marketing je jen ${marketingShare.toFixed(0)} % obratu a návštěvnost je nízká. Marže (${grossMargin.toFixed(0)} %) přitom unese víc. Brzdíš si růst.`,
        fix: 'Vyzkoušej malý, ale pravidelný rozpočet do jednoho kanálu (např. 2 000–3 000 Kč/měs do Meta nebo PLA) a sleduj ROAS. Bez přílivu nových lidí poroste obrat jen pomalu.',
        priority: 6
      });
    }
  }

  // 3) Konverze. Chodí lidi, ale nekupují.
  // Pozn.: nízká konverze je „kritická" jen při dost velkém vzorku (>=500 návštěv) a u běžného
  // AOV. U dražšího/rozmýšleného zboží (vysoké AOV) je sub-1 % často normální → jen varování.
  const highAov = aov > avg.averageAOV * 1.3;
  if (visitors >= 500 && conv > 0 && conv < 1.0 && !highAov) {
    issues.push({
      id: 'conversion-low',
      area: 'conversion',
      severity: 'critical',
      title: 'Lidé chodí, ale nekupují',
      finding: `Konverze je ${conv.toFixed(1)} %. Z ${visitors.toLocaleString('cs-CZ')} návštěv vznikne jen ${monthlyOrders} objednávek. Trh: ${avg.averageConversion} %.`,
      fix: 'Zaměř se na: jasné fotky a popisy, důvěru (recenze, kontakt, doprava/vrácení), jednoduchou objednávku bez registrace, rychlost na mobilu. Často je problém v jednom kroku košíku.',
      priority: 2
    });
  } else if (visitors >= 200 && conv > 0 && conv < 1.0) {
    issues.push({
      id: 'conversion-low-soft',
      area: 'conversion',
      severity: 'warning',
      title: 'Konverze je nízká (ale vzorek/obor to změkčuje)',
      finding: `Konverze ${conv.toFixed(1)} %.${highAov ? ' U dražšího zboží s delším rozmýšlením bývá sub-1 % normální.' : ' Vzorek je zatím malý, než z toho budeš dělat závěry, nasbírej víc návštěv.'}`,
      fix: 'Projdi objednávku na mobilu jako zákaznice, přidej recenze a trust prvky. Ale nepanikař, u tvojí návštěvnosti/oboru to ještě nemusí být problém.',
      priority: 6
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

  // 4) Návštěvnost. Máš dobrá čísla, ale málo lidí.
  if (visitors < 500 && conv >= 1.0 && profitPerOrder > 0) {
    issues.push({
      id: 'traffic-low',
      area: 'traffic',
      severity: visitors < 200 ? 'critical' : 'warning',
      title: 'Málo návštěvnosti',
      finding: `Máš jen ${visitors.toLocaleString('cs-CZ')} návštěv měsíčně. Konverze i marže vypadají v pořádku, chybí hlavně lidé. Při téhle konverzi to dělá ${monthlyOrders} objednávek.`,
      fix: 'Tohle je dobrá zpráva: základ funguje, stačí přivést víc lidí. Vyber 1–2 kanály (Instagram/Reels, spolupráce, SEO, placená reklama) a buduj je pravidelně.',
      priority: 3
    });
  }

  // 4b) Žádný marketing + málo lidí. Chybí motor na přivádění návštěvnosti.
  if (marketing === 0 && visitors < 800 && monthlyOrders >= 0) {
    issues.push({
      id: 'no-acquisition',
      area: 'traffic',
      severity: visitors < 300 ? 'critical' : 'warning',
      title: 'Nemáš jak přivádět nové lidi',
      finding: `Marketing je nula a chodí jen ${visitors.toLocaleString('cs-CZ')} lidí měsíčně. Bez stálého přílivu návštěvnosti se prodeje nerozjedou.`,
      fix: 'Vyber si jeden neplacený kanál a buduj ho pravidelně (Instagram/Reels, Pinterest, SEO blog, spolupráce s mikro-influencery). Až bude objednávka zisková, přidej malý placený rozpočet.',
      priority: 3
    });
  }

  // 5) AOV. Nízká hodnota objednávky.
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

  // 6) Skutečný zisk. Vypadá to v plusu, ale po tvé mzdě a fixních nákladech ne.
  // Fire jen když uživatel doplnil mzdu/fixní náklady (jinak by to bylo zavádějící).
  if (hasTrueNetInputs && monthlyOrders > 0) {
    if (monthlyNetProfit > 0 && trueNetProfit <= 0) {
      issues.push({
        id: 'true-net-negative',
        area: 'margin',
        severity: 'critical',
        title: 'Po tvojí mzdě a fixních nákladech jsi v minusu',
        finding: `Po marketingu ti zbývá ${fmtCZK(monthlyNetProfit)}, ale tvoje mzda (${fmtCZK(ownerSalary)}) a fixní náklady (${fmtCZK(fixedCosts)}) jsou dohromady víc. Skutečný čistý zisk je ${fmtCZK(trueNetProfit)}. Zatím to neuživí ani tebe, ani provoz.`,
        fix: 'Tohle je ten nejdůležitější údaj, zatím neřeš detaily reklamy. Potřebuješ víc objednávek (návštěvnost × konverze) nebo vyšší zisk z objednávky (cena, marže, AOV), aby to pokrylo i tvoji mzdu a fixní náklady. Mrkni níž, který článek je nejslabší.',
        priority: 1
      });
    } else if (monthlyNetProfit > 0 && trueNetProfit > 0 && trueNetProfit < ownerSalary * 0.5 && ownerSalary > 0) {
      issues.push({
        id: 'true-net-thin',
        area: 'margin',
        severity: 'warning',
        title: 'Skutečný zisk je tenký',
        finding: `Po tvojí mzdě a fixních nákladech ti zbývá jen ${fmtCZK(trueNetProfit)} měsíčně. To je málo polštář pro horší měsíc, sezónu nebo nečekaný výdaj.`,
        fix: 'Funguje to, ale je to křehké. Zaměř se na opakované nákupy a postupné zvyšování AOV/marže, ať máš rezervu.',
        priority: 4
      });
    } else if (monthlyNetProfit <= 0 && trueNetProfit <= 0) {
      // Už po marketingu jsi v minusu, mzda a fixní náklady to jen prohloubí.
      // Bez tohoto by seznam zůstal prázdný, i když headline hlásí minus.
      issues.push({
        id: 'true-net-negative-pre',
        area: 'margin',
        severity: 'critical',
        title: 'Jsi v minusu už po marketingu, mzda a fixní náklady to zhorší',
        finding: `Po marketingu jsi ${fmtCZK(monthlyNetProfit)} měsíčně. Když přičteš svoji mzdu (${fmtCZK(ownerSalary)}) a fixní náklady (${fmtCZK(fixedCosts)}), skutečný čistý zisk je ${fmtCZK(trueNetProfit)}. Provoz se zatím neuživí.`,
        fix: 'Nejdřív musí být objednávka zisková a obrat musí pokrýt marketing. Potřebuješ víc objednávek (návštěvnost krát konverze) nebo vyšší zisk z objednávky (cena, marže, AOV). Mrkni níž, který článek je nejslabší.',
        priority: 1
      });
    }
  }

  // 6b) Čistý zisk na objednávku je tenký, i když hrubá marže vypadá zdravě.
  // Hrubá marže nepočítá s ostatními náklady na objednávku (extra), čistý zisk na objednávku ano.
  if (aov > 0 && profitPerOrder > 0 && profitPerOrder / aov < 0.15 && grossMargin >= 40) {
    issues.push({
      id: 'net-per-order-thin',
      area: 'margin',
      severity: 'warning',
      title: 'Po všech nákladech zbývá z objednávky málo',
      finding: `Hrubá marže (${grossMargin.toFixed(0)} %) vypadá dobře, ale po ostatních nákladech na objednávku (doprava, balení, poplatky) ti z objednávky čistě zbyde jen ${fmtCZK(profitPerOrder)}, to je ${((profitPerOrder / aov) * 100).toFixed(0)} % z její hodnoty. Tyhle náklady se do hrubé marže nepočítají.`,
      fix: 'Podívej se na ostatní náklady na objednávku. Sniž dopravu (výdejní místa, vyjednání s dopravcem), levnější balení nebo zaveď limit pro dopravu zdarma. Případně zvyš AOV, ať fixní náklady na objednávku váží míň.',
      priority: 5
    });
  }

  // 7) Doprava ukrajuje marži
  const shippingCost = Math.max(0, input.shippingCost ?? 0);
  if (shippingCost > 0 && aov > 0 && shippingCost / aov > 0.15) {
    issues.push({
      id: 'shipping-heavy',
      area: 'margin',
      severity: shippingCost / aov > 0.25 ? 'critical' : 'warning',
      title: 'Doprava sní moc z objednávky',
      finding: `Doprava tě stojí ${fmtCZK(shippingCost)} na objednávku, to je ${((shippingCost / aov) * 100).toFixed(0)} % z průměrné objednávky (${fmtCZK(aov)}). Při nízké hodnotě objednávky to ukousne velkou část zisku.`,
      fix: 'Zaveď limit pro dopravu zdarma (medián trhu ~1 500 Kč) a komunikuj ho v košíku, ať zákaznice dokoupí. Vyjednej levnějšího dopravce nebo nabídni výdejní místa (Zásilkovna), která bývají levnější než kurýr.',
      priority: 5
    });
  }

  // 8) Vysoká vratkovost
  const returnRate = Math.max(0, input.returnRate ?? 0);
  if (returnRate > 0) {
    if (returnRate > 20) {
      issues.push({
        id: 'returns-high',
        area: 'margin',
        severity: 'critical',
        title: 'Hodně objednávek se vrací',
        finding: `Vrací se ${returnRate.toFixed(0)} % objednávek. Každá vratka stojí dopravu tam i zpět, čas a často i znehodnocené zboží. Tvůj reálný zisk je nižší, než ukazuje hrubá marže.`,
        fix: 'Najdi nejčastější důvod vratek (sednutí velikosti, jiná barva než na fotce, poškození při dopravě). Přidej tabulku velikostí, věrnější fotky a videa, recenze s reálnými fotkami. U módy je 20–40 % běžné, ale dá se to stlačit.',
        priority: 3
      });
    } else if (returnRate > 10) {
      issues.push({
        id: 'returns-elevated',
        area: 'margin',
        severity: 'warning',
        title: 'Vratky stojí za pohlídání',
        finding: `Vrací se ${returnRate.toFixed(0)} % objednávek. Není to alarm, ale ukrajuje to ze zisku víc, než se zdá.`,
        fix: 'Sleduj, u kterých produktů se vrací nejvíc, a doplň u nich přesnější popis, velikosti a fotky.',
        priority: 7
      });
    }
  }

  // 9) Nízký podíl opakovaných nákupů
  const repeatRate = Math.max(0, input.repeatRate ?? 0);
  if (repeatRate > 0 && repeatRate < 15 && monthlyOrders >= 20) {
    issues.push({
      id: 'repeat-low',
      area: 'cac',
      severity: 'warning',
      title: 'Zákaznice se skoro nevracejí',
      finding: `Opakovaně nakupuje jen ${repeatRate.toFixed(0)} % zákaznic. To znamená, že za každou objednávku platíš znovu plný marketing, z jednorázových zákaznic se těžko vydělává.`,
      fix: 'Spusť jednoduchý e-mail/SMS po nákupu (poděkování, péče o produkt, sleva na další nákup), nasaď opuštěný košík a věrnostní pobídku. Opakovaný nákup je nejlevnější prodej, jaký máš.',
      priority: 6
    });
  }

  // 10) Mobil chodí, ale nekupuje
  const mobileShare = Math.max(0, input.mobileShare ?? 0);
  const mobileConv = Math.max(0, input.mobileConversionRate ?? 0);
  if (mobileShare >= 50 && mobileConv > 0 && conv > 0 && mobileConv < conv * 0.6) {
    issues.push({
      id: 'mobile-gap',
      area: 'conversion',
      severity: 'critical',
      title: 'Na mobilu se nekupuje',
      finding: `Z mobilu chodí ${mobileShare.toFixed(0)} % lidí, ale konverze na mobilu je jen ${mobileConv.toFixed(1)} % oproti ${conv.toFixed(1)} % celkem. Většina návštěvnosti je na mobilu, a tam to drhne.`,
      fix: 'Projdi si objednávku na vlastním telefonu od produktu po zaplacení. Hledej: malá tlačítka, pomalé načítání, nutnou registraci, špatně se vyplňující formuláře. Zapni Apple Pay / Google Pay a platbu na pár kliků. Tohle je často největší skrytá ztráta.',
      priority: 2
    });
  }

  issues.sort((a, b) => a.priority - b.priority);

  // Když uživatel doplnil mzdu/fixní náklady, "ziskovost" se počítá AŽ po nich (poctivá definice).
  // Když nedoplnil, držíme dosavadní chování (zisk po marketingu) + caveat zůstává.
  const isProfitable = hasTrueNetInputs
    ? trueNetProfit > 0 && profitPerOrder > 0
    : monthlyNetProfit > 0 && profitPerOrder > 0;

  let headline: string;
  if (monthlyOrders === 0) {
    headline = 'Zatím tu nejsou objednávky k diagnóze, doplň reálná (nebo odhadovaná) čísla.';
  } else if (hasTrueNetInputs) {
    // Poctivá definice: po marketingu, mzdě i fixních nákladech.
    if (trueNetProfit > 0 && issues.length === 0) {
      headline = `Po marketingu, tvojí mzdě i fixních nákladech ti reálně zbývá ${fmtCZK(trueNetProfit)} měsíčně. Tohle je už poctivé číslo, drž se toho a škáluj návštěvnost.`;
    } else if (trueNetProfit > 0) {
      headline = `Skutečný čistý zisk (po marketingu, tvojí mzdě i fixních nákladech) je ${fmtCZK(trueNetProfit)}/měs., ale je co zlepšit. Začni nejvyšší prioritou níž.`;
    } else {
      headline = `Po marketingu, tvojí mzdě a fixních nákladech jsi měsíčně v minusu ${fmtCZK(trueNetProfit)}. Níž je seřazené, co řešit jako první.`;
    }
  } else if (isProfitable && issues.length === 0) {
    headline = `Po marketingu ti zbývá ${fmtCZK(monthlyNetProfit)} měsíčně, ale POZOR: ještě před fixními náklady (nájem, nástroje) a tvým časem. Doplň si vlastní mzdu a fixní náklady níž, ať vidíš skutečný zisk. Pak škáluj návštěvnost.`;
  } else if (isProfitable) {
    headline = `Po marketingu ti zbývá ${fmtCZK(monthlyNetProfit)}/měs. (ještě bez fixních nákladů a tvého času), ale je co zlepšit. Začni nejvyšší prioritou níž.`;
  } else {
    headline = `Takhle jsi měsíčně v minusu ${fmtCZK(monthlyNetProfit)}, a to ještě před fixními náklady a tvým časem. Níž je seřazené, co řešit jako první.`;
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
    hasTrueNetInputs,
    ownerSalary,
    fixedCosts,
    trueNetProfit,
    isProfitable,
    headline,
    issues,
    topFix: issues[0] ?? null
  };
}
