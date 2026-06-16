import { useState } from 'react';
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Navigation/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { MetaTags } from '@/components/SEO/MetaTags';
import { Link } from 'react-router-dom';
import { Lightbulb, User, Sparkles, Copy, Check, ArrowRight, ClipboardCheck } from 'lucide-react';

interface PersonaForm {
  product: string;
  problem: string;
  who: string;
  age: string;
  situation: string;
  channels: string;
  price: string;
  whyMe: string;
}

const emptyForm: PersonaForm = {
  product: '',
  problem: '',
  who: '',
  age: '',
  situation: '',
  channels: '',
  price: '',
  whyMe: ''
};

const formFields: {
  key: keyof PersonaForm;
  label: string;
  placeholder: string;
  multiline?: boolean;
}[] = [
  { key: 'product', label: 'Co prodáváš?', placeholder: 'Např. ručně dělané svíčky ze sójového vosku' },
  { key: 'problem', label: 'Jaký problém nebo touhu to řeší?', placeholder: 'Např. lidé chtějí útulný domov a dárek, který není z fabriky', multiline: true },
  { key: 'who', label: 'Pro koho to je? (jednou větou)', placeholder: 'Např. ženy, které si rády zútulňují domov a dávají osobní dárky' },
  { key: 'age', label: 'Věk / životní fáze', placeholder: 'Např. 28–45, často maminky nebo ženy v páru' },
  { key: 'situation', label: 'Kdy a proč nakoupí?', placeholder: 'Např. před Vánoci, na narozeniny, nebo když si chtějí udělat radost', multiline: true },
  { key: 'channels', label: 'Kde tráví čas / kde je oslovíš?', placeholder: 'Např. Instagram, Pinterest, doporučení od kamarádek' },
  { key: 'price', label: 'Za kolik to budeš prodávat?', placeholder: 'Např. 250–450 Kč za svíčku' },
  { key: 'whyMe', label: 'Proč koupí od tebe, a ne od konkurence?', placeholder: 'Např. unikátní vůně, příběh, lokální výroba, krásné balení', multiline: true }
];

const validationSteps: { id: string; label: string; help: string }[] = [
  { id: 'talk5', label: 'Promluvila jsem s 5+ lidmi z cílovky o tom problému', help: 'Ne s rodinou, s reálnými potenciálními zákaznicemi.' },
  { id: 'demand', label: 'Ověřila jsem, že lidé to opravdu hledají', help: 'Google (Sklik/Keyword Planner), počty hledání, skupiny na FB, Heureka.' },
  { id: 'competitors', label: 'Podívala jsem se na 3+ konkurenty', help: 'Co dělají dobře, kde je mezera, jak mám být jiná.' },
  { id: 'presell', label: 'Mám aspoň 1 signál, že lidé zaplatí', help: 'Předobjednávka, čekací listina, prodej na trhu, nebo „kde to koupím?“.' },
  { id: 'numbers', label: 'Spočítala jsem si, jestli to dává smysl finančně', help: 'Marže pokryje náklady i čas. Použij kalkulačku.' },
  { id: 'firstbatch', label: 'Vím, jak vyrobím/seženu první sérii', help: 'Dodavatel, kapacita, cena, čas dodání.' }
];

