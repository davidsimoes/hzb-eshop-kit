/**
 * Rozhodovací engine pro výběr e-shop platformy (CZ trh, 2026).
 *
 * Záměrně NEjde o jednoduchý strom "odpověď -> štítek". Místo toho každá
 * odpověď přidává (nebo ubírá) vážené body jednotlivým platformám. Výsledek
 * je tedy skóre napříč všemi platformami, ze kterého vznikne hlavní
 * doporučení + druhá nejlepší varianta + transparentní "proč".
 *
 * Tím se z toy-like stromu stává nuancovaný model, který odráží reálné
 * kompromisy českého e-commerce trhu (lokální integrace vs. expanze,
 * technická náročnost vs. cena, marketplace jako validace poptávky atd.).
 *
 * Datové ukotvení (2026):
 *  - Shoptet: dominantní CZ SaaS (~43 000+ aktivních e-shopů, pod skupinou Team.blue),
 *    nativní Heureka/Zboží.cz/Balíkovna/Zásilkovna/účetnictví, česká podpora,
 *    free trial; slabší na expanzi a hodně atypický design.
 *  - Shopify: nejlepší na růst/design/expanzi; v ČR Shopify Payments funguje
 *    (karty, Apple/Google Pay); na SK zatím ne, část CZ integrací přes aplikace; dražší.
 *  - Upgates: česká alternativa, dobré CZ integrace, mid-market.
 *  - WooCommerce: levná licence, ale vlastní hosting/bezpečnost/aktualizace
 *    (skrytý náklad + nutná technická pohoda).
 *  - Wix/Squarespace: nejjednodušší na malý/portfolio shop, slabé CZ
 *    logistické a účetní integrace.
 *  - Marketplace (Aukro/Allegro/Instagram/FB): nejnižší bariéra, ideální na
 *    ověření poptávky před stavbou vlastního e-shopu.
 */

export type PlatformKey =
  | 'shoptet'
  | 'shopify'
  | 'upgates'
  | 'woocommerce'
  | 'builder'
  | 'marketplace';

export interface Platform {
  key: PlatformKey;
  name: string;
  /** Jednovětá pozice */
  tagline: string;
  /** Orientační měsíční náklad v CZK (textově, ať to sedí na realitu) */
  monthlyCost: string;
  /** Co umí dobře (krátké, lidské body) */
  strengths: string[];
  /** Na co si dát pozor (poctivý caveat) */
  watchOut: string;
  /** První konkrétní krok */
  nextStep: string;
}

