import { useState } from 'react';
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Navigation/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MetaTags } from '@/components/SEO/MetaTags';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Wallet,
  Store,
  Sparkles
} from 'lucide-react';

/**
 * Průvodce výběrem platformy pro e-shop.
 * Položí 3 až 5 jednoduchých otázek a doporučí platformu.
 * Data (otázky i doporučení) jsou záměrně inline v tomto souboru,
 * aby byla stránka soběstačná (decision-framework ze spec).
 */

// Klíče jednotlivých doporučení
type RecKey =
  | 'shoptet'
  | 'shopify'
  | 'shoptet_or_shopify'
  | 'webnode_or_shoptet_basic'
  | 'fapi'
  | 'podia_teachable'
  | 'seduo'
  | 'woocommerce';

// Krok vede buď na další otázku, nebo rovnou na doporučení
type Next = { type: 'question'; id: string } | { type: 'rec'; key: RecKey };

interface Option {
  label: string;
  hint?: string;
  next: Next;
}

interface Question {
  id: string;
  q: string;
  intro?: string;
  options: Option[];
}

interface Recommendation {
  platform: string;
  headline: string;
  reason: string;
  monthlyCost: string;
  nextStep: string;
  strengths: string[];
  watchOut: string;
}

const QUESTIONS: Record<string, Question> = {
  q1: {
    id: 'q1',
    q: 'Co chcete prodávat?',
    intro: 'Začneme tím nejdůležitějším. Podle toho se rozhodne skoro všechno ostatní.',
    options: [
      {
        label: 'Fyzické zboží',
        hint: 'Oblečení, ruční výroba, kosmetika, jídlo, doplňky...',
        next: { type: 'question', id: 'q2' }
      },
      {
        label: 'Digitální produkty',
        hint: 'Kurzy, e-booky, koučování, členství, šablony...',
        next: { type: 'question', id: 'q2_digital' }
      },
      {
        label: 'Obojí, fyzické i digitální',
        hint: 'Hlavní je pro vás zatím fyzické zboží.',
        next: { type: 'question', id: 'q2' }
      }
    ]
  },
  q2: {
    id: 'q2',
    q: 'Jak jste na tom s technikou?',
    intro: 'Buďte k sobě upřímná. Není ostuda chtít to jednoduché.',
    options: [
      {
        label: 'Chci klikat, ne programovat',
        hint: 'Potřebuju hotové řešení, kde si jen nastavím své věci.',
        next: { type: 'question', id: 'q3' }
      },
      {
        label: 'Zvládnu nastavení podle návodu',
        hint: 'Trochu si pohraju, když je k tomu srozumitelný postup.',
        next: { type: 'question', id: 'q3' }
      },
      {
        label: 'Jsem pokročilá nebo mám vývojáře',
        hint: 'Nebojím se kódu, serveru a vlastních úprav.',
        next: { type: 'rec', key: 'woocommerce' }
      }
    ]
  },
  q2_digital: {
    id: 'q2_digital',
    q: 'Pro koho hlavně prodáváte?',
    intro: 'U digitálních produktů rozhoduje jazyk a platby vašich zákazníků.',
    options: [
      {
        label: 'České a slovenské zákaznice',
        hint: 'Kurzy v češtině, platby v CZK, česká faktura.',
        next: { type: 'rec', key: 'fapi' }
      },
      {
        label: 'Mezinárodní publikum (anglicky)',
        hint: 'Prodávám hlavně do zahraničí.',
        next: { type: 'rec', key: 'podia_teachable' }
      },
      {
        label: 'Chci zkusit český marketplace',
        hint: 'Nechci řešit techniku, jen nahrát kurz.',
        next: { type: 'rec', key: 'seduo' }
      }
    ]
  },
  q3: {
    id: 'q3',
    q: 'Kde chcete hlavně prodávat?',
    intro: 'Tohle rozhodne, jestli vsadit na českou, nebo světovou platformu.',
    options: [
      {
        label: 'Hlavně v Česku a na Slovensku',
        hint: 'Moji zákazníci jsou tady doma.',
        next: { type: 'question', id: 'q4' }
      },
      {
        label: 'Chci expandovat do zahraničí',
        hint: 'Plánuju prodávat i mimo CZ/SK, nebo už prodávám.',
        next: { type: 'rec', key: 'shopify' }
      }
    ]
  },
  q4: {
    id: 'q4',
    q: 'Jaké čekáte tržby v prvním roce?',
    intro: 'Klidně střelte od boku. Jde o řádový odhad, ne přesné číslo.',
    options: [
      {
        label: 'Zatím testuju nápad (pod 20 000 Kč / měsíc)',
        hint: 'Chci začít s minimálními náklady.',
        next: { type: 'rec', key: 'webnode_or_shoptet_basic' }
      },
      {
        label: 'Pomalý rozjezd (20 000 až 200 000 Kč / měsíc)',
        hint: 'Beru to vážně a chci stabilní základ.',
        next: { type: 'rec', key: 'shoptet' }
      },
      {
        label: 'Plánuju rychlý růst (nad 200 000 Kč / měsíc)',
        hint: 'Mám ambice a chci platformu, která poroste se mnou.',
        next: { type: 'rec', key: 'shoptet_or_shopify' }
      }
    ]
  }
};

