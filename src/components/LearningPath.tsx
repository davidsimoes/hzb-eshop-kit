import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, HelpCircle, Calculator, BookOpen, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LearningPath = () => {
  const { t } = useTranslation();

  const pathSteps = [
    {
      icon: HelpCircle,
      title: t('learningPath.beforeStart.title'),
      description: t('learningPath.beforeStart.description'),
      time: t('learningPath.beforeStart.time'),
      link: t('learningPath.beforeStart.link'),
      color: 'bg-brand-pink/20 text-brand-wine',
      buttonVariant: 'outline' as const
    },
    {
      icon: Calculator,
      title: t('learningPath.calculator.title'),
      description: t('learningPath.calculator.description'),
      time: t('learningPath.calculator.time'),
      link: t('learningPath.calculator.link'),
      color: 'bg-brand-orange/20 text-brand-wine',
      buttonVariant: 'default' as const
    },
    {
      icon: CheckSquare,
      title: t('learningPath.checklist.title'),
      description: t('learningPath.checklist.description'),
      time: t('learningPath.checklist.time'),
      link: t('learningPath.checklist.link'),
      color: 'bg-brand-pink/20 text-brand-wine',
      buttonVariant: 'outline' as const
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-wine mb-4">
            {t('learningPath.title')}
          </h2>
          <p className="text-lg text-brand-wine/70 mb-8">
            {t('learningPath.subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {pathSteps.map((step, index) => {
              const IconComponent = step.icon;
              
              return (
                <Card 
                  key={index}
                  className="border-brand-light-pink group"
                >
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
                    <CardTitle className="text-xl text-brand-wine">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <CardDescription className="text-brand-wine/70 mb-6 text-base leading-relaxed">
                      {step.description}
                    </CardDescription>
                    
                    <Button 
                      asChild 
                      variant={step.buttonVariant}
                      className="w-full"
                    >
                      <Link to={step.link}>
                        {index === 0 ? 'Začít zde' : index === 1 ? 'Otestovat nápad' : 'Spustit'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};