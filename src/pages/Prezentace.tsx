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
  Presentation
} from 'lucide-react';

// Slim demo-led deck: open + menu -> 3 hloubkové bloky -> kit + AI -> close.
// Ovládání: šipky / mezerník. Demo cue = kdy přepnout na živý nástroj.

interface Slide {
  id: string;
  kicker?: string;
  title: string;
  bullets?: string[];
  demo?: { label: string; to: string };
  note?: string; // poznámka pro lektora (jen v presenter liště)
  icon?: typeof Lightbulb;
  variant?: 'title' | 'menu' | 'block' | 'plain' | 'close';
}

const slides: Slide[] = [
  {
    id: 'title',
    variant: 'title',
    title: 'E-shop, který vydělává',
    kicker: '#HolkyzByznysu · školení s Davidem',
    bullets: ['Praktické nástroje + kit, který ti zůstane.', 'Dnes spustíme nápad, ne jen prezentaci.'],
    note: 'Přivítání, energie. Kdo jsem, proč tohle dělám. Žádný stres — odcházíš s nástroji.',
    icon: ShoppingBag
  },
  {
    id: 'kdo',
    variant: 'plain',
    kicker: 'Krátce o mně',
    title: 'Proč mě poslouchat',
    bullets: [
      '9+ let v e-commerce, stovky e-shopů.',
      'Vím, jak vypadá start zevnitř — i ty pochybnosti.',
      'Dnes ti předám zkratky, které šetří peníze i nervy.'
    ],
    note: 'Kredibilita stručně. Nepřeprodávej se — buduj důvěru a vřelost.',
    icon: Heart
  },
  {
    id: 'menu',
    variant: 'menu',
    kicker: 'Tvůj kit má 6 oblastí',
    title: 'Dnešní menu',
    bullets: [
      '1 · Validace nápadu   ·   2 · Výběr platformy   ·   3 · Spuštění a právo',
      '4 · Marketing a značka   ·   5 · Provoz a finance   ·   6 · Když to neprodává',
      'Všech 6 máš v kitu. Dnes jdeme do hloubky na 3 — a kam mě zatáhneš.'
    ],
    note: 'Tohle je „menu“. Řekni: všechno je v kitu, dnes deep-dive na 3. Steering rukama / sli.do.',
    icon: Layers
  },
  {
    id: 'block1',
    variant: 'block',
    kicker: 'Blok 1',
    title: 'Validace: ověř, než utratíš',
    bullets: [
      'Komu prodávám? (persona) · Proč ode mě? · Vydělá to?',
      'Persona = jedna konkrétní zákaznice, ne „ženy 25–45“.',
      'Ověř levně: 5 rozhovorů, poptávka, konkurence, 1 signál, že zaplatí.'
    ],
    demo: { label: 'Živě: Ověř nápad', to: '/validace' },
    note: 'Demo /validace — vyplň personu naživo. Pak /kalkulacka na životaschopnost. AI prompt ukázat.',
    icon: Lightbulb
  },
  {
    id: 'block1b',
    variant: 'block',
    kicker: 'Blok 1 · nástroj',
    title: 'Spočítej, jestli to vydělá',
    bullets: [
      'Kolik objednávek a návštěv potřebuješ na svůj cíl.',
      'Marže, AOV, náklad na zákaznici — bez tabulek.',
      '2026 benchmarky podle oboru = realita check tvých čísel.'
    ],
    demo: { label: 'Živě: Kalkulačka', to: '/kalkulacka' },
    note: 'Demo /kalkulacka. Ukázat benchmarky. Zdůraznit: čísla na papíře jsou nejlevnější chyba.',
    icon: Calculator
  },
  {
    id: 'block2',
    variant: 'block',
    kicker: 'Blok 2',
    title: 'Výběr platformy',
    bullets: [
      'Vyber nejjednodušší, co tě nezabrzdí, a začni prodávat.',
      'Shopify (růst, zahraničí) · Shoptet (ČR, integrace) · začni i bez e-shopu.',
      'Hned: doména, platba, 1 doprava, pár produktů. Zbytek počká.'
    ],
    note: 'Tady neděláme demo nástroje — rozhodovací obsah. Odkázat na docs/02-vyber-platformy.md + AI prompt.',
    icon: Layers
  },
  {
    id: 'block3',
    variant: 'block',
    kicker: 'Blok 3',
    title: 'Co když to neprodává',
    bullets: [
      'Prodej je řetěz: návštěvnost → konverze → AOV → marže → CAC.',
      'Najdi nejslabší článek a oprav JEN ten. Neměň všechno najednou.',
      'Diagnostika ti ho najde z tvých čísel a seřadí, co řešit první.'
    ],
    demo: { label: 'Živě: Diagnostika', to: '/diagnostika' },
    note: 'Demo /diagnostika s reálnými čísly. Ukázat ranking fixů + AI prompt. To je nový trumf 2026.',
    icon: Stethoscope
  },
  {
    id: 'kit-rest',
    variant: 'plain',
    kicker: 'Zbytek kitu (rychlý tour)',
    title: 'Co ještě v kitu najdeš',
    bullets: [
      'Spuštění + právní minimum (živnost, VOP, GDPR, 14 dní).',
      'Marketing a značka · Provoz, finance, dodavatelé.',
      'Strach ze startu, příběhy, hotové AI prompty ke všemu.'
    ],
    note: 'Lehký průlet. „Tohle nestihneme naživo, ale máš to celé v kitu.“ Kit = safety net.',
    icon: ShoppingBag
  },
  {
    id: 'ai',
    variant: 'block',
    kicker: 'Napříč vším',
    title: 'AI jako tvůj asistent',
    bullets: [
      'Každý nástroj i kapitola má hotový prompt — zkopíruj a vlož.',
      'Funguje v ChatGPT, Claude i Gemini. Žádné speciální nástroje.',
      'Pokročilé: stáhni kit a „nakrm“ jím svou AI — radí pak v duchu téhle metody.'
    ],
    demo: { label: 'Kit a prompty na webu', to: '/' },
    note: 'Tohle je odlišovač. Ukázat kopírování promptu. Odkázat github.com/davidsimoes/hzb-eshop-kit.',
    icon: Sparkles
  },
  {
    id: 'close',
    variant: 'close',
    kicker: 'Jak to použít',
    title: 'Odcházíš s nástroji, ne jen poznámkami',
    bullets: [
      '1 · Ověř nápad   2 · Spočítej   3 · Spusť podle checklistu',
      'Web: hzb.davidjose.net · Kit zdarma pod CC BY 4.0.',
      'Začni dnes jedním malým krokem. Hotovo > dokonalé.'
    ],
    note: 'Zopakovat 3 kroky. CTA na web + kit. Pozvat k otázkám. Poděkovat.',
    icon: Heart
  }
];

