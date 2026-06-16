import { useState } from 'react';
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Navigation/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MetaTags } from '@/components/SEO/MetaTags';
import { Link } from 'react-router-dom';
import { Calculator, AlertTriangle, CheckCircle2, ArrowRight, Sparkles, Copy, Check } from 'lucide-react';

// ---------------------------------------------------------------------------
// Engine (čistá logika, žádná závislost na Reactu). Inlined do jednoho souboru.
// ---------------------------------------------------------------------------

type BenefitType = 'revenue' | 'time';
type Verdict = 'win' | 'maybe' | 'loss' | 'unknown';

interface RoiInput {
  oneTimeCost: number;
  monthlyCost: number;
  benefitType: BenefitType;
  monthlyBenefit: number;
  hoursSavedPerMonth: number;
  hourlyValue: number;
  horizonMonths: number;
  softFactors: string[];
}

interface RoiResult {
  monthlyBenefitValue: number;
  netMonthly: number;
  totalCost: number;
  totalBenefit: number;
  netOverHorizon: number;
  paybackMonths: number | null;
  roiPct: number;
  verdict: Verdict;
  confidenceNote: string;
}

const SOFT_FACTORS: { id: string; label: string }[] = [
  { id: 'satisfaction', label: 'Spokojenější zákaznice (lepší zážitek z nákupu)' },
  { id: 'comfort', label: 'Pohodlnější administrace / méně stresu' },
  { id: 'errors', label: 'Méně chyb a reklamací' },
  { id: 'brand', label: 'Lepší dojem ze značky / profesionalita' },
  { id: 'scalability', label: 'Snazší růst do budoucna' },
  { id: 'learning', label: 'Naučím se něco, co využiju i jinde' },
];

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const nonNeg = (n: number) => Math.max(0, n);

function computeRoi(input: RoiInput): RoiResult {
  const monthlyBenefitValue =
    input.benefitType === 'revenue'
      ? nonNeg(input.monthlyBenefit)
      : nonNeg(input.hoursSavedPerMonth) * nonNeg(input.hourlyValue);

  const oneTime = nonNeg(input.oneTimeCost);
  const monthly = nonNeg(input.monthlyCost);
  const horizon = clamp(Math.round(input.horizonMonths), 1, 36);

  const netMonthly = monthlyBenefitValue - monthly;
  const totalCost = oneTime + monthly * horizon;
  const totalBenefit = monthlyBenefitValue * horizon;
  const netOverHorizon = totalBenefit - totalCost;

  // Doba návratnosti (měsíce, než jednorázový náklad splatí čistý měsíční přínos)
  const paybackMonths = netMonthly <= 0 ? null : oneTime / netMonthly;

  // ROI % za horizont
  const roiPct =
    totalCost > 0 ? (netOverHorizon / totalCost) * 100 : totalBenefit > 0 ? Infinity : 0;

  // Verdikt (jen z tvrdých čísel)
  const hasInput = oneTime + monthly > 0 || monthlyBenefitValue > 0;
  let verdict: Verdict;
  if (!hasInput) {
    verdict = 'unknown';
  } else if (netMonthly <= 0) {
    verdict = 'loss';
  } else if (paybackMonths !== null && paybackMonths <= horizon && netOverHorizon > 0) {
    verdict = 'win';
  } else if (paybackMonths !== null && paybackMonths <= horizon * 2) {
    verdict = 'maybe';
  } else {
    verdict = 'loss';
  }

  // Confidence note (měkké faktory ovlivňují JEN text, NE matematiku)
  const softCount = input.softFactors.length;
  const softTail =
    softCount > 0
      ? `Navíc k tomu ${softCount} těžko měřitelných plusů, ber je jako bonus, ne jako důvod sám o sobě.`
      : 'Žádné měkké přínosy jsi neoznačila, takže se opíráš čistě o návratnost. To je v pořádku.';

  let confidenceNote: string;
  if (verdict === 'win') {
    confidenceNote = 'Čísla mluví jasně pro. ' + softTail;
  } else if (verdict === 'maybe') {
    confidenceNote =
      softCount >= 2
        ? `Tvrdá čísla jsou na hraně, ale označila jsi ${softCount} těžko měřitelných přínosů. Ty můžou rozhodnout ve prospěch. Číslům samotným ale úplně nevěř, počítej s rezervou.`
        : 'Tvrdá čísla jsou na hraně. Než se rozhodneš, zkus přínos ověřit (test, kratší závazek, měsíční tarif místo ročního).';
  } else if (verdict === 'loss') {
    confidenceNote =
      softCount >= 3
        ? `Podle čísel se to finančně nevyplatí. Označila jsi ale ${softCount} měkkých přínosů. Pokud jsou pro tebe opravdu důležité (a ne jen "bylo by hezké"), může to dávat smysl jako vědomá investice do kvality, ne do návratnosti.`
        : 'Podle čísel se to nevyplatí a měkké přínosy to nevyváží. Buď sniž náklad, zvyš přínos, nebo to odlož.';
  } else {
    confidenceNote = 'Doplň náklady i očekávaný přínos, ať je co počítat.';
  }

  return {
    monthlyBenefitValue,
    netMonthly,
    totalCost,
    totalBenefit,
    netOverHorizon,
    paybackMonths,
    roiPct,
    verdict,
    confidenceNote,
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

const fmtCZK = (n: number) =>
  new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }).format(
    Math.round(n)
  );

