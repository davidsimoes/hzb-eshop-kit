import { useState, useEffect, useCallback } from 'react';
import { MetaTags } from '@/components/SEO/MetaTags';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Calculator,
  Stethoscope,
  ShoppingBag,
  Sparkles,
  Layers,
  Heart,
  AlertTriangle,
  Presentation,
  TrendingUp,
  ClipboardList
} from 'lucide-react';

// Slim demo-led deck: open + menu -> content blocks -> tool slides -> close.
// Controls: arrows / space. Demo cue = when to switch to the live tool.
// Deep-link a slide with ?s=N.

interface Slide {
  id: string;
  kicker?: string;
  title: string;
  bullets?: string[];
  menuItems?: string[];   // rendered as a numbered grid (menu variant)
  menuSlugs?: string[];   // optional per-item guide slugs (parallel to menuItems)
  demo?: { label: string; to: string; external?: boolean };
  demoSecondary?: { label: string; to: string; external?: boolean };
  icon?: typeof Lightbulb;
  variant?: 'title' | 'menu' | 'block' | 'plain' | 'tool' | 'close';
  logos?: boolean;
  qr?: string;
  qrLabel?: string;
  qr2?: string;
  qr2Label?: string;
  slidoCode?: string;
}

// Same logo set as the site (ClientLogos)
const DECK_LOGOS = [
  ['/images/clients/yoggies.svg', 'Yoggies'],
  ['/images/clients/mana.svg', 'MANA'],
  ['/images/clients/wild-coco.svg', 'Wild & Coco'],
  ['/images/clients/eta.svg', 'ETA'],
  ['/images/clients/tepe.svg', 'TePe'],
  ['/images/clients/bloom-robbins.svg', 'Bloom Robbins'],
  ['/images/clients/econea.svg', 'Econea'],
  ['/images/clients/tonak.svg', 'TONAK'],
  ['/images/clients/pavlinek.svg', 'Pavlínek']
];

