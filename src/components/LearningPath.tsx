import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Lightbulb, Calculator, Stethoscope, CheckSquare, Sparkles, Compass, Wallet, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const KIT_REPO = 'https://github.com/davidsimoes/hzb-eshop-kit';

// Cesta = "menu" nástrojů. Tři vedeme naživo (validace, kalkulačka, diagnostika),
// checklist a zbytek témat unese kit.
const pathSteps = [
  {
    icon: Lightbulb,
    title: '1. Ověř nápad',
    description: 'Sestav personu a ověř, že o tvůj nápad někdo stojí, dřív, než do něj dáš peníze.',
    time: '15 min',
    link: '/validace',
    cta: 'Ověřit nápad',
    color: 'bg-brand-pink/20 text-brand-wine',
    buttonVariant: 'outline' as const
  },
  {
    icon: Calculator,
    title: '2. Spočítej, jestli to vydělá',
    description: 'Kalkulačka ti řekne, kolik objednávek a návštěv potřebuješ, a jestli ti to dává smysl.',
    time: '10 min',
    link: '/kalkulacka',
    cta: 'Spočítat',
    color: 'bg-brand-orange/20 text-brand-wine',
    buttonVariant: 'default' as const
  },
  {
    icon: Compass,
    title: '3. Vyber platformu',
    description: 'Pár otázek a víš, jestli ti sedne Shoptet, Shopify, nebo třeba platforma na kurzy.',
    time: '5 min',
    link: '/vyber-platformy',
    cta: 'Vybrat platformu',
    color: 'bg-brand-pink/20 text-brand-wine',
    buttonVariant: 'outline' as const
  },
  {
    icon: CheckSquare,
    title: '4. Spusť krok za krokem',
    description: 'Spouštěcí checklist tě provede vším od živnosti po první objednávku. Nic nezapomeneš.',
    time: 'průběžně',
    link: '/checklist',
    cta: 'Otevřít checklist',
    color: 'bg-brand-orange/20 text-brand-wine',
    buttonVariant: 'outline' as const
  },
  {
    icon: Stethoscope,
    title: '5. Co když to neprodává',
    description: 'Už prodáváš, ale vázne to? Diagnostika najde nejslabší článek a poradí, co řešit první.',
    time: '10 min',
    link: '/diagnostika',
    cta: 'Diagnostikovat',
    color: 'bg-brand-pink/20 text-brand-wine',
    buttonVariant: 'outline' as const
  },
  {
    icon: Wallet,
    title: '6. Vyplatí se ten výdaj?',
    description: 'Zvažuješ appku, fotografa nebo placenou šablonu? ROI kalkulačka řekne, jestli se to vrátí.',
    time: '5 min',
    link: '/roi-kalkulacka',
    cta: 'Spočítat ROI',
    color: 'bg-brand-orange/20 text-brand-wine',
    buttonVariant: 'outline' as const
  }
];

export const LearningPath = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-wine mb-4">
            Tvoje cesta k e-shopu, který vydělává
          </h2>
          <p className="text-lg text-brand-wine/70">
            Validace → Plán → Spuštění. Nástroje, které tě tím krok za krokem provedou. A celý kit
            navíc můžeš dát své AI, aby ti radila na míru.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {pathSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="border-brand-light-pink group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`p-3 rounded-lg ${step.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary" className="bg-brand-light-pink text-brand-wine">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.time}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-brand-wine">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-brand-wine/70 mb-6 text-base leading-relaxed">
                      {step.description}
                    </CardDescription>
                    <Button asChild variant={step.buttonVariant} className="w-full">
                      <Link to={step.link}>
                        {step.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Kit / AI vrstva */}
          <Card className="mt-8 border-brand-light-pink bg-gradient-to-br from-brand-light-pink/20 to-brand-light-pink/40">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="p-4 rounded-full bg-white/70">
                <Sparkles className="w-8 h-8 text-brand-wine" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-brand-wine mb-2">
                  Celý kit ke stažení, i pro tvou AI
                </h3>
                <p className="text-brand-wine/70">
                  Průvodci a hotové prompty pro všech 6 hlavních oblastí (validace, platforma, spuštění,
                  marketing, provoz, optimalizace když to neprodává). Přečti si je, nebo je dej ChatGPT, Claude či
                  Gemini a nech si poradit na míru. Zdarma, pod licencí CC BY 4.0.
                </p>
                <p className="mt-2 text-sm text-brand-wine/50">
                  Pro vývojáře a pokročilé:{' '}
                  <a
                    href={KIT_REPO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-brand-wine/80 transition-colors"
                  >
                    celý kit na GitHubu
                  </a>
                  {' '} (GitHub je jen místo, kde soubory bydlí).
                </p>
              </div>
              <div className="flex flex-col gap-3 items-stretch min-w-[11rem]">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-wine hover:bg-brand-wine/90 whitespace-nowrap"
                >
                  <Link to="/pruvodce">
                    Otevři kit
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <a
                  href="https://www.linkedin.com/in/davidjsimoes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-sm text-brand-wine/70 hover:text-brand-wine transition-colors"
                >
                  <Linkedin className="w-4 h-4 flex-shrink-0" />
                  Sleduj e-commerce tipy na LinkedInu
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
