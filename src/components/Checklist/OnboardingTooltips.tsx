import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface TooltipStep {
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface OnboardingTooltipsProps {
  isActive: boolean;
  onComplete: () => void;
}

export const OnboardingTooltips = ({ isActive, onComplete }: OnboardingTooltipsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();

  const steps: TooltipStep[] = [
    {
      target: '.progress-summary',
      title: t('checklist.onboarding.step1.title'),
      content: t('checklist.onboarding.step1.content'),
      position: 'bottom'
    },
    {
      target: '.day-progress:first-child',
      title: t('checklist.onboarding.step2.title'),
      content: t('checklist.onboarding.step2.content'),
      position: 'right'
    },
    {
      target: '.checklist-item:first-child',
      title: t('checklist.onboarding.step3.title'),
      content: t('checklist.onboarding.step3.content'),
      position: 'top'
    },
    {
      target: '.export-button',
      title: t('checklist.onboarding.step4.title'),
      content: t('checklist.onboarding.step4.content'),
      position: 'bottom'
    }
  ];

  const [targetPosition, setTargetPosition] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const updatePosition = () => {
      const target = document.querySelector(steps[currentStep]?.target);
      if (target) {
        setTargetPosition(target.getBoundingClientRect());
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [currentStep, isActive, steps]);

  if (!isActive || !targetPosition) return null;

  const currentStepData = steps[currentStep];
  
  const getTooltipPosition = () => {
    const { position } = currentStepData;
    const offset = 10;
    
    switch (position) {
      case 'top':
        return {
          top: targetPosition.top - offset,
          left: targetPosition.left + targetPosition.width / 2,
          transform: 'translate(-50%, -100%)'
        };
      case 'bottom':
        return {
          top: targetPosition.bottom + offset,
          left: targetPosition.left + targetPosition.width / 2,
          transform: 'translate(-50%, 0)'
        };
      case 'left':
        return {
          top: targetPosition.top + targetPosition.height / 2,
          left: targetPosition.left - offset,
          transform: 'translate(-100%, -50%)'
        };
      case 'right':
        return {
          top: targetPosition.top + targetPosition.height / 2,
          left: targetPosition.right + offset,
          transform: 'translate(0, -50%)'
        };
      default:
        return { top: 0, left: 0 };
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />
      
      {/* Highlight target */}
      <div 
        className="fixed z-50 border-2 border-brand-orange rounded-lg pointer-events-none"
        style={{
          top: targetPosition.top - 4,
          left: targetPosition.left - 4,
          width: targetPosition.width + 8,
          height: targetPosition.height + 8,
        }}
      />
      
      {/* Tooltip */}
      <Card 
        className="fixed z-50 w-80 shadow-xl animate-fade-in"
        style={getTooltipPosition()}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-foreground">{currentStepData.title}</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onComplete}
              className="h-auto p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            {currentStepData.content}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {currentStep + 1} / {steps.length}
            </span>
            
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button variant="outline" size="sm" onClick={prevStep}>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  {t('checklist.onboarding.prev')}
                </Button>
              )}
              
              <Button size="sm" onClick={nextStep}>
                {currentStep < steps.length - 1 ? (
                  <>
                    {t('checklist.onboarding.next')}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  t('checklist.onboarding.finish')
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};