export const PLATFORMS: Record<PlatformKey, Platform> = {
  shoptet: {
    key: 'shoptet',
    name: 'Shoptet',
    tagline: 'Nejrozšířenější česká platforma. Všechno pro český trh máš rovnou v sobě.',
    monthlyCost: '440 až 2 500 Kč / měsíc (+ Free verze)',
    strengths: [
      'Nativní napojení na Heureku, Zboží.cz, Zásilkovnu i Balíkovnu',
      'České platební brány (Comgate, GoPay), dobírka i česká faktura v základu',
      'Česká podpora, čeština všude a obrovská česká komunita (přes 43 000 aktivních e-shopů)'
    ],
    watchOut:
      'Na prodej za hranice a hodně atypický design je méně ohebný než Shopify. Hodí se hlavně, dokud zůstáváš na českém a slovenském trhu.',
    nextStep: 'Založ si zkušební účet na shoptet.cz, je zdarma a bez závazku.'
  },
  shopify: {
    key: 'shopify',
    name: 'Shopify',
    tagline: 'Nejsilnější platforma na růst, značku a prodej za hranice.',
    monthlyCost: '800 až 2 500 Kč / měsíc (plus aplikace)',
    strengths: [
      'Nejlepší základ pro silnou značku, krásný design a rychlý růst',
      'Obrovský výběr aplikací a šablon, snadno přidáš jazyky a měny',
      'Poroste s tebou až do velkého obchodu, nemusíš se nikam stěhovat'
    ],
    watchOut:
      'Shopify Payments v ČR funguje. České brány jako Comgate nebo GoPay přidáš pro dobírku, převod nebo lokální metody. Na Slovensku Shopify Payments zatím není. Část českých věcí (třeba Zásilkovnu) přidáš přes aplikace. Podpora je hlavně anglicky a měsíčně vyjde dráž.',
    nextStep: 'Spusť si zkušební verzi na shopify.com, plány jdou platit i v CZK.'
  },
  upgates: {
    key: 'upgates',
    name: 'Upgates',
    tagline: 'Česká alternativa k Shoptetu. Silné lokální integrace, prostor pro úpravy.',
    monthlyCost: '450 až 3 250 Kč / měsíc',
    strengths: [
      'České integrace (Heureka, Zboží.cz, Zásilkovna, účetnictví) v základu',
      'Nativní vícejazyčnost a více měn — skvělé pro expanzi do zahraničí',
      'Solidní B2B funkce: velkoobchodní ceny, ceníky pro různé skupiny zákazníků',
      'Česká podpora a slušný poměr cena / výkon pro rostoucí obchod'
    ],
    watchOut:
      'Komunita a výběr šablon jsou menší než u Shoptetu. Je to skvělá volba, když ti Shoptet přijde těsný, ale na Shopify zatím nechceš.',
    nextStep: 'Vyzkoušej si zkušební verzi na upgates.cz a porovnej ji se Shoptetem.'
  },
  woocommerce: {
    key: 'woocommerce',
    name: 'WooCommerce',
    tagline: 'Zdarma a neomezené, ale server, bezpečnost a aktualizace si hlídáš sama.',
    monthlyCost: '200 až 800 Kč / měsíc (hosting) plus tvůj čas',
    strengths: [
      'Licence je zdarma a možnosti úprav jsou prakticky neomezené',
      'Obrovská knihovna pluginů, postavíš si přesně co potřebuješ',
      'Nikomu neplatíš podíl z tržeb ani drahý měsíční tarif'
    ],
    watchOut:
      'Hosting, bezpečnost, rychlost i aktualizace jsou na tobě. Bez technické pohody nebo vývojáře se skrytý náklad (čas i starosti) snadno prodraží víc než placená platforma.',
    nextStep: 'Jdi do toho jen s vývojářem nebo zkušeností s WordPressem, jinak zvol Shoptet nebo Upgates.'
  },
  builder: {
    key: 'builder',
    name: 'Wix a Squarespace',
    tagline: 'Uděláš si hezký web a malý obchod sama, klikáním a bez programátora.',
    monthlyCost: '300 až 700 Kč / měsíc',
    strengths: [
      'Postavíš si web i obchod klikáním, opravdu během odpoledne',
      'Hezké šablony, hodí se na pár produktů, služby nebo portfolio',
      'Vše na jednom místě, nemusíš nic technicky řešit'
    ],
    watchOut:
      'Pro vážnější český e-shop je slabší: české logistické a účetní integrace (Zásilkovna, Heureka, účetnictví) chybí nebo se dolepují těžko. Dobré na rozjezd, ne na velký růst.',
    nextStep: 'Zkus si zkušební verzi na wix.com nebo squarespace.com a postav si první stránku.'
  },
  marketplace: {
    key: 'marketplace',
    name: 'Tržiště (Aukro, Allegro, Instagram a Facebook shop)',
    tagline: 'Nejnižší bariéra. Ověř poptávku dřív, než postavíš vlastní e-shop.',
    monthlyCost: '0 Kč na start (platíš podíl nebo provizi z prodeje)',
    strengths: [
      'Začneš během pár hodin, bez webu a bez techniky',
      'Hned se dostaneš k lidem, kteří už nakupují (hotové publikum)',
      'Levně si ověříš, jestli o tvůj produkt vůbec je zájem'
    ],
    watchOut:
      'Nevlastníš zákaznická data, soutěžíš cenou a platíš provizi. Skvělé jako první krok nebo doplněk, ale dlouhodobě chceš vlastní e-shop, kde si buduješ značku.',
    nextStep: 'Nabídni pár kusů na Aukru, Allegru nebo přes Instagram a sleduj, co se prodá.'
  }
};