const RECOMMENDATIONS: Record<RecKey, Recommendation> = {
  shoptet: {
    platform: 'Shoptet',
    headline: 'Shoptet je pro vás nejlepší volba',
    reason:
      'Nejrozšířenější česká platforma (přes 45 000 obchodníků). Všechno důležité pro český trh má rovnou v sobě, takže nemusíte nic složitě dolepovat.',
    monthlyCost: '400 až 2 000 Kč / měsíc',
    nextStep: 'Založte si zkušební účet na shoptet.cz, 30 dní zdarma a bez závazku.',
    strengths: [
      'Nativní napojení na Heureku, Zboží.cz a Zásilkovnu',
      'České platební brány (GoPay, Comgate) a česká faktura',
      'Česká podpora i obrovská česká komunita'
    ],
    watchOut:
      'Pro prodej do zahraničí a hodně netradiční design je méně ohebný než Shopify.'
  },
  shopify: {
    platform: 'Shopify',
    headline: 'Shopify je pro vás nejlepší volba',
    reason:
      'Nejsilnější platforma pro růst a prodej za hranice. Roste i v Česku (kolem 4 500 obchodníků). Pro CZ doplníte pár aplikací, ale za expanzi to stojí.',
    monthlyCost: '750 až 2 500 Kč / měsíc',
    nextStep: 'Spusťte si zkušební verzi na shopify.com, plány lze platit i v CZK.',
    strengths: [
      'Nejrychlejší vývoj a nejlepší nákupní košík na světě',
      'Obrovský výběr aplikací a šablon',
      'Poroste s vámi až do velkého obchodu bez nutnosti stěhování'
    ],
    watchOut:
      'Zásilkovnu a GoPay je třeba přidat přes aplikace, podpora je hlavně anglicky.'
  },
  shoptet_or_shopify: {
    platform: 'Shoptet nebo Shopify',
    headline: 'Máte dvě skvělé možnosti',
    reason:
      'Při rychlém růstu dávají smysl obě. Záleží, kam míříte. Pokud zůstanete v CZ a SK, vyhrává Shoptet lepší lokalizací. Pokud chcete brzy za hranice, vsaďte na Shopify.',
    monthlyCost: '400 až 2 500 Kč / měsíc',
    nextStep:
      'Vyzkoušejte oba zkušební účty (nejdřív Shoptet) a porovnejte, co vám sedne.',
    strengths: [
      'Shoptet: bezkonkurenční české integrace a podpora',
      'Shopify: nejlepší základ pro expanzi a silnou značku',
      'Obě zvládnou vyšší objem objednávek bez problémů'
    ],
    watchOut:
      'Nerozhodujte podle ceny, ale podle toho, kam chcete obchod za dva roky dotáhnout.'
  },
  webnode_or_shoptet_basic: {
    platform: 'Shoptet Start nebo Webnode',
    headline: 'Začněte s minimálními náklady',
    reason:
      'Když teprve testujete, nemá smysl platit za velkou platformu. Shoptet Start má i v nejlevnějším plánu české integrace. Webnode je nejlevnější způsob, jak vůbec začít.',
    monthlyCost: '300 až 500 Kč / měsíc',
    nextStep:
      'Zvolte Shoptet plán Start, nebo Webnode plán Mini. Až prodej ověříte, klidně povýšíte.',
    strengths: [
      'Nejnižší možné měsíční náklady na rozjezd',
      'Rychlé spuštění, nemusíte umět programovat',
      'Snadno povýšíte, až budete mít první prodeje'
    ],
    watchOut:
      'Nezamykejte se do nástroje bez českých integrací, pozdější stěhování bývá bolavé.'
  },
  fapi: {
    platform: 'FAPI',
    headline: 'FAPI je česká volba pro digitální podnikatelky',
    reason:
      'Jediná česká platforma šitá přímo na digitální produkty a kurzy. Zvládá české platby, českou DPH a faktury, členské sekce i opakované platby. To vše v češtině.',
    monthlyCost: '500 až 2 500 Kč / měsíc',
    nextStep: 'Zaregistrujte se zdarma na fapi.cz, platíte až při prvních prodejích.',
    strengths: [
      'Postavené na míru českým digitálním produktům',
      'Členské portály, e-booky, kurzy i opakované platby',
      'Česká podpora a česká faktura v ceně'
    ],
    watchOut:
      'Není určené pro fyzické zboží a design je trochu jednodušší než u velkých nástrojů.'
  },
  podia_teachable: {
    platform: 'Podia nebo Teachable',
    headline: 'Pro anglicky mluvící publikum',
    reason:
      'Když prodáváte do zahraničí, sáhněte po světovém nástroji. Podia spojuje kurzy, soubory, komunitu i e-maily. Teachable je ověřená klasika na online kurzy.',
    monthlyCost: '1 000 až 4 000 Kč / měsíc',
    nextStep:
      'Vyzkoušejte Podia plán Starter, nebo Teachable Free pro úplný začátek.',
    strengths: [
      'Vše pro online kurzy na jednom místě',
      'Čistý a profesionální vzhled pro studenty',
      'Funguje globálně přes platby kartou (Stripe)'
    ],
    watchOut:
      'Bez české lokalizace, faktur a českých plateb. Vhodné jen při prodeji v angličtině.'
  },
  seduo: {
    platform: 'Seduo.cz',
    headline: 'Nejrychlejší start bez techniky',
    reason:
      'Seduo je český vzdělávací marketplace. Nahrajete kurz a oni se postarají o platby, marketing i českou zákaznickou základnu. Nejrychlejší cesta k prvním prodejům.',
    monthlyCost: '0 Kč (podíl z tržeb)',
    nextStep: 'Zaregistrujte se jako lektorka na seduo.cz, je to zdarma.',
    strengths: [
      'Žádná technika, jen nahrajete obsah',
      'Okamžitý přístup k českým studentům',
      'Marketing i platby řeší Seduo za vás'
    ],
    watchOut:
      'Nevlastníte zákaznická data a berete jen podíl z prodeje. Skvělé jako doplněk vlastní platformy, ne jako jediný kanál.'
  },
  woocommerce: {
    platform: 'WooCommerce',
    headline: 'Jen pokud máte technické zázemí',
    reason:
      'WooCommerce je zdarma a neomezené, ale potřebuje WordPress, správu serveru a ruční nastavení všech českých integrací. Celkové náklady i čas bývají často vyšší, než to vypadá.',
    monthlyCost: '200 až 600 Kč / měsíc (hosting) plus váš čas',
    nextStep:
      'Jděte do toho jen s vývojářem nebo zkušeností s WordPressem. Jinak zvolte Shoptet nebo FAPI.',
    strengths: [
      'Zdarma a plně ve vašich rukou',
      'Neomezené možnosti úprav',
      'Obrovská knihovna pluginů'
    ],
    watchOut:
      'Bezpečnost, aktualizace a rychlost si hlídáte sama. Bez technika to není pro začátečnice.'
  }
};