const defaultInput: RoiInput = {
  oneTimeCost: 0,
  monthlyCost: 0,
  benefitType: 'revenue',
  monthlyBenefit: 0,
  hoursSavedPerMonth: 0,
  hourlyValue: 300,
  horizonMonths: 12,
  softFactors: [],
};

const verdictStyles: Record<
  Verdict,
  { badge: string; box: string; icon: typeof AlertTriangle; sentence: string }
> = {
  win: {
    badge: 'Vyplatí se',
    box: 'bg-brand-light-pink text-brand-wine',
    icon: CheckCircle2,
    sentence: 'Vrátí se ti to a v zadaném horizontu vyděláš navíc.',
  },
  maybe: {
    badge: 'Na zvážení',
    box: 'bg-brand-orange/10 text-brand-wine',
    icon: AlertTriangle,
    sentence: 'Vrátí se to, ale pomalu nebo jen těsně. Stojí za to si to rozmyslet.',
  },
  loss: {
    badge: 'Spíš ne',
    box: 'bg-destructive/10 text-destructive',
    icon: AlertTriangle,
    sentence: 'Podle čísel se to v tomto nastavení finančně nevyplatí.',
  },
  unknown: {
    badge: 'Doplň čísla',
    box: 'bg-brand-light-pink text-brand-wine',
    icon: AlertTriangle,
    sentence: 'Zatím není co počítat. Doplň náklady i očekávaný přínos.',
  },
};

