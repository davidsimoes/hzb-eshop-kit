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

const Diagnostika = () => {
  const [input, setInput] = useState<DiagnosticInput>(defaultInput);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = diagnose(input);

  const setField = (key: keyof DiagnosticInput, value: string) => {
    const num = value === '' ? 0 : parseFloat(value.replace(',', '.'));
    setInput((prev) => ({ ...prev, [key]: isNaN(num) ? 0 : num }));
  };

  const aiPrompt = `Jsem začínající podnikatelka s e-shopem a potřebuju poradit, proč mi to dobře neprodává.

Moje současná čísla za měsíc:
- Návštěvnost: ${input.monthlyVisitors} lidí
- Konverze: ${input.conversionRate} %
- Průměrná objednávka (AOV): ${input.aov} Kč
- Náklady na zboží v objednávce: ${input.cogs} Kč
- Ostatní náklady na objednávku (doprava, balné, poplatky): ${input.extraCosts} Kč
- Marketing měsíčně: ${input.monthlyMarketing} Kč

Z toho mi vychází: ${result.monthlyOrders} objednávek, obrat ${fmtCZK(result.monthlyRevenue)}, čistý zisk po marketingu ${fmtCZK(result.monthlyNetProfit)}.

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
      /* schránka nedostupná — ignoruj */
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
              Zadej svoje skutečná (nebo odhadovaná) čísla. Najdeš nejslabší článek — místo, kde se
              ztrácí nejvíc peněz — a uvidíš, co řešit jako první.
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
                      <div className="text-xs text-brand-wine/70">čistý zisk / měs.</div>
                    </div>
                  </div>
                  <p
                    className={`text-sm font-medium p-3 rounded-lg ${
                      result.isProfitable ? 'bg-brand-light-pink text-brand-wine' : 'bg-destructive/10 text-destructive'
                    }`}
                  >
                    {result.headline}
                  </p>
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
                      Nenašli jsme zásadní problém — základ vypadá zdravě. Soustřeď se na škálování
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