/* ------------------------------------------------------------------ */
/* Otázky a váhy                                                       */
/* ------------------------------------------------------------------ */

export type AnswerWeights = Partial<Record<PlatformKey, number>>;

export interface AnswerOption {
  id: string;
  label: string;
  hint?: string;
  /** Body, které tahle odpověď přidá (nebo ubere) jednotlivým platformám */
  weights: AnswerWeights;
  /** Krátký důvod použitý ve výsledku ("protože jsi řekla, že...") */
  rationale?: string;
}

export interface EngineQuestion {
  id: string;
  q: string;
  intro?: string;
  options: AnswerOption[];
}

/**
 * 6 otázek, které opravdu rozlišují. Pořadí je od nejvíc rozhodujícího
 * (rozpočet + technika + kde prodávám) po jemnější (CZ integrace, B2B,
 * ambice/expanze).
 */
export const ENGINE_QUESTIONS: EngineQuestion[] = [
  {
    id: 'stage',
    q: 'Kde jsi teď se svým nápadem?',
    intro: 'Tohle je nejdůležitější. Jiné řešení dává smysl na ověření nápadu a jiné, když už prodáváš.',
    options: [
      {
        id: 'idea',
        label: 'Mám nápad, ale ještě nevím, jestli o to bude zájem',
        hint: 'Chci to nejdřív levně vyzkoušet.',
        weights: { marketplace: 5, builder: 3, shoptet: 1 },
        rationale: 'chceš nejdřív ověřit poptávku, ne hned stavět velký obchod'
      },
      {
        id: 'starting',
        label: 'Začínám prodávat naostro a chci to brát vážně',
        hint: 'Potřebuju stabilní základ, na kterém můžu stavět.',
        weights: { shoptet: 3, upgates: 2, shopify: 2, builder: 1 },
        rationale: 'začínáš naostro a chceš stabilní základ'
      },
      {
        id: 'running',
        label: 'Už prodávám a chci to posunout výš',
        hint: 'Mám první prodeje a řeším růst nebo přechod jinam.',
        weights: { shopify: 3, upgates: 2, shoptet: 1 },
        rationale: 'už prodáváš a jdeš po růstu'
      }
    ]
  },
  {
    id: 'tech',
    q: 'Jak jsi na tom s technikou?',
    intro: 'Buď k sobě upřímná. Není ostuda chtít to jednoduché.',
    options: [
      {
        id: 'clicks',
        label: 'Chci klikat, ne programovat',
        hint: 'Potřebuju hotové řešení, kde si jen nastavím své věci.',
        weights: { shoptet: 3, builder: 3, marketplace: 2, shopify: 1, woocommerce: -3 },
        rationale: 'chceš klikat, ne řešit techniku'
      },
      {
        id: 'guided',
        label: 'Zvládnu nastavení podle srozumitelného návodu',
        hint: 'Trochu si pohraju, když je k tomu jasný postup.',
        weights: { shopify: 2, upgates: 3, shoptet: 2, builder: 1 },
        rationale: 'zvládneš nastavení podle návodu'
      },
      {
        id: 'techy',
        label: 'Nebojím se techniky nebo mám vývojáře',
        hint: 'Server, kód a vlastní úpravy mě neodradí.',
        weights: { woocommerce: 5, shopify: 2, upgates: 1 },
        rationale: 'technika ti nedělá problém'
      }
    ]
  },
  {
    id: 'budget',
    q: 'Kolik chceš na začátku měsíčně dávat za platformu?',
    intro: 'Mysli jen na samotnou platformu, ne na reklamu nebo zboží.',
    options: [
      {
        id: 'minimal',
        label: 'Co nejmíň, ideálně skoro nic',
        hint: 'Začínám a každá koruna se počítá.',
        weights: { marketplace: 4, woocommerce: 3, builder: 3, shoptet: 1 },
        rationale: 'chceš začít s minimálními náklady'
      },
      {
        id: 'moderate',
        label: 'Pár stovek až nižší tisíce, když to bude dávat smysl',
        hint: 'Investuju rozumně do dobrého základu.',
        weights: { shoptet: 3, upgates: 2, shopify: 2, builder: 1 },
        rationale: 'jsi ochotná rozumně investovat do dobrého základu'
      },
      {
        id: 'invest',
        label: 'Klidně víc, hlavně ať to roste a vypadá skvěle',
        hint: 'Cena není hlavní, hraje roli kvalita a růst.',
        weights: { shopify: 4, upgates: 3, shoptet: 1 },
        rationale: 'cena pro tebe není hlavní, jde ti o kvalitu a růst'
      }
    ]
  },
  {
    id: 'market',
    q: 'Kdo jsou hlavně tvoji zákazníci?',
    intro: 'Tohle rozhodne, jak moc potřebuješ české integrace, nebo naopak svět.',
    options: [
      {
        id: 'cz',
        label: 'Hlavně Češi a Slováci',
        hint: 'Moji zákazníci jsou tady doma.',
        weights: { shoptet: 4, upgates: 3, marketplace: 1, shopify: -1 },
        rationale: 'prodáváš hlavně v Česku a na Slovensku'
      },
      {
        id: 'cz_plus',
        label: 'Začínám v Česku, ale chci časem za hranice',
        hint: 'Teď CZ a SK, výhled je širší.',
        weights: { shopify: 3, upgates: 2, shoptet: 1 },
        rationale: 'začínáš v Česku, ale myslíš i na zahraničí'
      },
      {
        id: 'global',
        label: 'Hlavně zahraničí nebo cizinci',
        hint: 'Prodávám hlavně mimo Česko, často anglicky.',
        weights: { shopify: 5, builder: 1, shoptet: -2 },
        rationale: 'míříš hlavně na zahraniční zákazníky'
      }
    ]
  },
  {
    id: 'czfeatures',
    q: 'Jak moc potřebuješ české vychytávky?',
    intro: 'Třeba srovnávače (Heureka, Zboží.cz), Zásilkovnu a Balíkovnu, dobírku nebo napojení na české účetnictví.',
    options: [
      {
        id: 'must',
        label: 'Bez nich to nedává smysl',
        hint: 'Srovnávače a Zásilkovna jsou pro mě základ.',
        weights: { shoptet: 4, upgates: 3, builder: -2, shopify: -1 },
        rationale: 'české integrace (Heureka, Zásilkovna, dobírka) jsou pro tebe nutnost'
      },
      {
        id: 'nice',
        label: 'Hodily by se, ale nejsou podmínka',
        hint: 'Časem ano, na startu to přežiju.',
        weights: { upgates: 3, shoptet: 2, shopify: 1 },
        rationale: 'české integrace bereš jako příjemné plus, ne podmínku'
      },
      {
        id: 'no',
        label: 'Moc je řešit nemusím',
        hint: 'Buď je nepotřebuju, nebo prodávám do zahraničí.',
        weights: { shopify: 2, builder: 2, marketplace: 1, woocommerce: 1 },
        rationale: 'české integrace pro tebe nejsou klíčové'
      }
    ]
  },
  {
    id: 'ambition',
    q: 'Co prodáváš a kam to chceš dotáhnout?',
    intro: 'Pomůže to doladit, jestli sázet na jednoduchost, nebo na prostor pro růst.',
    options: [
      {
        id: 'small',
        label: 'Pár produktů nebo služby, v klidu a malém',
        hint: 'Nechci z toho hned korporát.',
        weights: { builder: 3, marketplace: 2, shoptet: 1 },
        rationale: 'chceš to mít v klidu a v menším měřítku'
      },
      {
        id: 'catalog',
        label: 'Větší sortiment fyzického zboží pro koncové zákazníky',
        hint: 'Klasický e-shop s víc produkty.',
        weights: { shoptet: 2, upgates: 2, shopify: 2 },
        rationale: 'plánuješ klasický e-shop s větším sortimentem'
      },
      {
        id: 'scale_b2b',
        label: 'Velké ambice nebo prodej i firmám (B2B)',
        hint: 'Chci růst, expandovat nebo prodávat i velkoodběratelům.',
        weights: { shopify: 3, upgates: 3, shoptet: 1, woocommerce: 1 },
        rationale: 'máš velké ambice nebo prodej i firmám (B2B)'
      }
    ]
  }
];

