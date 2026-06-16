import { useMemo, useState } from 'react';
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
  Sparkles,
  Trophy,
  Scale
} from 'lucide-react';
import {
  ENGINE_QUESTIONS,
  TOTAL_STEPS,
  computeRecommendation,
  type Answers,
  type AnswerOption
} from '@/data/platformEngine';

/**
 * Průvodce výběrem platformy pro e-shop.
 *
 * Místo jednoduchého stromu "odpověď -> štítek" sbírá odpovědi na 6 otázek,
 * které spustí vážený rozhodovací engine (src/data/platformEngine.ts). Ten
 * spočítá skóre pro všechny platformy a vrátí hlavní doporučení, druhou
 * nejlepší variantu, transparentní pořadí a důvody navázané na konkrétní
 * odpovědi. Cílem je, aby doporučení působilo věrohodně a nuancovaně, ne
 * jako náhodný výsledek.
 */

const VyberPlatformy = () => {
  // index aktuální otázky (0..TOTAL_STEPS-1)
  const [stepIndex, setStepIndex] = useState(0);
  // odpovědi { questionId: optionId }
  const [answers, setAnswers] = useState<Answers>({});
  // jakmile je hotovo, držíme zmrazené odpovědi pro výpočet
  const [finished, setFinished] = useState(false);

  const currentQuestion = ENGINE_QUESTIONS[stepIndex];
  const stepNumber = stepIndex + 1;

  const result = useMemo(
    () => (finished ? computeRecommendation(answers) : null),
    [finished, answers]
  );

  const choose = (option: AnswerOption) => {
    const updated = { ...answers, [currentQuestion.id]: option.id };
    setAnswers(updated);
    if (stepIndex + 1 >= TOTAL_STEPS) {
      setFinished(true);
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const goBack = () => {
    if (finished) {
      setFinished(false);
      return;
    }
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
    }
  };

  const restart = () => {
    setStepIndex(0);
    setAnswers({});
    setFinished(false);
  };

  return (
    <>
      <MetaTags
        title="Jakou platformu na e-shop? Průvodce výběrem"
        description="Odpověz na šest jednoduchých otázek a zjisti, jestli je pro tvůj e-shop nejlepší Shopify, Shoptet, Upgates, WooCommerce, jednoduchý web (Wix) nebo zatím tržiště. Srozumitelně a pro začátečnice."
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
              Žádný univerzální vítěz neexistuje, vždycky jde o kompromis. Odpověz na šest
              otázek a my podle nich porovnáme platformy mezi sebou a doporučíme ti tu, která
              sedne na to, co prodáváš, kolik chceš investovat a kam míříš.
            </p>
          </div>

          {/* Průvodce: otázka */}
          {!result && currentQuestion && (
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-soft">
                <CardHeader className="bg-brand-wine text-white rounded-t-lg">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="flex items-center gap-2">
                      <Compass className="w-5 h-5" />
                      Otázka {stepNumber}
                    </CardTitle>
                    <Badge className="bg-white/20 text-white">
                      Krok {stepNumber} z {TOTAL_STEPS}
                    </Badge>
                  </div>
                  {/* jemný progress proužek */}
                  <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-orange transition-all duration-300"
                      style={{ width: `${(stepNumber / TOTAL_STEPS) * 100}%` }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-brand-wine mb-1">{currentQuestion.q}</h2>
                  {currentQuestion.intro && (
                    <p className="text-sm text-brand-wine/70 mb-5">{currentQuestion.intro}</p>
                  )}

                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => {
                      const isSelected = answers[currentQuestion.id] === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => choose(option)}
                          className={`w-full text-left border rounded-lg p-4 bg-white hover:bg-brand-light-pink/40 hover:border-brand-wine transition-colors group ${
                            isSelected ? 'border-brand-wine ring-2 ring-brand-wine/30' : 'border-brand-light-pink'
                          }`}
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
                      );
                    })}
                  </div>

                  {stepIndex > 0 && (
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
                Žádná odpověď není špatně. Porovnáváme platformy podle všech tvých odpovědí
                dohromady, ne podle jediné otázky.
              </p>
            </div>
          )}

          {/* Výsledek: doporučení */}
          {result && (
            <div className="max-w-2xl mx-auto space-y-6">
              <Card className="shadow-soft">
                <CardHeader className="bg-gradient-brand text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    {result.isClose ? 'Tvoje volba (těsné rozhodnutí)' : 'Naše doporučení'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Store className="w-5 h-5 text-brand-wine" />
                      <span className="text-2xl font-bold text-brand-wine">
                        {result.primary.platform.name}
                      </span>
                      <Badge className="bg-brand-orange/20 text-brand-wine">
                        {result.primary.matchPct}% shoda
                      </Badge>
                    </div>
                    <p className="text-lg font-semibold text-brand-pink">
                      {result.primary.platform.tagline}
                    </p>
                  </div>

                  {/* Proč právě tohle, navázané na ODPOVĚDI */}
                  <div className="bg-brand-light-pink/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-brand-wine" />
                      <span className="font-semibold text-brand-wine">
                        Proč zrovna tohle (podle tvých odpovědí)
                      </span>
                    </div>
                    {result.reasons.length > 0 && (
                      <p className="text-sm text-brand-wine/90 mb-3">
                        Vybrali jsme to hlavně proto, že {joinReasons(result.reasons)}.
                      </p>
                    )}
                    <ul className="space-y-2">
                      {result.primary.platform.strengths.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm text-brand-wine/90">
                          <CheckCircle2 className="w-4 h-4 text-brand-wine flex-shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Poctivý caveat */}
                  <div className="flex items-start gap-2 text-sm text-brand-wine/80 bg-brand-orange/10 rounded-lg p-4">
                    <span aria-hidden="true">⚠️</span>
                    <span>
                      <strong>Na co myslet:</strong> {result.primary.platform.watchOut}
                    </span>
                  </div>

                  {/* Cena + první krok */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-3 bg-brand-light-pink rounded-lg">
                      <Wallet className="w-5 h-5 text-brand-wine flex-shrink-0" />
                      <div>
                        <div className="text-xs text-brand-wine/70">Orientační cena</div>
                        <div className="font-semibold text-brand-wine">
                          {result.primary.platform.monthlyCost}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-brand-light-pink rounded-lg">
                      <ArrowRight className="w-5 h-5 text-brand-wine flex-shrink-0" />
                      <div>
                        <div className="text-xs text-brand-wine/70">První krok</div>
                        <div className="font-semibold text-brand-wine text-sm">
                          {result.primary.platform.nextStep}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Druhá nejlepší varianta */}
              {result.runnerUp && (
                <Card className="shadow-soft border-brand-light-pink">
                  <CardHeader className="bg-brand-light-pink/60 rounded-t-lg py-4">
                    <CardTitle className="flex items-center gap-2 text-brand-wine text-base">
                      <Scale className="w-4 h-4" />
                      Druhá nejlepší varianta: {result.runnerUp.platform.name}
                      <Badge className="bg-white/70 text-brand-wine ml-auto">
                        {result.runnerUp.matchPct}% shoda
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-3">
                    <p className="text-sm text-brand-wine/80">{result.runnerUp.platform.tagline}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                      <span className="text-brand-wine/70">
                        <strong className="text-brand-wine">Cena:</strong>{' '}
                        {result.runnerUp.platform.monthlyCost}
                      </span>
                    </div>
                    <p className="text-sm text-brand-wine/70">
                      <strong className="text-brand-wine">Kdy ji zvolit:</strong>{' '}
                      {result.runnerUp.platform.watchOut}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Transparentní pořadí, ať je vidět, že to není náhoda */}
              <Card className="shadow-soft">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Scale className="w-4 h-4 text-brand-wine" />
                    <span className="font-semibold text-brand-wine text-sm">
                      Jak dopadly ostatní platformy
                    </span>
                  </div>
                  <div className="space-y-2">
                    {result.ranking.map((r, i) => (
                      <div key={r.platform.key} className="flex items-center gap-3">
                        <span className="text-xs text-brand-wine/50 w-4 flex-shrink-0">{i + 1}.</span>
                        <span className="text-sm text-brand-wine w-44 flex-shrink-0 truncate">
                          {r.platform.name}
                        </span>
                        <div className="flex-1 h-2 bg-brand-light-pink/60 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-wine/70 rounded-full transition-all"
                            style={{ width: `${Math.max(r.matchPct, 3)}%` }}
                          />
                        </div>
                        <span className="text-xs text-brand-wine/60 w-10 text-right flex-shrink-0">
                          {r.matchPct}%
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-brand-wine/50 mt-3">
                    Procenta ukazují, jak moc každá platforma sedí na tvé odpovědi v porovnání
                    s vítězem. Nejde o objektivní známku platformy, ale o shodu s tvojí situací.
                  </p>
                </CardContent>
              </Card>

              <p className="text-xs text-brand-wine/60 bg-white/60 rounded-lg p-3">
                Tohle je doporučení na základě tvých odpovědí, ne neměnný verdikt. Ceny jsou
                orientační a u poskytovatelů se mění. Než se rozhodneš, vyzkoušej si zkušební verzi,
                skoro všechny platformy ji mají zdarma.
              </p>

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
              Ještě si nejsi jistá nápadem nebo čísly? Začni tady.
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

/** Spojí 2-3 důvody do přirozené české věty. */
function joinReasons(reasons: string[]): string {
  if (reasons.length === 1) return reasons[0];
  if (reasons.length === 2) return `${reasons[0]} a ${reasons[1]}`;
  return `${reasons.slice(0, -1).join(', ')} a ${reasons[reasons.length - 1]}`;
}

export default VyberPlatformy;
