
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Navigation/Breadcrumb';
import { FinancialCalculator } from '@/components/FinancialCalculator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { Heart, ArrowLeft, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Calculator = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-soft">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Supportive Header */}
          <div className="max-w-4xl mx-auto text-center mb-8">
            <Badge className="bg-brand-orange/20 text-brand-wine mb-4 text-base px-4 py-2">
              <Heart className="w-4 h-4 mr-2" />
              {t('calculator.encouragement')}
            </Badge>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-brand-wine mb-4">
              {t('calculator.title')}
            </h1>
            
            <p className="text-lg text-brand-wine/70 mb-6">
              {t('calculator.subtitle')}
            </p>
            
            <Card className="bg-white/90 backdrop-blur border-brand-light-pink max-w-2xl mx-auto mb-8">
              <CardContent className="p-6">
                <p className="text-brand-wine/60 text-sm">
                  💡 <strong>Tip:</strong> {t('calculator.tip')}
                </p>
              </CardContent>
            </Card>
            
            <Button asChild variant="outline" size="sm" className="mb-8 border-brand-wine text-brand-wine hover:bg-brand-wine hover:text-white">
              <Link to="/pred-zacatkem">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('calculator.notReady')}
              </Link>
            </Button>
          </div>
          
        <FinancialCalculator />
        
        <div className="max-w-6xl mx-auto mt-12 mb-8">
          <Card className="border-brand-light-pink bg-gradient-to-br from-brand-light-pink/10 to-brand-light-pink/30">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-brand-wine" />
                <h3 className="text-2xl font-bold text-brand-wine">{t('calculator.learnMore')}</h3>
              </div>
              <p className="text-brand-wine/70 mb-6 max-w-2xl mx-auto">
                {t('calculator.learnMoreDesc')}
              </p>
              <Button 
                asChild 
                variant="default" 
                size="lg" 
                className="bg-brand-wine hover:bg-brand-wine/90"
              >
                <a 
                  href="https://docs.google.com/presentation/d/1dOode6pH8fAmR3dAh6XjxY9U8iNRlWp-9nBIznaEl_Y/edit?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t('calculator.openGuide')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
        </div>
      </main>
    </>
  );
};

export default Calculator;