const slides: Slide[] = [
  {
    id: 'title',
    variant: 'title',
    title: 'E-shop, který vydělává',
    kicker: '#HolkyzByznysu · školení s Davidem',
    bullets: ['Praktické nástroje + kit, který ti zůstane.', 'Dnes spustíme nápad, ne jen prezentaci.'],
    slidoCode: '#2754067',
    qr: '/images/qr-slido.svg',
    qrLabel: 'Naskenuj a připoj se do sli.do (otázky)',
    icon: ShoppingBag
  },
  {
    id: 'kdo',
    variant: 'plain',
    kicker: 'Krátce o mně',
    title: 'Z čeho čerpám',
    bullets: [
      '10+ let v e-commerce, stovky e-shopů od start-upů po firmy s obratem přes 3 mld. Kč.',
      'Zakladatel Sounds Good Agency, první Shopify agentury v ČR a na Slovensku.',
      'U klientů jsem viděl fungovat různé cesty: Mana (jedna z prvních firem v ČR s předplatným na spotřební zboží), TePe USA (přístup KISS, drž to jednoduché), ETA (čisté B2B), Erotic City (omnichannel), Galleria Armadoro (DTC) i Fabini (pro start-up je klíčové umět včas změnit směr).',
      'A poučil jsem se i z chyb, svých i klientských: u klienta Okay Elektro (nikdo není „too big to fail“), u klienta Sofsy (perfekcionismus je nepřítel dokončené práce) a u prvních e-shopů, na kterých jsem dělal (čísla jsou základ).',
      'Vím, jak vypadá start zevnitř, a ty pochybnosti znám taky. Dnes ti předám zkratky, co šetří peníze i nervy.'
    ],
    logos: true,
    icon: Heart
  },
  {
    id: 'realita',
    variant: 'block',
    kicker: 'Realita trhu 2026',
    title: 'Špatná zpráva (a proč tě to nemělo odradit)',
    bullets: [
      'Česká e-commerce loni vyrostla o 6 %, ale TOP 100 e-shopů rostlo o 14 %. Velcí dál vytlačují malé a Češi utratili online přes 206 miliard Kč.',
      'Sílí zahraniční konkurence: Temu se probojovalo do TOP 10 a čínská tržiště už sebrala českým e-shopům kolem 15 % tržeb, k tomu Shein, AliExpress a Allegro, všichni tlačí ceny dolů.',
      'I bývalí velikáni zmizeli (Mall, CZC, Okay). Trh se konsoliduje a cenou ani sortimentem ho jako malá nikdy neporazíš.',
      'A teď to dobré: nemusíš. Vyhraješ zaměřením na úzkou niku, komunitu, příběh a osobní službu, tedy přesně tím, co velký hráč neumí.',
      'Právě proto je dnes důležitější než kdy dřív ověřit poptávku, najít svou niku a hlídat čísla. Ne prodávat všechno všem.'
    ],
    icon: TrendingUp
  },
  {
    id: 'menu',
    variant: 'menu',
    kicker: 'Tvůj kit má 6 hlavních oblastí (+ úvod a příběhy)',
    title: 'Dnešní menu',
    menuItems: [
      'Validace nápadu',
      'Výběr platformy',
      'Spuštění a právo',
      'Marketing a značka',
      'Provoz a finance',
      'Když to neprodává'
    ],
    menuSlugs: [
      '/pruvodce/validace',
      '/pruvodce/vyber-platformy',
      '/pruvodce/spusteni-a-pravo',
      '/pruvodce/marketing-a-znacka',
      '/pruvodce/provoz-a-finance',
      '/pruvodce/kdyz-to-neprodava'
    ],
    bullets: [
      'Všech 6 oblastí máš v kitu, který si odneseš. Dnes jdeme do hloubky na 3: Validace, Platforma a Diagnostika, plus kamkoli mě zatáhneš.',
      'Vím, co tě zajímá nejvíc: jak vybrat platformu, jak vůbec začít a jak se vyhnout nejčastějším chybám. Přesně to dnes projdeme.'
    ],
    icon: Layers
  },
  {
    id: 'chyby',
    variant: 'block',
    kicker: 'Než se vrhneme do toho',
    title: '3 nejdražší chyby začátečnic',
    bullets: [
      'Špatná platforma „protože ji má kamarádka“, místo té, co sedí tvému byznysu.',
      'Produkt bez ověření, že o něj někdo cizí (ne rodina) opravdu stojí a zaplatí.',
      'Žádná čísla. Marže, doprava a marketing nevyjdou dohromady, takže čím víc prodáš, tím víc proděláš.'
    ],
    icon: AlertTriangle
  },
  {
    id: 'block1',
    variant: 'block',
    kicker: 'Blok 1 · Validace',
    title: 'Ověř, než utratíš',
    bullets: [
      'Tři otázky: Komu prodávám? Proč ode mě? Vydělá to?',
      'Persona = jedna konkrétní zákaznice, ne „ženy 25 až 45“.',
      'Ověř levně: 5 rozhovorů (ne s rodinou), poptávka, konkurence, 1 signál, že zaplatí cizí člověk.'
    ],
    demo: { label: 'Živě: Ověř nápad', to: '/validace' },
    icon: Lightbulb
  },
  {
    id: 'kalkulacka-tool',
    variant: 'tool',
    kicker: 'Nástroj · Kalkulačka',
    title: 'Spočítej, jestli to vydělá',
    bullets: [
      'Kolik objednávek a návštěv potřebuješ, aby sis splnila svůj příjmový cíl.',
      'Počítá tvůj čas a výdělek, nejen pokrytí nákladů na zboží.',
      'Porovnání tvých čísel s benchmarky oboru pro rok 2026.'
    ],
    demo: { label: 'Otevřít kalkulačku', to: '/kalkulacka' },
    icon: Calculator
  },
  {
    id: 'roi-tool',
    variant: 'tool',
    kicker: 'Nástroj · ROI kalkulačka',
    title: 'ROI kalkulačka a finanční plán',
    bullets: [
      'Detailní finanční model: příjmy, náklady, marže, break-even.',
      'Ukazuje, jestli tvoje čísla dávají smysl dřív, než utratíš první korunu.',
      'Exportuj si výstupy a měj je vždy po ruce.'
    ],
    demo: { label: 'Otevřít ROI kalkulačku', to: '/roi-kalkulacka' },
    icon: TrendingUp
  },
  {
    id: 'block2',
    variant: 'block',
    kicker: 'Blok 2 · Platforma',
    title: 'Výběr platformy',
    bullets: [
      'Špatná první otázka je „jaká platforma“. Správná: „co nejjednodušší, co mě nezabrzdí, a začni prodávat“.',
      'Shopify (růst, zahraničí) · Shoptet (ČR, integrace, podpora) · kurzy a digitál (Teachable, Seduo, Podia) · můžeš začít i bez e-shopu.',
      'Volba platformy je 20 % rozhodnutí. 80 % je byznys model a značka. Hned řeš: doménu, platbu, 1 dopravu, pár produktů.'
    ],
    icon: Layers
  },
  {
    id: 'platforma-tool',
    variant: 'tool',
    kicker: 'Nástroj · Výběr platformy',
    title: 'Průvodce výběrem platformy',
    bullets: [
      'Pár otázek o tvém byznysu a dostaneš konkrétní doporučení, ne obecné rady.',
      'Porovná Shopify, Shoptet i alternativy podle toho, co ti skutečně sedí.',
      'Šetří hodiny hledání a riziko špatné volby na začátku.'
    ],
    demo: { label: 'Otevřít průvodce výběrem', to: '/vyber-platformy' },
    icon: Layers
  },
  {
    id: 'block3',
    variant: 'block',
    kicker: 'Blok 3 · Diagnostika',
    title: 'Co když to neprodává',
    bullets: [
      'Prodej je řetěz: návštěvnost - konverze - hodnota objednávky - marže - náklad na zákaznici.',
      'Najdi nejslabší článek a oprav JEN ten. Neměň všechno najednou.',
      'Diagnostika ti ho najde z tvých čísel a seřadí, co řešit první. Počítá i tvůj čas a fixní náklady.'
    ],
    icon: Stethoscope
  },
  {
    id: 'diagnostika-tool',
    variant: 'tool',
    kicker: 'Nástroj · Diagnostika',
    title: 'Diagnostika e-shopu',
    bullets: [
      'Zadáš svá čísla a nástroj ti ukáže, kde máš největší díru v tržbách.',
      'Dostaneš seřazený seznam fixů podle dopadu, ne podle toho, co je nejsnazší.',
      'Funguje pro e-shop v jakékoliv fázi, i když máš jen pár objednávek měsíčně.'
    ],
    demo: { label: 'Živě: Diagnostika', to: '/diagnostika' },
    icon: Stethoscope
  },
  {
    id: 'checklist-tool',
    variant: 'tool',
    kicker: 'Nástroj · Checklist',
    title: 'Spouštěcí checklist',
    bullets: [
      'Přehledný checklist všeho, co potřebuješ mít hotové před spuštěním.',
      'Právo, platby, doprava, obsah, technické nastavení, GDPR a víc.',
      'Odškrtávej postupně a spusť s jistotou, ne v panice.'
    ],
    demo: { label: 'Otevřít checklist', to: '/checklist' },
    icon: ClipboardList
  },
  {
    id: 'ai',
    variant: 'block',
    kicker: 'Napříč vším',
    title: 'AI jako tvůj asistent',
    bullets: [
      'Každý nástroj i kapitola má hotový prompt, zkopíruj a vlož do ChatGPT, Claude i Gemini.',
      'Prompty na sebe navazují, takže ti AI postupně sestaví celý plán na rozjezd byznysu.',
      'Pokročilé: stáhni si celý kit z GitHubu a „nakrm“ jím svou AI, radí pak přesně v duchu téhle metody.'
    ],
    demo: { label: 'Celý kit na GitHubu', to: 'https://github.com/davidsimoes/hzb-eshop-kit', external: true },
    demoSecondary: { label: 'Kit a prompty na webu', to: '/pruvodce' },
    icon: Sparkles
  },
  {
    id: 'close',
    variant: 'close',
    kicker: 'Jak to použít',
    title: 'Odcházíš s nástroji, ne jen poznámkami',
    bullets: [
      'Tři kroky, ať to není složité: ověř nápad, spočítej čísla, spusť podle checklistu.',
      'Web: hzb.davidjose.net · Celý kit zdarma k použití i sdílení, stačí uvést autora.',
      'Začni dnes jedním malým krokem. Hotovo je lepší než dokonalé.'
    ],
    qr: '/images/qr-hzb.svg',
    qrLabel: 'Naskenuj a máš web i kit v kapse',
    qr2: '/images/qr-linkedin.svg',
    qr2Label: 'Sleduj mě na LinkedInu',
    icon: Heart
  }
];

