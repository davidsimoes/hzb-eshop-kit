import { useState } from 'react';
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Navigation/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MetaTags } from '@/components/SEO/MetaTags';
import { Link } from 'react-router-dom';
import { Stethoscope, AlertTriangle, CheckCircle2, ArrowRight, Sparkles, Copy, Check } from 'lucide-react';
import { diagnose, DiagnosticInput } from '@/lib/diagnosticEngine';

const fmtCZK = (n: number) =>
  new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }).format(
    Math.round(n)
  );

const defaultInput: DiagnosticInput = {
  monthlyVisitors: 2000,
  conversionRate: 0.8,
  aov: 750,
  cogs: 400,
  extraCosts: 80,
  monthlyMarketing: 5000
};

const fields: { key: keyof DiagnosticInput; label: string; hint: string; suffix?: string }[] = [
  { key: 'monthlyVisitors', label: 'Návštěvnost za měsíc', hint: 'Kolik lidí přijde na web (z Google Analytics nebo odhadem)', suffix: 'lidí' },
  { key: 'conversionRate', label: 'Konverze', hint: 'Kolik % návštěv skončí objednávkou. Když nevíš, dej 1.', suffix: '%' },
  { key: 'aov', label: 'Průměrná objednávka (AOV)', hint: 'Kolik průměrně utratí jedna zákaznice', suffix: 'Kč' },
  { key: 'cogs', label: 'Náklady na zboží / objednávku', hint: 'Co tě stojí zboží v jedné objednávce', suffix: 'Kč' },
  { key: 'extraCosts', label: 'Ostatní náklady / objednávku', hint: 'Doprava, balné, poplatky platební brány', suffix: 'Kč' },
  { key: 'monthlyMarketing', label: 'Marketing za měsíc', hint: 'Kolik měsíčně dáváš do reklamy? Nemáš? Dej 0.', suffix: 'Kč' }
];

// Volitelná pole pro skutečný čistý zisk (mzda + fixní náklady).
const trueNetFields: { key: keyof DiagnosticInput; label: string; hint: string; suffix?: string }[] = [
  { key: 'ownerSalary', label: 'Tvoje měsíční mzda (volitelné)', hint: 'Kolik si chceš sama vyplatit za měsíc. Nech prázdné, pokud zatím nevíš.', suffix: 'Kč' },
  { key: 'fixedCosts', label: 'Fixní náklady / měsíc (volitelné)', hint: 'Nájem, software, předplatné, doména, co platíš bez ohledu na počet objednávek.', suffix: 'Kč' }
];

// Volitelná pole pro hlubší diagnostiku.
const deeperFields: { key: keyof DiagnosticInput; label: string; hint: string; suffix?: string }[] = [
  { key: 'shippingCost', label: 'Doprava / objednávku (volitelné)', hint: 'Kolik tě stojí doprava u jedné objednávky. Nech prázdné, pokud nevíš.', suffix: 'Kč' },
  { key: 'returnRate', label: 'Vratkovost (volitelné)', hint: 'Kolik % objednávek se ti vrací.', suffix: '%' },
  { key: 'repeatRate', label: 'Opakované nákupy (volitelné)', hint: 'Kolik % zákaznic u tebe nakoupí víc než jednou.', suffix: '%' },
  { key: 'mobileShare', label: 'Podíl mobilu (volitelné)', hint: 'Kolik % návštěv chodí z mobilu (z Google Analytics).', suffix: '%' },
  { key: 'mobileConversionRate', label: 'Konverze na mobilu (volitelné)', hint: 'Konverze počítaná jen z mobilních návštěv.', suffix: '%' }
];

const optionalFields = [...trueNetFields, ...deeperFields];