const RoiKalkulacka = () => {
  const [input, setInput] = useState<RoiInput>(defaultInput);
  const [copied, setCopied] = useState(false);

  const r = computeRoi(input);
  const v = verdictStyles[r.verdict];
  const VIcon = v.icon;

  const setNum = (key: keyof RoiInput, value: string) => {
    const num = value === '' ? 0 : parseFloat(value.replace(',', '.'));
    setInput((prev) => ({ ...prev, [key]: isNaN(num) ? 0 : num }));
  };

  const toggleSoft = (id: string) =>
    setInput((prev) => ({
      ...prev,
      softFactors: prev.softFactors.includes(id)
        ? prev.softFactors.filter((x) => x !== id)
        : [...prev.softFactors, id],
    }));

  const benefitLine =
    input.benefitType === 'revenue'
      ? `${input.monthlyBenefit} Kč/měs (čistý, po marži)`
      : `${input.hoursSavedPerMonth} h/měs × ${input.hourlyValue} Kč/h`;

  const aiPrompt = `Zvažuju e-commerce výdaj a chci poradit, jestli se vyplatí.

Jednorázový náklad: ${input.oneTimeCost} Kč
Měsíční náklad: ${input.monthlyCost} Kč
Očekávaný přínos: ${benefitLine}
Horizont: ${input.horizonMonths} měsíců
Měkké přínosy: ${input.softFactors.length ? input.softFactors.map((id) => SOFT_FACTORS.find((s) => s.id === id)?.label ?? id).join(', ') : 'žádné'}

Spočítané: doba návratnosti ${
    r.paybackMonths === null ? 'se nevrátí' : r.paybackMonths.toFixed(1) + ' měs'
  }, čistý výsledek za horizont ${fmtCZK(r.netOverHorizon)}, ROI ${
    r.roiPct === Infinity ? 'nekonečné' : r.roiPct.toFixed(0) + ' %'
  }.

Prosím:
1. Řekni narovinu, jestli do toho jít.
2. Na co si dát pozor u odhadu přínosu.
3. Jak přínos levně ověřit dřív, než se zavážu.
Mluv ke mně lidsky, bez žargonu.`;

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(aiPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* schránka nedostupná, ignoruj */
    }
  };

  return (
    <>
      <MetaTags
        title="ROI kalkulačka: Vyplatí se ten výdaj?"
        description="Spočítej návratnost jakéhokoli e-commerce výdaje (plugin, nástroj, pomoc s adminem). Doba návratnosti, čistý výsledek, jasný verdikt."
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-gradient-soft">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb />

          <div className="max-w-3xl mx-auto text-center mb-8">
            <Badge className="bg-brand-orange/20 text-brand-wine mb-4 text-base px-4 py-2">
              <Calculator className="w-4 h-4 mr-2" />
              ROI kalkulačka
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-brand-wine mb-4">Vyplatí se ten výdaj?</h1>
            <p className="text-lg text-brand-wine/70">
              Plugin, nástroj, fotograf, pomoc s adminem. Zadej, co tě to stojí a co ti to přinese, a
              uvidíš, za jak dlouho se to vrátí a jestli do toho jít.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Vstupy */}
            <Card className="shadow-soft">
              <CardHeader className="bg-brand-wine text-white rounded-t-lg">
                <CardTitle>Tvoje čísla</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {/* Náklady */}
                {(
                  [
                    {
                      key: 'oneTimeCost' as const,
                      label: 'Jednorázový náklad',
                      suffix: 'Kč',
                      hint: 'Co zaplatíš hned na začátku (nákup, instalace, nastavení). Nemáš? Dej 0.',
                    },
                    {
                      key: 'monthlyCost' as const,
                      label: 'Měsíční náklad',
                      suffix: 'Kč / měs.',
                      hint: 'Pravidelný poplatek (předplatné, údržba). Nemáš? Dej 0.',
                    },
                  ]
                ).map((f) => (
                  <div key={f.key}>
                    <Label htmlFor={f.key} className="text-brand-wine font-semibold">
                      {f.label}
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id={f.key}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        placeholder="0"
                        value={input[f.key] === 0 ? '' : input[f.key]}
                        onChange={(e) => setNum(f.key, e.target.value)}
                        className="pr-20"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-brand-wine/50">
                        {f.suffix}
                      </span>
                    </div>
                    <p className="text-xs text-brand-wine/60 mt-1">{f.hint}</p>
                  </div>
                ))}

                {/* Typ přínosu */}
                <div>
                  <Label className="text-brand-wine font-semibold">Co ti to přinese?</Label>
                  <RadioGroup
                    value={input.benefitType}
                    className="mt-2 grid grid-cols-2 gap-2"
                    onValueChange={(val) =>
                      setInput((prev) => ({ ...prev, benefitType: val as BenefitType }))
                    }
                  >
                    {(
                      [
                        ['revenue', 'Vydělá peníze'],
                        ['time', 'Ušetří čas'],
                      ] as const
                    ).map(([val, lbl]) => (
                      <label
                        key={val}
                        htmlFor={`bt-${val}`}
                        className="flex items-center gap-2 p-3 bg-brand-light-pink/60 rounded-lg cursor-pointer hover:bg-brand-light-pink"
                      >
                        <RadioGroupItem id={`bt-${val}`} value={val} />
                        <span className="text-sm font-semibold text-brand-wine">{lbl}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Podmíněná pole přínosu */}
                {input.benefitType === 'revenue' ? (
                  <div>
                    <Label htmlFor="monthlyBenefit" className="text-brand-wine font-semibold">
                      Měsíční přínos v penězích
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="monthlyBenefit"
                        type="number"
                        inputMode="decimal"
                        min={0}
                        placeholder="0"
                        value={input.monthlyBenefit === 0 ? '' : input.monthlyBenefit}
                        onChange={(e) => setNum('monthlyBenefit', e.target.value)}
                        className="pr-20"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-brand-wine/50">
                        Kč / měs.
                      </span>
                    </div>
                    <p className="text-xs text-brand-wine/60 mt-1">
                      Kolik měsíčně navíc vyděláš a reálně ti zůstane (tržby × marže), ne obrat.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        ['hoursSavedPerMonth', 'Ušetřený čas', 'h / měs.'],
                        ['hourlyValue', 'Hodnota hodiny', 'Kč / h'],
                      ] as [keyof RoiInput, string, string][]
                    ).map(([key, lbl, sfx]) => (
                      <div key={key}>
                        <Label htmlFor={key} className="text-brand-wine font-semibold text-sm">
                          {lbl}
                        </Label>
                        <div className="relative mt-1">
                          <Input
                            id={key}
                            type="number"
                            inputMode="decimal"
                            min={0}
                            placeholder="0"
                            value={input[key] === 0 ? '' : input[key]}
                            onChange={(e) => setNum(key, e.target.value)}
                            className="pr-12"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-brand-wine/50">
                            {sfx}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Horizont */}
                <div>
                  <Label className="text-brand-wine font-semibold">
                    Časový horizont: <span className="text-brand-orange">{input.horizonMonths} měsíců</span>
                  </Label>
                  <p className="text-xs text-brand-wine/60 mt-1 mb-3">
                    Na jak dlouho to posuzuješ (jak dlouho ti to bude sloužit).
                  </p>
                  <Slider
                    min={1}
                    max={36}
                    step={1}
                    value={[input.horizonMonths]}
                    onValueChange={([val]) => setInput((prev) => ({ ...prev, horizonMonths: val }))}
                  />
                </div>

                {/* Soft faktory */}
                <div>
                  <Label className="text-brand-wine font-semibold">Těžko měřitelné přínosy</Label>
                  <p className="text-xs text-brand-wine/60 mb-2">
                    Neovlivní výpočet, ale upraví poznámku o jistotě.
                  </p>
                  <div className="grid gap-2">
                    {SOFT_FACTORS.map((s) => (
                      <label
                        key={s.id}
                        htmlFor={`sf-${s.id}`}
                        className="flex items-start gap-3 p-2.5 bg-brand-light-pink/60 rounded-lg cursor-pointer hover:bg-brand-light-pink"
                      >
                        <Checkbox
                          id={`sf-${s.id}`}
                          checked={input.softFactors.includes(s.id)}
                          onCheckedChange={() => toggleSoft(s.id)}
                          className="mt-0.5"
                        />
                        <span className="text-sm text-brand-wine">{s.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Výsledek */}
            <div className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader className="bg-gradient-brand text-white rounded-t-lg">
                  <CardTitle>Rychlý přehled</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-brand-light-pink rounded-lg">
                      <div className="text-xl font-bold text-brand-wine">
                        {r.paybackMonths === null ? 'nevrátí se' : `${r.paybackMonths.toFixed(1)} měs.`}
                      </div>
                      <div className="text-xs text-brand-wine/70">doba návratnosti</div>
                    </div>
                    <div
                      className={`text-center p-3 rounded-lg ${
                        r.netOverHorizon >= 0 ? 'bg-brand-light-pink' : 'bg-destructive/10'
                      }`}
                    >
                      <div
                        className={`text-xl font-bold ${
                          r.netOverHorizon >= 0 ? 'text-brand-wine' : 'text-destructive'
                        }`}
                      >
                        {fmtCZK(r.netOverHorizon)}
                      </div>
                      <div className="text-xs text-brand-wine/70">čistý výsledek za horizont</div>
                    </div>
                    <div className="text-center p-3 bg-brand-light-pink rounded-lg">
                      <div className="text-xl font-bold text-brand-wine">
                        {r.roiPct === Infinity ? '∞' : `${r.roiPct.toFixed(0)} %`}
                      </div>
                      <div className="text-xs text-brand-wine/70">ROI za horizont</div>
                    </div>
                    <div
                      className={`text-center p-3 rounded-lg ${
                        r.netMonthly >= 0 ? 'bg-brand-light-pink' : 'bg-destructive/10'
                      }`}
                    >
                      <div
                        className={`text-xl font-bold ${
                          r.netMonthly >= 0 ? 'text-brand-wine' : 'text-destructive'
                        }`}
                      >
                        {fmtCZK(r.netMonthly)}
                      </div>
                      <div className="text-xs text-brand-wine/70">čistý měsíční přínos</div>
                    </div>
                  </div>
                  <p className="text-xs text-brand-wine/70 bg-brand-orange/10 p-3 rounded-lg">
                    ⚠️ Přínos zadávej v penězích, které ti reálně zůstanou (tržby × marže), ne v obratu. U
                    času používej hodnotu, za kterou bys ten čas opravdu prodala.
                  </p>
                </CardContent>
              </Card>

              {/* Verdikt */}
              <Card className="shadow-soft">
                <CardHeader className="bg-brand-pink text-white rounded-t-lg">
                  <CardTitle>Verdikt</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className={`flex items-center gap-2 p-3 rounded-lg ${v.box}`}>
                    <VIcon className="w-5 h-5 flex-shrink-0" />
                    <Badge className="bg-brand-wine text-white">{v.badge}</Badge>
                    <span className="text-sm">{v.sentence}</span>
                  </div>
                  <p className="text-sm text-brand-wine/90 bg-brand-orange/10 p-3 rounded-lg">
                    {r.confidenceNote}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* AI vrstva */}
          <div className="max-w-5xl mx-auto mt-8">
            <Card className="border-brand-light-pink bg-gradient-to-br from-brand-light-pink/20 to-brand-light-pink/40">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-brand-wine" />
                  <h3 className="text-lg font-bold text-brand-wine">Nech si rozhodnutí potvrdit od AI</h3>
                </div>
                <p className="text-sm text-brand-wine/80 mb-4">
                  Zkopíruj prompt s tvými čísly a vlož ho do ChatGPT, Claude nebo Gemini.
                </p>
                <pre className="text-xs bg-white/70 rounded-lg p-4 overflow-x-auto text-brand-wine/90 whitespace-pre-wrap mb-3">
                  {aiPrompt}
                </pre>
                <Button
                  onClick={copyPrompt}
                  variant="outline"
                  className="border-brand-wine text-brand-wine hover:bg-brand-wine hover:text-white"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Zkopírováno' : 'Zkopírovat prompt'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Cross-link */}
          <div className="max-w-5xl mx-auto mt-8 text-center">
            <p className="text-brand-wine/70 mb-3">Pokračuj dál:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                asChild
                variant="outline"
                className="border-brand-wine text-brand-wine hover:bg-brand-wine hover:text-white"
              >
                <Link to="/kalkulacka">
                  Spočítej životaschopnost <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-brand-wine text-brand-wine hover:bg-brand-wine hover:text-white"
              >
                <Link to="/diagnostika">
                  Diagnostika e-shopu <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RoiKalkulacka;
