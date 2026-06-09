import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Header } from '@/components/Header/Header';
import { HelpCircle, Scale, Users, Search, DollarSign, Target, TrendingUp, CreditCard, Lightbulb } from 'lucide-react';

const FAQ = () => {
  const { t } = useTranslation();

  const iconMap = {
    Scale,
    Users,
    Search,
    DollarSign,
    Target,
    TrendingUp,
    CreditCard,
    Lightbulb
  };

  const sections = Object.keys(t('faq.sections', { returnObjects: true }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="h-12 w-12 text-brand-orange" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-wine via-brand-orange to-brand-pink bg-clip-text text-transparent">
                {t('faq.title')}
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              {t('faq.subtitle')}
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((sectionKey, sectionIndex) => {
              const section = t(`faq.sections.${sectionKey}`, { returnObjects: true }) as any;
              const IconComponent = iconMap[section.icon as keyof typeof iconMap] || HelpCircle;
              
              return (
                <Card key={sectionIndex} className="overflow-hidden border-2 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-muted/50 to-background border-b">
                    <CardTitle className="flex items-center gap-3">
                      <IconComponent className={`h-6 w-6 ${section.color}`} />
                      <span className="text-foreground">{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                      {section.questions.map((question, questionIndex) => (
                        <AccordionItem 
                          key={questionIndex} 
                          value={`${sectionIndex}-${questionIndex}`}
                          className="border-b last:border-b-0"
                        >
                          <AccordionTrigger className="px-6 py-4 text-left hover:bg-muted/30 transition-colors">
                            <span className="font-medium pr-4">{question.q}</span>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground space-y-4 px-6 pb-4">
                            <p className="whitespace-pre-line">{question.a}</p>
                            {question.links && question.links.length > 0 && (
                              <div className="border-t pt-3">
                                <h4 className="font-medium text-foreground mb-2">Užitečné odkazy:</h4>
                                <ul className="space-y-1">
                                  {question.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                      <a 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-primary/80 underline text-sm"
                                      >
                                        {link.text}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-brand-light-pink/20 to-background border-brand-pink/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{t('faq.footer.title')}</h3>
                <p className="text-muted-foreground">
                  {t('faq.footer.subtitle')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQ;