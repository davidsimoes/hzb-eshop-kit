import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Navigation/Breadcrumb';
import { User, Building, TrendingUp, Heart, MessageCircle, ExternalLink, Star, Award, Calendar, Phone, Mail, Users } from 'lucide-react';
import davidHeadshot from '/images/f2474b23-8549-4599-8f5a-5ee1f6ad1022.png';
import techWorkspace from '/images/f608b034-7b19-4647-91f2-cf62814783e3.png';
const About = () => {
  const {
    t
  } = useTranslation();
  const experiences = [{
    title: "soundsgood.agency",
    description: "Zakladatel první Shopify agentury v ČR a na Slovensku",
    icon: Building,
    highlight: "První Shopify agency v ČR/SK",
    why: "Vidím, co funguje i co nefunguje u desítek reálných e-shopů v ČR a SK, ne jen v teorii."
  }, {
    title: "Subscription commerce startup",
    description: "Jedna z prvních firem v Česku zaměřená na předplatné spotřebního zboží",
    icon: Users,
    highlight: "Průkopník předplatných služeb",
    why: "Vím, jak postavit byznys na opakujících se příjmech a zákaznické věrnosti, protože jsem to sám zkoušel a přežil."
  }, {
    title: "TEPE USA (B2B dentální)",
    description: "KISS (Keep It Simple, Stupid!) - jednoduchý a efektivní přístup k e-commerce",
    icon: TrendingUp,
    highlight: "Americký know-how",
    why: "Americký trh tě naučí jednoduchost a rychlost. Složitost zabíjí konverze, a to platí i pro český e-shop."
  }, {
    title: "Různé obchodní modely",
    description: "B2B, Omnichannel, DTC - různé cíle = různé strategie napříč segmenty",
    icon: Building,
    highlight: "Praktické zkušenosti",
    why: "Nemám recept pro všechny. Mám zkušenosti z různých modelů, abych ti poradil to, co sedí tebě."
  }, {
    title: "Flexibilní startup projekty",
    description: "Pro startupy je klíčové umět včas změnit směr - flexibilita a adaptabilita",
    icon: TrendingUp,
    highlight: "Startup mentalita",
    why: "Pivot není selhání, je to strategie. Naučím tě rozpoznat, kdy změnit směr dřív, než dojdou peníze."
  }];
  const lessons = [{
    title: "Moje první e-shopy",
    lesson: "Financials are key! - bez správné kalkulace nemůžeš dlouhodobě vydělávat",
    type: "critical"
  }, {
    title: "Můj vlastní byznys",
    lesson: "Trpělivost + vášeň + riskování = úspěch. Není to o štěstí, ale o práci",
    type: "success"
  }];
  const credentials = [{
    title: "Shopify Partner",
    description: "Oficiální Shopify partner od roku 2014 - první v ČR/SK",
    icon: Star,
    link: "https://shopify.com/partners/directory/partner/soundsgood",
    linkLabel: "Shopify Partner Profile"
  }, {
    title: "soundsgood.agency",
    description: "Zakladatel agentury specializované výhradně na Shopify",
    icon: Award,
    link: "https://soundsgood.agency",
    linkLabel: "soundsgood.agency"
  }];
  return <div className="min-h-screen bg-gradient-soft">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        {/* Hero Section with Photo */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-soft rounded-2xl transform rotate-1"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-soft">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <img src={davidHeadshot} alt="David Simões" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover object-top border-4 border-brand-orange/20" />
                  <div className="absolute -bottom-2 -right-2 bg-brand-orange text-white rounded-full p-2">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-brand-wine mb-2">
                    {t('about.title')}
                  </h1>
                  <p className="text-lg text-brand-wine/80 mb-4">
                    {t('about.subtitle')}
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <Badge variant="default" className="bg-brand-orange text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Shopify Expert
                    </Badge>
                    <Badge variant="outline" className="border-brand-wine text-brand-wine">
                      <Users className="w-3 h-3 mr-1" />
                      Zakladatel SGA
                    </Badge>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Credentials */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {credentials.map((cred, index) => {
            const Icon = cred.icon;
            return (
              <Card key={index} className="shadow-soft border-brand-orange/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-orange/10 rounded-full p-3 shrink-0">
                      <Icon className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-brand-wine mb-1">{cred.title}</h3>
                      <p className="text-brand-wine/70 text-sm mb-3">{cred.description}</p>
                      <a
                        href={cred.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-brand-orange text-sm font-medium hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {cred.linkLabel}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Introduction */}
        <Card className="shadow-soft mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-brand-wine">
              <Heart className="w-6 h-6 text-brand-orange" />
              {t('about.intro.title', 'Kdo jsem a proč můžu pomoci')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-brand-wine/80 leading-relaxed">
                {t('about.intro.greeting')} 
              </p>
              <p className="text-brand-wine/80 leading-relaxed">
                {t('about.intro.experience')}
              </p>
              
              <p className="text-brand-wine/80 leading-relaxed">
                {t('about.intro.honesty')} 
                {t('about.intro.mistakes', 'Proto ti můžu pomoct vyhnout se chybám, které jsem udělal já nebo které jsem viděl u jiných.')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-brand-wine">
              <TrendingUp className="w-6 h-6 text-brand-orange" />
              Zkušenosti, ze kterých čerpám
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {experiences.map((exp, index) => {
                const Icon = exp.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-brand-soft/40 hover:bg-brand-soft/70 transition-colors">
                    <div className="bg-brand-wine/10 rounded-full p-2 shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-brand-wine" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="font-semibold text-brand-wine">{exp.title}</h4>
                        <Badge variant="outline" className="text-xs border-brand-orange/40 text-brand-orange">{exp.highlight}</Badge>
                      </div>
                      <p className="text-brand-wine/70 text-sm mb-2">{exp.description}</p>
                      <p className="text-brand-wine/60 text-sm italic border-l-2 border-brand-orange/40 pl-3">
                        {exp.why}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Lessons Learned */}
        <Card className="shadow-soft mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-brand-wine">
              <Calendar className="w-6 h-6 text-brand-orange" />
              Co mě to naučilo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {lessons.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-l-4 ${item.type === 'critical' ? 'bg-red-50 border-red-400' : 'bg-green-50 border-green-400'}`}
                >
                  <h4 className="font-semibold text-brand-wine mb-2">{item.title}</h4>
                  <p className={`text-sm ${item.type === 'critical' ? 'text-red-700' : 'text-green-700'}`}>
                    {item.lesson}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>



        {/* Approach */}
        <Card className="shadow-soft mb-12 bg-gradient-to-r from-brand-wine to-brand-pink text-white">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Heart className="w-6 h-6" />
              {t('about.approach.title', 'Můj přístup k tobě')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-white/90 leading-relaxed">
                <strong>{t('about.approach.honest.title', 'Nejsem perfektní')}</strong> {t('about.approach.honest.content', 'a ani se za to nevydávám. Jsem portugalec, takže občas můžu mluvit trochu divně - klidně mi řekni, když mi nerozumíš!')}
              </p>
              <p className="text-white/90 leading-relaxed">
                <strong>{t('about.approach.questions.title', 'Ptej se na cokoli')}</strong> - {t('about.approach.questions.content', 'není cílem jen projít materiály, ale skutečně ti pomoct s tvými konkrétními výzvami. Každý e-shop je jiný a každý má jiné problémy.')}
              </p>
              <p className="text-white/90 leading-relaxed">
                <strong>{t('about.approach.contact.title', 'Zůstanu s tebou v kontaktu')}</strong> - {t('about.approach.contact.content', 'i po školení se můžeš ozvat, když budeš potřebovat radu. Tvůj úspěch je můj úspěch.')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-brand-wine">
              <MessageCircle className="w-6 h-6 text-brand-orange" />
              {t('about.contact.title', 'Zůstaňme v kontaktu')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-brand-wine/80 mb-6">
              {t('about.contact.description', 'Máš otázku? Potřebuješ radu? Nebo se ti prostě něco nedaří? Ozvi se!')}
            </p>
            
            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-brand-wine/80">
                  <Mail className="w-4 h-4 text-brand-orange" />
                  <a href="mailto:david@soundsgood.agency" className="hover:text-brand-wine transition-colors">
                    david@soundsgood.agency
                  </a>
                </div>
                <div className="flex items-center gap-3 text-brand-wine/80">
                  <Phone className="w-4 h-4 text-brand-orange" />
                  <a href="tel:+420774051374" className="hover:text-brand-wine transition-colors">
                    +420 774 051 374
                  </a>
                </div>
              </div>
              
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button className="flex items-center gap-2" asChild>
                <a href="https://soundsgood.agency" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  soundsgood.agency
                </a>
              </Button>
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <a href="https://holkyzbyznysu.cz" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  holkyzbyznysu.cz
                </a>
              </Button>
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <a href="https://shopify.com/partners/directory/partner/soundsgood" target="_blank" rel="noopener noreferrer">
                  <Star className="w-4 h-4" />
                  Shopify Partner Profile
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>;
};
export default About;