import { useState, useEffect, useCallback } from 'react';
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
  Presentation
} from 'lucide-react';

// Slim demo-led deck: open + menu -> 3 deep blocks -> kit + AI -> close.
// Controls: arrows / space. Demo cue = when to switch to the live tool.
// Deep-link a slide with ?s=4. Presenter notes only show with ?notes=1 (private).

interface Slide {
  id: string;
  kicker?: string;
  title: string;
  bullets?: string[];
  menuItems?: string[];   // rendered as a numbered grid (menu variant)
  demo?: { label: string; to: string };
  note?: string;          // presenter note (only visible with ?notes=1)
  icon?: typeof Lightbulb;
  variant?: 'title' | 'menu' | 'block' | 'plain' | 'close';
  logos?: boolean;
  qr?: string;
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
    qr: '/images/qr-hzb.svg',
    note: 'Přivítání, energie. Kdo jsem, proč to dělám. Žádný stres, odcházíš s nástroji. Ukaž sli.do kód i QR na web.',
    icon: ShoppingBag
  },
  {
    id: 'kdo',
    variant: 'plain',
    kicker: 'Krátce o mně',
    title: 'Proč mě poslouchat',
    bullets: [
      '10+ let v e-commerce, stovky e-shopů od start-upů po firmy s obratem přes 3 mld. Kč.',
      'Zakladatel Sounds Good Agency, první Shopify agentury v ČR a na Slovensku.',
      'Vím, jak vypadá start zevnitř, a ty pochybnosti znám taky. Dnes ti předám zkratky, co šetří peníze i nervy.'
    ],
    logos: true,
    note: 'Kredibilita stručně. Nepřeprodávej se, buduj důvěru a vřelost. Loga = konkrétní důkaz.',
    icon: Heart
  },
  {
    id: 'menu',
    variant: 'menu',
    kicker: 'Tvůj kit má 6 oblastí',
    title: 'Dnešní menu',
    menuItems: [
      'Validace nápadu',
      'Výběr platformy',
      'Spuštění a právo',
      'Marketing a značka',
      'Provoz a finance',
      'Když to neprodává'
    ],
    bullets: [
      'Všech 6 oblastí máš v kitu, který si odneseš. Dnes jdeme do hloubky na 3: Validace, Platforma a Diagnostika, plus kamkoli mě zatáhneš.',
      'Vím, co tě zajímá nejvíc: jak vybrat platformu, jak vůbec začít a jak se vyhnout nejčastějším chybám. Přesně to dnes projdeme.'
    ],
    note: 'Tohle je menu. Reflektuj jejich očekávání z HzB (platforma, jak začít, vyhnout se chybám). Řekni: vše je v kitu, dnes deep-dive na 3. Pojmenuj obě skupiny (začátečnice + už mám e-shop, pro ně je Diagnostika).',
    icon: Layers
  },
  {
    id: 'chyby',
    variant: 'block',
    kicker: 'Než se vrhneme do toho',
    title: '3 nejdražší chyby začátečnic',
    bullets: [
      'Špatná platforma „protože ji má kamarádka", místo té, co sedí tvému byznysu.',
      'Produkt bez ověření, že o něj někdo cizí (ne rodina) opravdu stojí a zaplatí.',
      'Žádná čísla. Marže, doprava a marketing nevyjdou dohromady, takže čím víc prodáš, tím víc proděláš.'
    ],
    note: 'Krátce, jako háček. Tyhle 3 chyby se táhnou všemi 9 lety. Dnešní 3 bloky přesně tyhle chyby řeší.',
    icon: AlertTriangle
  },
  {
    id: 'block1',
    variant: 'block',
    kicker: 'Blok 1 · Validace',
    title: 'Ověř, než utratíš',
    bullets: [
      'Tři otázky: Komu prodávám? Proč ode mě? Vydělá to?',
      'Persona = jedna konkrétní zákaznice, ne „ženy 25 až 45".',
      'Ověř levně: 5 rozhovorů (ne s rodinou), poptávka, konkurence, 1 signál, že zaplatí cizí člověk.'
    ],
    demo: { label: 'Živě: Ověř nápad', to: '/validace' },
    note: 'Demo /validace, vyplň personu naživo. Zdůrazni: validace nápadu = první krok, ne spuštění byznysu. Pak kalkulačka. Ukaž AI prompt.',
    icon: Lightbulb
  },
  {
    id: 'block1b',
    variant: 'block',
    kicker: 'Blok 1 · nástroj',
    title: 'Spočítej, jestli to vydělá',
    bullets: [
      'Kolik objednávek a návštěv potřebuješ na svůj cíl.',
      'Počítá i tvůj příjem, kolik si chceš vydělat ty, ne jen pokrýt zboží.',
      '2026 benchmarky podle oboru = realita check tvých čísel.'
    ],
    demo: { label: 'Živě: Kalkulačka', to: '/kalkulacka' },
    note: 'Demo /kalkulacka. Ukaž benchmarky. Zdůrazni: čísla na papíře jsou nejlevnější chyba.',
    icon: Calculator
  },
  {
    id: 'block2',
    variant: 'block',
    kicker: 'Blok 2 · Platforma',
    title: 'Výběr platformy',
    bullets: [
      'Špatná první otázka je „jaká platforma". Správná: „co nejjednodušší, co mě nezabrzdí, a začni prodávat".',
      'Shopify (růst, zahraničí) · Shoptet (ČR, integrace, podpora) · kurzy a digitál (Teachable, Seduo, Podia) · můžeš začít i bez e-shopu.',
      'Volba platformy je 20 % rozhodnutí. 80 % je byznys model a značka. Hned řeš: doménu, platbu, 1 dopravu, pár produktů.'
    ],
    demo: { label: 'Rozhodovací průvodce platformou', to: '/vyber-platformy' },
    note: 'Nejvíc žádané téma. Dej tomu plných 20 min. Rozhodovací obsah, ukaž průvodce výběrem. Odkaž na FAQ + AI prompt.',
    icon: Layers
  },
  {
    id: 'block3',
    variant: 'block',
    kicker: 'Blok 3 · Diagnostika',
    title: 'Co když to neprodává',
    bullets: [
      'Prodej je řetěz: návštěvnost → konverze → hodnota objednávky → marže → náklad na zákaznici.',
      'Najdi nejslabší článek a oprav JEN ten. Neměň všechno najednou.',
      'Diagnostika ti ho najde z tvých čísel a seřadí, co řešit první. Počítá i tvůj čas a fixní náklady.'
    ],
    demo: { label: 'Živě: Diagnostika', to: '/diagnostika' },
    note: 'Demo /diagnostika s připravenými čísly (2000 návštěv, 0,8 %, 750 Kč AOV, 400 Kč zboží, 5000 Kč marketing). Ukaž ranking fixů + mzdu/fixní náklady. Trumf 2026.',
    icon: Stethoscope
  },
  {
    id: 'kit-rest',
    variant: 'plain',
    kicker: 'Zbytek kitu (rychlý tour)',
    title: 'Co ještě v kitu najdeš',
    bullets: [
      'Spuštění + právní minimum (živnost/osvč, VOP, GDPR, 14 dní na vrácení).',
      'Marketing a značka · Provoz, finance, dodavatelé, doprava.',
      'Strach ze startu, reálné příběhy a hotové AI prompty ke každé kapitole.'
    ],
    demo: { label: 'Spouštěcí checklist', to: '/checklist' },
    note: 'Lehký průlet. „Tohle nestihneme naživo, ale máš to celé v kitu." Ukaž checklist. Kit = záchranná síť.',
    icon: ShoppingBag
  },
  {
    id: 'ai',
    variant: 'block',
    kicker: 'Napříč vším',
    title: 'AI jako tvůj asistent',
    bullets: [
      'Každý nástroj i kapitola má hotový prompt, zkopíruj a vlož do ChatGPT, Claude i Gemini.',
      'Prompty na sebe navazují, takže ti AI postupně sestaví celý plán na rozjezd byznysu.',
      'Pokročilé: stáhni si celý kit z GitHubu a „nakrm" jím svou AI, radí pak přesně v duchu téhle metody.'
    ],
    demo: { label: 'Kit a prompty na webu', to: '/' },
    note: 'Tohle je odlišovač. Ukaž kopírování promptu + že prompty spolupracují. Odkaž github.com/davidsimoes/hzb-eshop-kit.',
    icon: Sparkles
  },
  {
    id: 'close',
    variant: 'close',
    kicker: 'Jak to použít',
    title: 'Odcházíš s nástroji, ne jen poznámkami',
    bullets: [
      '1. Ověř nápad. 2. Spočítej čísla. 3. Spusť podle checklistu.',
      'Web: hzb.davidjose.net · Celý kit zdarma k použití i sdílení, stačí uvést autora.',
      'Začni dnes jedním malým krokem. Hotovo je lepší než dokonalé.'
    ],
    qr: '/images/qr-hzb.svg',
    note: 'Zopakuj 3 kroky. CTA na web + kit. Ukaž QR. Pozvi k otázkám přes sli.do. Poděkuj.',
    icon: Heart
  }
];

