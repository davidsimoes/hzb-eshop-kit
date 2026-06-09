import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Navigation/Breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, ArrowRight, CheckCircle, Clock, Users, Mail, Calculator, BookOpen, ListTodo, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
const BeforeStart = () => {
  const {
    t
  } = useTranslation();
  const fears = t('beforeStart.commonFears.fears', {
    returnObjects: true
  }) as Array<{
    fear: string;
    reality: string;
  }>;
  const realityPoints = t('beforeStart.realityCheck.points', {
    returnObjects: true
  }) as string[];
  const firstSteps = t('beforeStart.firstSteps.steps', {
    returnObjects: true
  }) as Array<{
    title: string;
    description: string;
    action: string;
    link: string;
  }>;
  const communities = t('beforeStart.support.communities', {
    returnObjects: true
  }) as Array<{
    name: string;
    description: string;
    link?: string;
    contact?: string;
  }>;
  return <>
      <Header />
      <main className="min-h-screen bg-gradient-soft">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-brand-pink/20 rounded-full">
                <Heart className="w-12 h-12 text-brand-wine" />
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-wine mb-4">
              {t('beforeStart.title')}
            </h1>
            
            <p className="text-xl text-brand-wine/80 mb-6">
              {t('beforeStart.subtitle')}
            </p>
            
            <Card className="bg-white/90 backdrop-blur border-brand-light-pink max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-brand-wine mb-4">
                  {t('beforeStart.hero.title')}
                </h2>
                <p className="text-brand-wine/70 leading-relaxed">
                  {t('beforeStart.hero.description')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Common Fears Section */}
          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-brand-wine text-center mb-8">
              {t('beforeStart.commonFears.title')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {fears.map((fear, index) => <Card key={index} className="border-brand-light-pink hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-brand-wine flex items-start gap-2">
                      
                      {fear.fear}
                      
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-brand-wine/70">{fear.reality}</p>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </section>

          {/* Reality Check Section */}
          <section className="max-w-4xl mx-auto mb-16">
            <Card className="bg-white/90 backdrop-blur border-brand-orange/30">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-brand-wine mb-2">
                  {t('beforeStart.realityCheck.title')}
                </CardTitle>
                <CardDescription className="text-lg text-brand-wine/70">
                  {t('beforeStart.realityCheck.honest')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {realityPoints.map((point, index) => <div key={index} className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-brand-orange/20 rounded-full mt-1">
                        <Clock className="w-4 h-4 text-brand-wine" />
                      </div>
                      <p className="text-brand-wine/80 flex-1">{point}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* First Steps Section */}
          <section className="max-w-5xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-brand-wine mb-4">
                {t('beforeStart.firstSteps.title')}
              </h2>
              <p className="text-lg text-brand-wine/70">
                {t('beforeStart.firstSteps.intro')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {firstSteps.map((step, index) => {
              const icons = [Calculator, BookOpen, ListTodo];
              const IconComponent = icons[index];
              return <Card key={index} className="border-brand-light-pink hover:shadow-glow transition-all duration-300 group">
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-brand-orange/20 rounded-full group-hover:bg-brand-orange/30 transition-colors">
                          <IconComponent className="w-8 h-8 text-brand-wine" />
                        </div>
                      </div>
                      <CardTitle className="text-xl text-brand-wine">{step.title}</CardTitle>
                      <CardDescription className="text-brand-wine/70">
                        {step.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Button asChild className="w-full bg-gradient-orange text-white hover:scale-105 transition-all">
                        <Link to={step.link}>
                          {step.action}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>;
            })}
            </div>
          </section>

          {/* Support Section */}
          

          {/* CTA Section */}
          <section className="max-w-3xl mx-auto text-center">
            <Card className="bg-gradient-orange text-white border-none">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">{t('beforeStart.cta.finalTitle')}</h2>
                
                <div className="mb-6 bg-white/10 p-4 rounded-lg border border-white/20">
                  <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    {t('beforeStart.cta.guide.title')}
                  </h4>
                  <p className="text-white/80 text-sm mb-3">
                    {t('beforeStart.cta.guide.description')}
                  </p>
                  <Button 
                    asChild 
                    variant="secondary" 
                    size="sm"
                    className="bg-white/20 text-white border border-white/30 hover:bg-white/30"
                  >
                    <a 
                      href="https://docs.google.com/presentation/d/1dOode6pH8fAmR3dAh6XjxY9U8iNRlWp-9nBIznaEl_Y/edit?usp=sharing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      {t('beforeStart.cta.guide.button')}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-brand-wine hover:bg-white/90 font-semibold">
                    <Link to={t('beforeStart.cta.readyLink')}>
                      {t('beforeStart.cta.ready')}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  
                  <Button asChild size="lg" variant="secondary" className="bg-white/20 text-white border border-white/30 hover:bg-white/30">
                    <Link to={t('beforeStart.cta.needMoreLink')}>
                      {t('beforeStart.cta.needMore')}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </>;
};
export default BeforeStart;