const VyberPlatformy = () => {
  // historie navštívených otázek (poslední je aktuální)
  const [history, setHistory] = useState<string[]>(['q1']);
  const [result, setResult] = useState<RecKey | null>(null);

  const currentId = history[history.length - 1];
  const currentQuestion = QUESTIONS[currentId];
  const stepNumber = history.length;
  const recommendation = result ? RECOMMENDATIONS[result] : null;

  const choose = (option: Option) => {
    if (option.next.type === 'rec') {
      setResult(option.next.key);
    } else {
      setHistory((prev) => [...prev, (option.next as { id: string }).id]);
    }
  };

  const goBack = () => {
    if (result) {
      // z výsledku zpět na poslední otázku
      setResult(null);
      return;
    }
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const restart = () => {
    setHistory(['q1']);
    setResult(null);
  };

  return (
    <>
      <MetaTags
        title="Jakou platformu na e-shop? Průvodce výběrem"
        description="Odpovězte na pár jednoduchých otázek a zjistěte, jestli je pro váš e-shop nejlepší Shopify, Shoptet, WooCommerce, FAPI nebo jiná platforma. Srozumitelně a pro začátečnice."
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-gradient-soft">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb />

          <div className="max-w-3xl mx-auto text-center mb-8">
            <Badge className="bg-brand-orange/20 text-brand-wine mb-4 text-base px-4 py-2">
              <Compass className="w-4 h-4 mr-2" />
              Výběr platformy
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-brand-wine mb-4">
              Jakou platformu na e-shop?
            </h1>
            <p className="text-lg text-brand-wine/70">
              Výběr platformy zní složitě, ale nemusí. Odpovězte na pár jednoduchých otázek
              a doporučíme vám řešení, které sedne přesně na to, co prodáváte a kam míříte.
            </p>
          </div>

          {/* Průvodce: otázka */}
          {!recommendation && currentQuestion && (
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-soft">
                <CardHeader className="bg-brand-wine text-white rounded-t-lg">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="flex items-center gap-2">
                      <Compass className="w-5 h-5" />
                      Otázka {stepNumber}
                    </CardTitle>
                    <Badge className="bg-white/20 text-white">Krok {stepNumber} z max. 5</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-brand-wine mb-1">{currentQuestion.q}</h2>
                  {currentQuestion.intro && (
                    <p className="text-sm text-brand-wine/70 mb-5">{currentQuestion.intro}</p>
                  )}

                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => choose(option)}
                        className="w-full text-left border border-brand-light-pink rounded-lg p-4 bg-white hover:bg-brand-light-pink/40 hover:border-brand-wine transition-colors group"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <span className="block font-semibold text-brand-wine">{option.label}</span>
                            {option.hint && (
                              <span className="block text-sm text-brand-wine/60 mt-0.5">{option.hint}</span>
                            )}
                          </div>
                          <ArrowRight className="w-5 h-5 text-brand-wine/40 group-hover:text-brand-wine flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>

                  {history.length > 1 && (
                    <div className="mt-6">
                      <Button
                        variant="outline"
                        onClick={goBack}
                        className="border-brand-wine text-brand-wine hover:bg-brand-wine hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zpět
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <p className="text-center text-xs text-brand-wine/50 mt-4">
                Žádná odpověď není špatně. Doporučení můžete kdykoliv změnit tím, že to projdete znovu.
              </p>
            </div>
          )}

          {/* Výsledek: doporučení */}
          {recommendation && (
            <div className="max-w-2xl mx-auto space-y-6">
              <Card className="shadow-soft">
                <CardHeader className="bg-gradient-brand text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Naše doporučení
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Store className="w-5 h-5 text-brand-wine" />
                      <span className="text-2xl font-bold text-brand-wine">{recommendation.platform}</span>
                    </div>
                    <p className="text-lg font-semibold text-brand-pink">{recommendation.headline}</p>
                  </div>

                  <p className="text-brand-wine/80">{recommendation.reason}</p>

                  <div className="bg-brand-light-pink/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-brand-wine" />
                      <span className="font-semibold text-brand-wine">Proč zrovna tohle</span>
                    </div>
                    <ul className="space-y-2">
                      {recommendation.strengths.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm text-brand-wine/90">
                          <CheckCircle2 className="w-4 h-4 text-brand-wine flex-shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-brand-wine/80 bg-brand-orange/10 rounded-lg p-4">
                    <span aria-hidden="true">⚠️</span>
                    <span>
                      <strong>Na co myslet:</strong> {recommendation.watchOut}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-3 bg-brand-light-pink rounded-lg">
                      <Wallet className="w-5 h-5 text-brand-wine flex-shrink-0" />
                      <div>
                        <div className="text-xs text-brand-wine/70">Orientační cena</div>
                        <div className="font-semibold text-brand-wine">{recommendation.monthlyCost}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-brand-light-pink rounded-lg">
                      <ArrowRight className="w-5 h-5 text-brand-wine flex-shrink-0" />
                      <div>
                        <div className="text-xs text-brand-wine/70">První krok</div>
                        <div className="font-semibold text-brand-wine text-sm">{recommendation.nextStep}</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-brand-wine/60 bg-white/60 rounded-lg p-3">
                    Tohle je doporučení na základě vašich odpovědí, ne neměnný verdikt. Ceny jsou orientační
                    a u poskytovatelů se mění. Než se rozhodnete, vyzkoušejte si zkušební verzi.
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={goBack}
                  className="border-brand-wine text-brand-wine hover:bg-brand-wine hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zpět na poslední otázku
                </Button>
                <Button
                  variant="outline"
                  onClick={restart}
                  className="border-brand-wine text-brand-wine hover:bg-brand-wine hover:text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Projít znovu od začátku
                </Button>
              </div>
            </div>
          )}

          {/* Cross-link */}
          <div className="max-w-2xl mx-auto mt-10 text-center">
            <p className="text-brand-wine/70 mb-3">
              Ještě si nejste jistá nápadem nebo čísly? Začněte tady.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                asChild
                variant="outline"
                className="border-brand-wine text-brand-wine hover:bg-brand-wine hover:text-white"
              >
                <Link to="/validace">
                  Ověř si nápad <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-brand-wine text-brand-wine hover:bg-brand-wine hover:text-white"
              >
                <Link to="/kalkulacka">
                  Spočítej životaschopnost <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default VyberPlatformy;