const Prezentace = () => {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const notesEnabled = params.has('notes');
  const initial = (() => {
    const s = parseInt(params.get('s') || '1', 10);
    return Number.isFinite(s) && s >= 1 && s <= slides.length ? s - 1 : 0;
  })();

  const [i, setI] = useState(initial);
  const [showNotes, setShowNotes] = useState(false);

  const go = useCallback(
    (dir: number) => setI((prev) => Math.min(slides.length - 1, Math.max(0, prev + dir))),
    []
  );

  // Keep the URL in sync so each slide is deep-linkable (?s=N), preserving ?notes=1.
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
      } else if (e.key.toLowerCase() === 'n' && notesEnabled) {
        setShowNotes((s) => !s);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, notesEnabled]);

  const s = slides[i];
  const Icon = s.icon ?? Presentation;
  const isTitle = s.variant === 'title' || s.variant === 'close';

  return (
    <div className="fixed inset-0 bg-gradient-soft flex flex-col">
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
            <div className="p-3 rounded-2xl bg-white/70 shadow-soft">
              <Icon className="w-8 h-8 text-brand-wine" />
            </div>
            {s.kicker && (
              <Badge className="bg-brand-orange/20 text-brand-wine text-sm px-3 py-1">{s.kicker}</Badge>
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
              {s.menuItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/70 rounded-xl px-4 py-3 shadow-soft">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-wine text-white font-bold flex items-center justify-center">{idx + 1}</span>
                  <span className="text-base lg:text-lg text-brand-wine font-medium">{item}</span>
                </div>
              ))}
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

          {s.demo && (
            <div className="mt-10">
              <Button asChild size="lg" className="bg-brand-wine hover:bg-brand-wine/90 text-base">
                {/* open the live tool in a NEW TAB so the deck keeps its place */}
                <a href={s.demo.to} target="_blank" rel="noopener noreferrer">
                  <Sparkles className="w-5 h-5 mr-2" />
                  {s.demo.label}
                </a>
              </Button>
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

          {(s.slidoCode || s.qr) && (
            <div className={`mt-10 flex flex-wrap items-center gap-5 ${isTitle ? 'justify-center' : ''}`}>
              {s.slidoCode && (
                <div className="inline-flex items-center gap-3 bg-white/70 rounded-full px-5 py-2 shadow-soft">
                  <span className="text-sm text-brand-wine/70">Otázky přes sli.do:</span>
                  <span className="text-lg font-bold text-brand-wine tracking-wider">{s.slidoCode}</span>
                </div>
              )}
              {s.qr && (
                <div className="flex flex-col items-center gap-2">
                  <img src={s.qr} alt="QR kód na hzb.davidjose.net" className="w-28 h-28 lg:w-32 lg:h-32 rounded-xl bg-white p-2 shadow-soft" />
                  <span className="text-xs text-brand-wine/60">Naskenuj a máš web i kit v kapse</span>
                </div>
              )}
            </div>
          )}

          {notesEnabled && showNotes && s.note && (
            <div className="mt-10 p-4 rounded-lg bg-brand-wine/90 text-white text-sm max-w-2xl">
              <strong className="block mb-1 opacity-80">Poznámka lektora</strong>
              {s.note}
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
          {notesEnabled && (
            <button
              onClick={() => setShowNotes((v) => !v)}
              className="text-xs text-brand-wine/50 hover:text-brand-wine underline"
              title="Přepnout poznámky lektora (N)"
            >
              {showNotes ? 'skrýt poznámky' : 'poznámky (N)'}
            </button>
          )}
          <Link to="/" className="text-xs text-brand-wine/50 hover:text-brand-wine underline">zpět na web</Link>
        </div>

        <Button variant="ghost" size="sm" onClick={() => go(1)} disabled={i === slides.length - 1} className="text-brand-wine">
          Dál <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default Prezentace;
