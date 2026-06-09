import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import davidHeadshot from '/images/f2474b23-8549-4599-8f5a-5ee1f6ad1022.png';

export const MissionHero = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-soft py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl lg:text-5xl font-bold text-brand-wine mb-4 lg:mb-6">
                {t('mission.hero.title')}
              </h1>
              
              <p className="text-lg lg:text-xl text-brand-wine/80 mb-6 lg:mb-8 leading-relaxed">
                {t('mission.hero.subtitle')}
              </p>
              
              <p className="text-base lg:text-lg text-brand-wine/70 mb-8 lg:mb-10 leading-relaxed">
                {t('mission.hero.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-gradient-orange text-white hover:scale-105 transition-all duration-200 shadow-brand text-base px-8 py-3"
                >
                  <Link to="/kalkulacka">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    {t('mission.hero.cta')}
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="border-brand-wine text-brand-wine hover:bg-brand-wine hover:text-white transition-all duration-200 text-base px-8 py-3"
                >
                  <Link to="/pred-zacatkem">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    {t('mission.hero.ctaSecondary')}
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Image and Personal Touch */}
            <div className="flex flex-col items-center lg:items-end">
              <div className="relative mb-6">
                <img 
                  src={davidHeadshot}
                  alt="David Simões"
                  className="w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover object-top shadow-glow border-4 border-white"
                />
                <div className="absolute -bottom-2 -right-2 bg-brand-orange text-white p-2 rounded-full shadow-brand">
                  <Heart className="w-6 h-6" />
                </div>
              </div>
              
              <Card className="p-6 max-w-md bg-white/90 backdrop-blur border-brand-light-pink">
                <p className="text-brand-wine font-medium text-center italic">
                  "{t('mission.hero.story')}"
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};