export const TOTAL_STEPS = ENGINE_QUESTIONS.length;

/* ------------------------------------------------------------------ */
/* Výpočet doporučení                                                 */
/* ------------------------------------------------------------------ */

export interface ScoredPlatform {
  platform: Platform;
  score: number;
  /** procentuální "shoda" vůči nejlepšímu skóre (0-100) pro vizuál */
  matchPct: number;
}

export interface EngineResult {
  primary: ScoredPlatform;
  runnerUp: ScoredPlatform | null;
  /** seřazené pořadí všech platforem (na transparentnost) */
  ranking: ScoredPlatform[];
  /** lidsky formulované důvody navázané na konkrétní odpovědi */
  reasons: string[];
  /** true, pokud je rozdíl mezi 1. a 2. malý (těsné rozhodnutí) */
  isClose: boolean;
}

export type Answers = Record<string, string>;

/**
 * Spočítá skóre všech platforem z odpovědí a vrátí strukturovaný výsledek.
 * Odpovědi jsou mapa { questionId: optionId }.
 */
export function computeRecommendation(answers: Answers): EngineResult {
  const scores: Record<PlatformKey, number> = {
    shoptet: 0,
    shopify: 0,
    upgates: 0,
    woocommerce: 0,
    builder: 0,
    marketplace: 0
  };

  const reasonsForTop: { key: PlatformKey; text: string }[] = [];

  for (const question of ENGINE_QUESTIONS) {
    const chosenId = answers[question.id];
    if (!chosenId) continue;
    const option = question.options.find((o) => o.id === chosenId);
    if (!option) continue;

    for (const [key, pts] of Object.entries(option.weights) as [PlatformKey, number][]) {
      scores[key] += pts;
    }
    if (option.rationale) {
      reasonsForTop.push({ key: topWeightKey(option.weights), text: option.rationale });
    }
  }

  const ranking: ScoredPlatform[] = (Object.keys(scores) as PlatformKey[])
    .map((key) => ({ platform: PLATFORMS[key], score: scores[key], matchPct: 0 }))
    .sort((a, b) => b.score - a.score);

  const topScore = ranking[0].score;
  // matchPct: relativní shoda vůči vítězi (jen pro vizuál, ne věda)
  for (const r of ranking) {
    r.matchPct = topScore > 0 ? Math.round((r.score / topScore) * 100) : 0;
  }

  const primary = ranking[0];
  const runnerUp = ranking[1] && ranking[1].score > 0 ? ranking[1] : null;
  const isClose = !!runnerUp && primary.score - runnerUp.score <= 2;

  // Vyber 2-3 nejrelevantnější důvody: ty, které nahrávaly vítězi.
  const winningReasons = reasonsForTop
    .filter((r) => r.key === primary.platform.key)
    .map((r) => r.text);
  // Doplň o obecné důvody, pokud by vítězovi přímo nahrávalo míň než 2.
  const fallbackReasons = reasonsForTop.map((r) => r.text);
  const reasons = (winningReasons.length >= 2 ? winningReasons : fallbackReasons).slice(0, 3);

  return { primary, runnerUp, ranking, reasons, isClose };
}

/** Najde platformu, které daná odpověď nahrává nejvíc (pro přiřazení důvodu). */
function topWeightKey(weights: AnswerWeights): PlatformKey {
  let best: PlatformKey = 'shoptet';
  let bestVal = -Infinity;
  for (const [key, val] of Object.entries(weights) as [PlatformKey, number][]) {
    if (val > bestVal) {
      bestVal = val;
      best = key;
    }
  }
  return best;
}
