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
    description: "Zakladatel první Shopify agentury v Česku, později akvírované skupinou Shopsys",
    icon: Building,
    highlight: "První Shopify agency v ČR"
  }, {
    title: "Shopsys Group",
    description: "Obchodní ředitel odpovědný za obchodní strategii celé skupiny po akvizici",
    icon: TrendingUp,
    highlight: "Commercial Director"
  }, {
    title: "Subscription commerce startup",
    description: "Jedna z prvních firem v Česku zaměřená na předplatné spotřebního zboží",
    icon: Users,
    highlight: "Průkopník předplatných služeb"
  }, {
    title: "Americká B2B dentální společnost",
    description: "KISS (Keep It Simple, Stupid!) - jednoduchý a efektivní přístup k e-commerce",
    icon: TrendingUp,
    highlight: "Americký know-how"
  }, {
    title: "Různé obchodní modely",
    description: "B2B, Omnichannel, DTC - různé cíle = různé strategie napříč segmenty",
    icon: Building,
    highlight: "Praktické zkušenosti"
  }, {
    title: "Flexibilní startup projekty",
    description: "Pro startupy je klíčové umět včas změnit směr - flexibilita a adaptabilita",
    icon: TrendingUp,
    highlight: "Startup mentalita"
  }];
  const lessons = [{
    title: "Okay Elektro",
    lesson: "Nikdo není \"too big to fail\" - i velké firmy mohou selhat bez správné strategie",
    type: "warning"
  }, {
    title: "Sofsy",
    lesson: "Perfekcionismus je nepřítel dokončené práce - lepší hotovo než dokonalé",
    type: "tip"
  }, {
    title: "Moje první e-shopy",
    lesson: "Financials are key! - bez správné kalkulace nemůžeš dlouhodobě vydělávat",
    type: "critical"
  }, {
    title: "Můj vlastní byznys",
    lesson: "Trpělivost + vášeň + riskování = úspěch. Není to o štěstí, ale o práci",
    type: "success"
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
                      Shopsys Group
                    </Badge>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Credentials */}
        

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
        

        {/* Lessons Learned */}
        

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