const Prezentace = () => {
  const [i, setI] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const go = useCallback(
    (dir: number) => setI((prev) => Math.min(slides.length - 1, Math.max(0, prev + dir))),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(-1);
      } else if (e.key.toLowerCase() === 'n') {
        setShowNotes((s) => !s);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

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
            <div className={`mt-10 ${isTitle ? '' : ''}`}>
              <Button asChild size="lg" className="bg-brand-wine hover:bg-brand-wine/90 text-base">
                <Link to={s.demo.to}>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {s.demo.label}
                </Link>
              </Button>
            </div>
          )}

          {showNotes && s.note && (
            <div className="mt-10 p-4 rounded-lg bg-brand-wine/90 text-white text-sm max-w-2xl">
              <strong className="block mb-1 opacity-80">Poznámka lektora</strong>
              {s.note}
            </div>
          )}
        </div>
      </div>

      {/* controls */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-brand-light-pink bg-white/60 backdrop-blur">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => go(-1)}
          disabled={i === 0}
          className="text-brand-wine"
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Zpět
        </Button>

        <div className="flex items-center gap-3">
          <span className="text-sm text-brand-wine/60">
            {i + 1} / {slides.length}
          </span>
          <button
            onClick={() => setShowNotes((s) => !s)}
            className="text-xs text-brand-wine/50 hover:text-brand-wine underline"
            title="Přepnout poznámky lektora (N)"
          >
            {showNotes ? 'skrýt poznámky' : 'poznámky (N)'}
          </button>
          <Link to="/" className="text-xs text-brand-wine/50 hover:text-brand-wine underline">
            zpět na web
          </Link>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => go(1)}
          disabled={i === slides.length - 1}
          className="text-brand-wine"
        >
          Dál <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default Prezentace;