const Validace = () => {
  const [form, setForm] = useState<PersonaForm>(emptyForm);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const setField = (key: keyof PersonaForm, value: string) => setForm((p) => ({ ...p, [key]: value }));
  const toggle = (id: string) => setChecked((p) => ({ ...p, [id]: !p[id] }));

  const filledCount = Object.values(form).filter((v) => v.trim().length > 0).length;
  const checkedCount = validationSteps.filter((s) => checked[s.id]).length;

  // Orientační skóre připravenosti (persona + ověření). Čísla jsou hrubá pomůcka, ne věda.
  const personaScore = (filledCount / formFields.length) * 40;
  const validationScore = (checkedCount / validationSteps.length) * 60;
  const readiness = Math.round(personaScore + validationScore);

  // HARD GATE: bez reálného signálu, že lidé zaplatí (předobjednávka / prodej cizímu),
  // nemáš nápad ověřený, i kdyby skóre bylo vysoké. Persona se nedá „uskákat".
  // Pozn.: tohle je validace nápadu (první krok), ne spuštění byznysu.
  const hasPaidSignal = !!checked['presell'];
  const readinessLabel = !hasPaidSignal
    ? readiness >= 50
      ? 'Skoro, chybí důkaz, že lidé zaplatí'
      : readiness >= 25
        ? 'Začátek'
        : 'Pojďme na to'
    : readiness >= 80
      ? 'Nápad ověřený, můžeš začít stavět'
      : readiness >= 50
        ? 'Na dobré cestě'
        : readiness >= 25
          ? 'Začátek'
          : 'Pojďme na to';

  const aiPrompt = `Pomoz mi ověřit nápad na e-shop a vybrousit cílovou zákaznici (personu).

Co prodávám: ${form.product || '(doplň)'}
Problém/touha, kterou to řeší: ${form.problem || '(doplň)'}
Pro koho to je: ${form.who || '(doplň)'}
Věk / fáze: ${form.age || '(doplň)'}
Kdy a proč nakoupí: ${form.situation || '(doplň)'}
Kde je oslovím: ${form.channels || '(doplň)'}
Cena: ${form.price || '(doplň)'}
Proč ode mě: ${form.whyMe || '(doplň)'}

Prosím:
1. Sepiš mi z toho jasnou personu (jméno, situace, co řeší, čeho se bojí, co ji přesvědčí).
2. Řekni mi narovinu, kde je nápad slabý nebo rizikový.
3. Dej mi konkrétní plán na ověření za 1 týden: co mám udělat, s kým mluvit, co změřit.
4. Navrhni 3 věty, kterými bych produkt popsala přesně téhle zákaznici.
Mluv ke mně lidsky a bez žargonu.`;

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(aiPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* schránka nedostupná */
    }
  };

  return (
    <>
      <MetaTags
        title="Ověř si nápad a poznej svou zákaznici"
        description="Než spustíš e-shop, ověř nápad a vybrouš personu. Vyplň, sestav personu, projdi ověřovací kroky a nech si poradit od AI."
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-gradient-soft">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb />

          <div className="max-w-3xl mx-auto text-center mb-8">
            <Badge className="bg-brand-orange/20 text-brand-wine mb-4 text-base px-4 py-2">
              <Lightbulb className="w-4 h-4 mr-2" />
              Validace nápadu
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-brand-wine mb-4">
              Ověř si nápad, než do něj dáš peníze
            </h1>
            <p className="text-lg text-brand-wine/70">
              Nejdřív si ujasni, <strong>komu</strong> a <strong>proč</strong> prodáváš. Pak ověř, že o to
              opravdu někdo stojí. Tahle dvě „ano“ ti ušetří spoustu peněz i nervů.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Formulář persony */}
            <Card className="shadow-soft">
              <CardHeader className="bg-brand-wine text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Sestav svou personu
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {formFields.map((f) => (
                  <div key={f.key}>
                    <Label htmlFor={f.key} className="text-brand-wine font-semibold">
                      {f.label}
                    </Label>
                    {f.multiline ? (
                      <Textarea
                        id={f.key}
                        value={form[f.key]}
                        placeholder={f.placeholder}
                        onChange={(e) => setField(f.key, e.target.value)}
                        className="mt-1"
                        rows={2}
                      />
                    ) : (
                      <Input
                        id={f.key}
                        value={form[f.key]}
                        placeholder={f.placeholder}
                        onChange={(e) => setField(f.key, e.target.value)}
                        className="mt-1"
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pravý sloupec: persona karta + readiness + ověření */}
            <div className="space-y-6">
              {/* Readiness */}
              <Card className="shadow-soft">
                <CardHeader className="bg-gradient-brand text-white rounded-t-lg">
                  <CardTitle>Připravenost</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-end justify-between">
                    <span className="text-4xl font-bold text-brand-wine">{readiness}%</span>
                    <Badge className="bg-brand-wine text-white">{readinessLabel}</Badge>
                  </div>
                  <Progress value={readiness} className="h-3" />
                  <p className="text-xs text-brand-wine/60">
                    Persona {filledCount}/{formFields.length} · Ověření {checkedCount}/{validationSteps.length}
                  </p>
                </CardContent>
              </Card>

              {/* Persona karta */}
              {filledCount > 0 && (
                <Card className="shadow-soft border-brand-light-pink">
                  <CardHeader className="bg-brand-pink text-white rounded-t-lg">
                    <CardTitle>Tvoje zákaznice</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 text-sm text-brand-wine/90 space-y-2">
                    {form.who && <p><strong>Kdo:</strong> {form.who}{form.age ? ` (${form.age})` : ''}</p>}
                    {form.problem && <p><strong>Co řeší:</strong> {form.problem}</p>}
                    {form.situation && <p><strong>Kdy nakoupí:</strong> {form.situation}</p>}
                    {form.channels && <p><strong>Kde ji najdu:</strong> {form.channels}</p>}
                    {form.whyMe && <p><strong>Proč ode mě:</strong> {form.whyMe}</p>}
                    {form.product && form.price && (
                      <p><strong>Nabídka:</strong> {form.product} za {form.price}</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Ověřovací kroky */}
          <div className="max-w-5xl mx-auto mt-8">
            <Card className="shadow-soft">
              <CardHeader className="bg-brand-wine text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5" />
                  Ověř, že o to někdo stojí
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid md:grid-cols-2 gap-4">
                {validationSteps.map((s) => (
                  <label
                    key={s.id}
                    htmlFor={s.id}
                    className="flex items-start gap-3 p-3 bg-brand-light-pink/60 rounded-lg cursor-pointer hover:bg-brand-light-pink transition-colors"
                  >
                    <Checkbox id={s.id} checked={!!checked[s.id]} onCheckedChange={() => toggle(s.id)} className="mt-0.5" />
                    <span>
                      <span className="block text-sm font-semibold text-brand-wine">{s.label}</span>
                      <span className="block text-xs text-brand-wine/60">{s.help}</span>
                    </span>
                  </label>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* AI vrstva */}
          <div className="max-w-5xl mx-auto mt-8">
            <Card className="border-brand-light-pink bg-gradient-to-br from-brand-light-pink/20 to-brand-light-pink/40">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-brand-wine" />
                  <h3 className="text-lg font-bold text-brand-wine">Nech si personu vybrousit od AI</h3>
                </div>
                <p className="text-sm text-brand-wine/80 mb-4">
                  Zkopíruj prompt s tím, co jsi vyplnila, a vlož ho do ChatGPT, Claude nebo Gemini.
                  Dostaneš hotovou personu, slabá místa nápadu a plán na ověření.
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
            <p className="text-brand-wine/70 mb-3">Nápad sedí? Pojď zjistit, jestli to vydělá.</p>
            <Button asChild className="bg-brand-wine hover:bg-brand-wine/90">
              <Link to="/kalkulacka">
                Spočítej životaschopnost <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Validace;