const Prezentace = () => {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const initial = (() => {
    const s = parseInt(params.get('s') || '1', 10);
    return Number.isFinite(s) && s >= 1 && s <= slides.length ? s - 1 : 0;
  })();

  const [i, setI] = useState(initial);

  const go = useCallback(
    (dir: number) => setI((prev) => Math.min(slides.length - 1, Math.max(0, prev + dir))),
    []
  );

  // Keep the URL in sync so each slide is deep-linkable (?s=N).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    p.set('s', String(i + 1));
    window.history.replaceState(null, '', `${window.location.pathname}?${p.toString()}`);
  }, [i]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const s = slides[i];
  const Icon = s.icon ?? Presentation;
  const isTitle = s.variant === 'title' || s.variant === 'close';
  const isTool = s.variant === 'tool';

  return (
    <div className="fixed inset-0 bg-gradient-soft flex flex-col">
      <MetaTags
        title="Prezentace: E-shop, který vydělává"
        description="Interaktivní prezentace ze školení #HolkyzByznysu s praktickými nástroji pro rozjezd e-shopu."
      />
      {/* progress */}
      <div className="h-1.5 bg-brand-light-pink">
        <div
          className="h-full bg-gradient-brand transition-all duration-300"
          style={{ width: `${((i + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* slide */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 overflow-y-auto">
        <div className={`max-w-4xl w-full ${isTitle ? 'text-center' : ''}`}>
          <div className={`flex items-center gap-3 mb-6 ${isTitle ? 'justify-center' : ''}`}>
            <div className={`p-3 rounded-2xl shadow-soft ${isTool ? 'bg-brand-wine/10' : 'bg-white/70'}`}>
              <Icon className="w-8 h-8 text-brand-wine" />
            </div>
            {s.kicker && (
              <Badge className={`text-sm px-3 py-1 ${isTool ? 'bg-brand-wine/20 text-brand-wine' : 'bg-brand-orange/20 text-brand-wine'}`}>{s.kicker}</Badge>
            )}
          </div>

          <h1
            className={`font-bold text-brand-wine mb-8 ${
              isTitle ? 'text-4xl lg:text-6xl' : 'text-3xl lg:text-5xl'
            }`}
          >
            {s.title}
          </h1>

          {/* numbered grid for the menu slide */}
          {s.menuItems && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {s.menuItems.map((item, idx) => {
                const slug = s.menuSlugs?.[idx];
                const inner = (
                  <>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-wine text-white font-bold flex items-center justify-center">{idx + 1}</span>
                    <span className="text-base lg:text-lg text-brand-wine font-medium">{item}</span>
                  </>
                );
                return slug ? (
                  <Link
                    key={idx}
                    to={slug}
                    className="flex items-center gap-3 bg-white/70 rounded-xl px-4 py-3 shadow-soft hover:bg-white/90 transition-colors"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={idx} className="flex items-center gap-3 bg-white/70 rounded-xl px-4 py-3 shadow-soft">
                    {inner}
                  </div>
                );
              })}
            </div>
          )}

          {s.bullets && (
            <ul className={`space-y-4 ${isTitle ? 'inline-block text-left' : ''}`}>
              {s.bullets.map((b, idx) => (
                <li key={idx} className="flex items-start gap-3 text-lg lg:text-2xl text-brand-wine/80">
                  <span className="mt-2.5 w-2.5 h-2.5 rounded-full bg-brand-orange flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {(s.demo || s.demoSecondary) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {s.demo && (
                <Button asChild size="lg" className="bg-brand-wine hover:bg-brand-wine/90 text-base">
                  {s.demo.external ? (
                    <a href={s.demo.to} target="_blank" rel="noopener noreferrer">
                      <Sparkles className="w-5 h-5 mr-2" />
                      {s.demo.label}
                    </a>
                  ) : (
                    <Link to={s.demo.to}>
                      <Sparkles className="w-5 h-5 mr-2" />
                      {s.demo.label}
                    </Link>
                  )}
                </Button>
              )}
              {s.demoSecondary && (
                <Button asChild size="lg" variant="outline" className="border-brand-wine text-brand-wine hover:bg-brand-wine/10 text-base">
                  {s.demoSecondary.external ? (
                    <a href={s.demoSecondary.to} target="_blank" rel="noopener noreferrer">
                      {s.demoSecondary.label}
                    </a>
                  ) : (
                    <Link to={s.demoSecondary.to}>
                      {s.demoSecondary.label}
                    </Link>
                  )}
                </Button>
              )}
            </div>
          )}

          {s.logos && (
            <div className="mt-10">
              <p className="text-xs uppercase tracking-wide text-brand-wine/50 mb-5">Značky, se kterými jsem pracoval</p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
                {DECK_LOGOS.map(([src, alt]) => (
                  <img key={alt} src={src} alt={alt} className="h-7 lg:h-8 w-auto object-contain opacity-70" />
                ))}
              </div>
            </div>
          )}

          {(s.slidoCode || s.qr || s.qr2) && (
            <div className={`mt-10 flex flex-wrap items-center gap-5 ${isTitle ? 'justify-center' : ''}`}>
              {s.slidoCode && (
                <div className="inline-flex items-center gap-3 bg-white/70 rounded-full px-5 py-2 shadow-soft">
                  <span className="text-sm text-brand-wine/70">Otázky přes sli.do:</span>
                  <span className="text-lg font-bold text-brand-wine tracking-wider">{s.slidoCode}</span>
                </div>
              )}
              {s.qr && (
                <div className="flex flex-col items-center gap-2">
                  <img src={s.qr} alt={s.qrLabel || 'QR kód'} className="w-28 h-28 lg:w-32 lg:h-32 rounded-xl bg-white p-2 shadow-soft" />
                  <span className="text-xs text-brand-wine/60">{s.qrLabel || 'Naskenuj a máš web i kit v kapse'}</span>
                </div>
              )}
              {s.qr2 && (
                <div className="flex flex-col items-center gap-2">
                  <img src={s.qr2} alt={s.qr2Label || 'LinkedIn QR kód'} className="w-28 h-28 lg:w-32 lg:h-32 rounded-xl bg-white p-2 shadow-soft" />
                  <span className="text-xs text-brand-wine/60">{s.qr2Label || 'Sleduj mě na LinkedInu'}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* controls */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-brand-light-pink bg-white/60 backdrop-blur">
        <Button variant="ghost" size="sm" onClick={() => go(-1)} disabled={i === 0} className="text-brand-wine">
          <ChevronLeft className="w-5 h-5 mr-1" /> Zpět
        </Button>

        <div className="flex items-center gap-3">
          <span className="text-sm text-brand-wine/60">{i + 1} / {slides.length}</span>
          <Button asChild variant="outline" size="sm" className="border-brand-wine text-brand-wine hover:bg-brand-wine/10 font-medium">
            <Link to="/">
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              Zpět na web
            </Link>
          </Button>
        </div>

        <Button variant="ghost" size="sm" onClick={() => go(1)} disabled={i === slides.length - 1} className="text-brand-wine">
          Dál <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default Prezentace;
