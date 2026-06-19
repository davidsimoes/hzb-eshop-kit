import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Navigation/Breadcrumb';
import { MetaTags } from '@/components/SEO/MetaTags';
import { TrendingUp, Heart, MessageCircle, ExternalLink, Star, Award, Calendar, Phone, Mail, Users, Linkedin } from 'lucide-react';
import davidHeadshot from '/images/f2474b23-8549-4599-8f5a-5ee1f6ad1022.png';
import techWorkspace from '/images/f608b034-7b19-4647-91f2-cf62814783e3.png';
const About = () => {
  const {
    t
  } = useTranslation();
  const lessons = [{
    title: "E-shopy, na kterých jsem pracoval",
    lesson: "Čísla jsou základ! Bez správné kalkulace nemůžeš dlouhodobě vydělávat",
    type: "critical"
  }, {
    title: "Projekty, které jsem viděl růst",
    lesson: "Trpělivost + vášeň + riskování = úspěch. Není to o štěstí, ale o práci",
    type: "success"
  }];
  const credentials = [{
    title: "Shopify Partner",
    description: "Oficiální Shopify partner od roku 2014 – první v ČR/SK",
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
      <MetaTags
        title="O mně | E-shop, který vydělává"
        description="David Simões – Shopify partner od 2014, zakladatel soundsgood.agency. Pomáhám e-shopům vydělávat víc s menším rozpočtem. Zjisti, kdo tě školí a proč na to mám."
      />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
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
                    <Badge variant="outline" className="border-brand-orange text-brand-orange">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      soundsgood.agency
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
                      <h2 className="font-bold text-brand-wine mb-1">{cred.title}</h2>
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
            <div className="space-y-6">
              <p className="text-brand-wine/80 leading-relaxed">
                Za víc než 10 let mi rukama prošly stovky e-shopů, od úplných začátků až po zavedené značky. Nejde o čísla na efekt, jde o to, co za nimi stojí. Start-upy, předplatné, B2B i prodej do zahraničí, a k tomu Sounds Good Agency, první Shopify agentura v ČR a na Slovensku.
              </p>
              <p className="text-brand-wine/80 leading-relaxed">
                Každý klient mě něco naučil. U <strong>Many</strong>, se kterou jsem pracoval, jsme budovali jedno z prvních předplatných na spotřební zboží v Česku a viděl jsem, jak moc záleží na logistice a retenci. U <strong>TePe USA</strong> platilo jediné pravidlo: drž to jednoduché. Radikálně jiné světy jsou <strong>ETA</strong> (čisté B2B bez impulzivních nákupů), <strong>Erotic City</strong> s omnichannel provozem přes desítky kamenných prodejen, nebo <strong>Galleria Armadoro</strong> s DTC strategií pro zahraničí. U značek, se kterými jsem pracoval, jsem se naučil nepřenášet recepty z jednoho světa do druhého.
              </p>
              <p className="text-brand-wine/80 leading-relaxed">
                Nebylo to vždy hladké. <strong>Okay Elektro</strong> mi ukázal, že v e-commerce nikdo není „too big to fail“, a u klienta <strong>Fabini</strong> jsem viděl, jak klíčové je pro start-up umět včas změnit směr. Chyby, které jsem zažil nebo viděl u jiných, jsou dnes součástí každého mého školení.
              </p>
              <p className="text-brand-wine/80 leading-relaxed">
                Nejlíp mě poznáš v akci. Na LinkedInu pravidelně sdílím, co v e-commerce funguje i co ne, reálné příklady a chyby, kterým se vyhnout.
              </p>
              <Button className="flex items-center gap-2 bg-brand-wine hover:bg-brand-wine/90 text-white" asChild>
                <a href="https://www.linkedin.com/in/davidjsimoes/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                  Sleduj e-commerce tipy na LinkedInu
                </a>
              </Button>
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
                <strong>{t('about.approach.honest.title', 'Nejsem perfektní')}</strong> {t('about.approach.honest.content', 'a ani se za to nevydávám. Jsem Portugalec, takže občas můžu mluvit trochu divně, klidně mi řekni, když mi nerozumíš!')}
              </p>
              <p className="text-white/90 leading-relaxed">
                <strong>{t('about.approach.questions.title', 'Ptej se na cokoli')}</strong>: {t('about.approach.questions.content', 'není cílem jen projít materiály, ale skutečně ti pomoct s tvými konkrétními výzvami. Každý e-shop je jiný a každý má jiné problémy.')}
              </p>
              <p className="text-white/90 leading-relaxed">
                <strong>{t('about.approach.contact.title', 'Zůstanu s tebou v kontaktu')}</strong>: {t('about.approach.contact.content', 'i po školení se můžeš ozvat, když budeš potřebovat radu. Tvůj úspěch je můj úspěch.')}
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