
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Navigation/Breadcrumb';
import { Calculator, BookOpen, CheckSquare, ArrowRight } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Calculator,
      title: t('nav.calculator'),
      description: 'Spočítej si za 3 minuty, jestli může tvůj e-shop vydělávat',
      link: '/calculator',
      color: 'bg-brand-orange'
    },
    {
      icon: BookOpen,
      title: t('nav.materials'),
      description: 'Kompletní materiály ze školení ke stažení',
      link: '/materials',
      color: 'bg-brand-pink'
    },
    {
      icon: CheckSquare,
      title: t('nav.checklist'),
      description: 'Praktický checklist pro spuštění a provoz e-shopu',
      link: '/checklist',
      color: 'bg-brand-wine'
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-soft animate-fade-in">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <Calculator className="w-12 h-12 text-brand-orange animate-float" />
            <h1 className="text-4xl md:text-6xl font-bold text-brand-wine">
              E-shop školení
            </h1>
          </div>
          <p className="text-xl text-brand-wine/80 max-w-3xl mx-auto mb-12">
            Kompletní průvodce pro úspěšný e-shop. Kalkulačka ziskovosti, materiály ze školení a praktický checklist v jednom místě.
          </p>
          
          {/* David's Credibility */}
          <div className="bg-white/80 backdrop-blur rounded-lg shadow-soft p-6 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-brand-wine mb-3">
                David Simões - váš průvodce e-commerce
              </h3>
              <p className="text-brand-wine/80 text-sm leading-relaxed">
                Zakladatel soundsgood.agency s praktickými zkušenostmi napříč různými typy
                e-shopů, od B2B (ETA, TEPE USA) až po DTC a předplatné (Mana). Spolupracoval
                mimo jiné s Pavlínek, Mandimu, Yoggies nebo mybelka.cz a aplikuje přístup
                "Keep It Simple, Stupid!".
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-soft hover:shadow-lg transition-shadow group">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-brand-wine">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-brand-wine/80 mb-6">{feature.description}</p>
                <Button asChild className="group-hover:bg-brand-wine group-hover:text-white">
                  <Link to={feature.link} className="flex items-center gap-2">
                    Začít
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

      </main>
    </div>
  );
};

export default Home;