const Diagnostika = () => {
  const [input, setInput] = useState<DiagnosticInput>(defaultInput);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = diagnose(input);

  // Volitelná pole nechávají prázdný vstup jako undefined (genuinely "blank").
  // Povinná pole drží dosavadní chování: prázdné = 0.
  const optionalKeys = new Set<keyof DiagnosticInput>(
    optionalFields.map((f) => f.key)
  );

  const setField = (key: keyof DiagnosticInput, value: string) => {
    if (value === '') {
      const empty = optionalKeys.has(key) ? undefined : 0;
      setInput((prev) => ({ ...prev, [key]: empty }));
      return;
    }
    const num = parseFloat(value.replace(',', '.'));
    const fallback = optionalKeys.has(key) ? undefined : 0;
    setInput((prev) => ({ ...prev, [key]: isNaN(num) ? fallback : num }));
  };

  const aiPrompt = `Jsem začínající podnikatelka s e-shopem a potřebuju poradit, proč mi to dobře neprodává.

Moje současná čísla za měsíc:
- Návštěvnost: ${input.monthlyVisitors} lidí
- Konverze: ${input.conversionRate} %
- Průměrná objednávka (AOV): ${input.aov} Kč
- Náklady na zboží v objednávce: ${input.cogs} Kč
- Ostatní náklady na objednávku (doprava, balné, poplatky): ${input.extraCosts} Kč
- Marketing měsíčně: ${input.monthlyMarketing} Kč${
    result.hasTrueNetInputs
      ? `\n- Moje měsíční mzda (chci si vyplatit): ${input.ownerSalary ?? 0} Kč\n- Fixní náklady měsíčně (nájem, software, předplatné): ${input.fixedCosts ?? 0} Kč`
      : ''
  }

Z toho mi vychází: ${result.monthlyOrders} objednávek, obrat ${fmtCZK(result.monthlyRevenue)}, čistý zisk po marketingu ${fmtCZK(result.monthlyNetProfit)}.${
    result.hasTrueNetInputs
      ? ` Skutečný čistý zisk po mojí mzdě a fixních nákladech: ${fmtCZK(result.trueNetProfit)}.`
      : ' (Mzdu ani fixní náklady jsem zatím nezapočítala.)'
  }

Nejslabší článek podle rychlé diagnostiky je: ${result.topFix ? result.topFix.title : 'zatím nejasný'}.

Prosím:
1. Vysvětli mi jednoduše, kde se ztrácí nejvíc peněz.
2. Dej mi konkrétní akční plán na příští 2 týdny seřazený podle dopadu.
3. U každého kroku napiš, jak poznám, že zabral.
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

  const severityStyles: Record<string, { badge: 'destructive' | 'secondary'; icon: typeof AlertTriangle }> = {
    critical: { badge: 'destructive', icon: AlertTriangle },
    warning: { badge: 'secondary', icon: AlertTriangle },
    ok: { badge: 'secondary', icon: CheckCircle2 }
  };

  return (
    <>
      <MetaTags
        title="Diagnostika: Co když to neprodává?"
        description="Zadej svoje čísla a zjisti, kde se v e-shopu ztrácí peníze a co řešit jako první. Návštěvnost, konverze, marže, marketing."
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-gradient-soft">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb />

          <div className="max-w-3xl mx-auto text-center mb-8">
            <Badge className="bg-brand-orange/20 text-brand-wine mb-4 text-base px-4 py-2">
              <Stethoscope className="w-4 h-4 mr-2" />
              Diagnostika e-shopu
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-brand-wine mb-4">Co když to neprodává?</h1>
            <p className="text-lg text-brand-wine/70">
              Zadej svoje skutečná (nebo odhadovaná) čísla. Najdeš nejslabší článek, místo, kde se
              ztrácí nejvíc peněz, a uvidíš, co řešit jako první.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Vstupy */}
            <Card className="shadow-soft">
              <CardHeader className="bg-brand-wine text-white rounded-t-lg">
                <CardTitle>Tvoje čísla</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {fields.map((f) => (
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
                        value={input[f.key] === 0 ? '' : input[f.key]}
                        placeholder="0"
                        onChange={(e) => setField(f.key, e.target.value)}
                        className="pr-14"
                      />
                      {f.suffix && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-brand-wine/50">
                          {f.suffix}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-brand-wine/60 mt-1">{f.hint}</p>
                  </div>
                ))}

                {/* Volitelné vstupy. Pro výpočet skutečného čistého zisku. */}
                <div className="pt-2 border-t border-brand-light-pink">
                  <p className="text-xs font-semibold text-brand-wine/80 mb-3">
                    Volitelné: pro skutečný čistý zisk (po tvojí mzdě a fixních nákladech)
                  </p>
                  {trueNetFields.map((f) => (
                    <div key={f.key} className="mb-4">
                      <Label htmlFor={f.key} className="text-brand-wine font-semibold">
                        {f.label}
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id={f.key}
                          type="number"
                          inputMode="decimal"
                          min={0}
                          value={input[f.key] == null || input[f.key] === 0 ? '' : input[f.key]}
                          placeholder="nech prázdné"
                          onChange={(e) => setField(f.key, e.target.value)}
                          className="pr-14"
                        />
                        {f.suffix && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-brand-wine/50">
                            {f.suffix}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-brand-wine/60 mt-1">{f.hint}</p>
                    </div>
                  ))}
                </div>

                {/* Volitelné vstupy. Pro hlubší diagnostiku. */}
                <div className="pt-2 border-t border-brand-light-pink">
                  <p className="text-xs font-semibold text-brand-wine/80 mb-3">
                    Volitelné: pro hlubší diagnostiku (doprava, vratky, opakované nákupy, mobil)
                  </p>
                  {deeperFields.map((f) => (
                    <div key={f.key} className="mb-4">
                      <Label htmlFor={f.key} className="text-brand-wine font-semibold">
                        {f.label}
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id={f.key}
                          type="number"
                          inputMode="decimal"
                          min={0}
                          value={input[f.key] == null || input[f.key] === 0 ? '' : input[f.key]}
                          placeholder="nech prázdné"
                          onChange={(e) => setField(f.key, e.target.value)}
                          className="pr-14"
                        />
                        {f.suffix && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-brand-wine/50">
                            {f.suffix}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-brand-wine/60 mt-1">{f.hint}</p>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full bg-brand-wine hover:bg-brand-wine/90"
                  onClick={() => setSubmitted(true)}
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Diagnostikovat
                </Button>
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
                      <div className="text-xl font-bold text-brand-wine">{result.monthlyOrders}</div>
                      <div className="text-xs text-brand-wine/70">objednávek / měs.</div>
                    </div>
                    <div className="text-center p-3 bg-brand-light-pink rounded-lg">
                      <div className="text-xl font-bold text-brand-wine">{fmtCZK(result.monthlyRevenue)}</div>
                      <div className="text-xs text-brand-wine/70">obrat / měs.</div>
                    </div>
                    <div className="text-center p-3 bg-brand-light-pink rounded-lg">
                      <div className="text-xl font-bold text-brand-wine">{result.grossMargin.toFixed(0)} %</div>
                      <div className="text-xs text-brand-wine/70">hrubá marže</div>
                    </div>
                    <div
                      className={`text-center p-3 rounded-lg ${
                        result.monthlyNetProfit >= 0 ? 'bg-brand-light-pink' : 'bg-destructive/10'
                      }`}
                    >
                      <div
                        className={`text-xl font-bold ${
                          result.monthlyNetProfit >= 0 ? 'text-brand-wine' : 'text-destructive'
                        }`}
                      >
                        {fmtCZK(result.monthlyNetProfit)}
                      </div>
                      <div className="text-xs text-brand-wine/70">zbývá po marketingu</div>
                    </div>
                  </div>
                  <p
                    className={`text-sm font-medium p-3 rounded-lg ${
                      result.isProfitable ? 'bg-brand-light-pink text-brand-wine' : 'bg-destructive/10 text-destructive'
                    }`}
                  >
                    {result.headline}
                  </p>
                  {result.hasTrueNetInputs ? (
                    <>
                      <div
                        className={`text-center p-4 rounded-lg ${
                          result.trueNetProfit >= 0 ? 'bg-brand-light-pink' : 'bg-destructive/10'
                        }`}
                      >
                        <div
                          className={`text-2xl font-bold ${
                            result.trueNetProfit >= 0 ? 'text-brand-wine' : 'text-destructive'
                          }`}
                        >
                          {fmtCZK(result.trueNetProfit)}
                        </div>
                        <div className="text-xs text-brand-wine/70 mt-1">
                          skutečný čistý zisk / měs. (po marketingu, tvojí mzdě {fmtCZK(result.ownerSalary)} i fixních nákladech {fmtCZK(result.fixedCosts)})
                        </div>
                      </div>
                      <p className="text-xs text-brand-wine/70 bg-brand-orange/10 p-3 rounded-lg">
                        ✅ Tohle už je <strong>poctivé číslo</strong>, počítá s tvojí mzdou i fixními náklady.
                        Pořád v něm ale není daň ani rezerva na horší měsíc, takže si nech polštář.
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-brand-wine/70 bg-brand-orange/10 p-3 rounded-lg">
                      ⚠️ Tohle <strong>nezapočítává tvůj čas ani fixní náklady</strong> (nájem, software, předplatné).
                      I „kladné" číslo tady tě nemusí uživit, doplň si výše vlastní mzdu a fixní náklady a uvidíš
                      <strong> skutečný čistý zisk</strong>.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Diagnóza */}
              {submitted && result.issues.length > 0 && (
                <Card className="shadow-soft">
                  <CardHeader className="bg-brand-pink text-white rounded-t-lg">
                    <CardTitle>Co řešit (seřazeno podle dopadu)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {result.issues.map((issue, i) => {
                      const s = severityStyles[issue.severity];
                      const Icon = s.icon;
                      return (
                        <div key={issue.id} className="border border-brand-light-pink rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-wine text-white flex items-center justify-center text-sm font-bold">
                              {i + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <Icon className="w-4 h-4 text-brand-wine" />
                                <span className="font-bold text-brand-wine">{issue.title}</span>
                                <Badge variant={s.badge}>
                                  {issue.severity === 'critical' ? 'Kritické' : 'Zlepšit'}
                                </Badge>
                              </div>
                              <p className="text-sm text-brand-wine/80 mb-2">{issue.finding}</p>
                              <p className="text-sm text-brand-wine">
                                <strong>Co s tím:</strong> {issue.fix}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              )}

              {submitted && result.issues.length === 0 && result.monthlyOrders > 0 && (
                <Card className="shadow-soft border-brand-light-pink">
                  <CardContent className="p-6 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-brand-wine" />
                    <p className="text-brand-wine">
                      Nenašli jsme zásadní problém, základ vypadá zdravě. Soustřeď se na škálování
                      návštěvnosti a opakované nákupy.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* AI vrstva */}
          <div className="max-w-5xl mx-auto mt-8">
            <Card className="border-brand-light-pink bg-gradient-to-br from-brand-light-pink/20 to-brand-light-pink/40">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-brand-wine" />
                  <h3 className="text-lg font-bold text-brand-wine">Nech si poradit od AI</h3>
                </div>
                <p className="text-sm text-brand-wine/80 mb-4">
                  Zkopíruj tenhle prompt s tvými čísly a vlož ho do ChatGPT, Claude nebo Gemini.
                  Dostaneš konkrétní akční plán na míru.
                </p>
                <pre className="text-xs bg-white/70 rounded-lg p-4 overflow-x-auto text-brand-wine/90 whitespace-pre-wrap mb-3">
                  {aiPrompt}
                </pre>
                <Button onClick={copyPrompt} variant="outline" className="border-brand-wine text-brand-wine hover:bg-brand-wine hover:text-white">
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Zkopírováno' : 'Zkopírovat prompt'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Cross-link */}
          <div className="max-w-5xl mx-auto mt-8 text-center">
            <p className="text-brand-wine/70 mb-3">Ještě nemáš čísla, protože teprve začínáš?</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild variant="outline" className="border-brand-wine text-brand-wine hover:bg-brand-wine hover:text-white">
                <Link to="/validace">
                  Ověř si nápad <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-brand-wine text-brand-wine hover:bg-brand-wine hover:text-white">
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

export default Diagnostika;
