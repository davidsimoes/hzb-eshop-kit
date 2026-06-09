import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tooltip } from './Tooltip';
import { LoadingSpinner } from './Loading/LoadingStates';
import { ChevronRight, ChevronLeft, Target, TrendingUp, Users, Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '@/contexts/CurrencyContext';
interface WizardData {
  // Step 1: Goals
  desiredProfit: number;
  isYearly: boolean;

  // Step 2: Business basics
  aov: number;
  cogs: number;
  extraCosts: number;

  // Step 3: Marketing & traffic
  conversionRate: number;
  marketingCosts: number;
}
interface CalculatorWizardProps {
  onComplete: (data: WizardData) => void;
}
const CZECH_DEFAULTS = {
  aov: 900,
  cogs: 450,
  // 50% of AOV
  extraCosts: 50,
  conversionRate: 2,
  marketingCosts: 0
};
export const CalculatorWizard = ({
  onComplete
}: CalculatorWizardProps) => {
  const {
    t
  } = useTranslation();
  const {
    formatCurrency
  } = useCurrency();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<WizardData>({
    desiredProfit: 0,
    isYearly: false,
    ...CZECH_DEFAULTS
  });
  const updateData = (updates: Partial<WizardData>) => {
    setData(prev => ({
      ...prev,
      ...updates
    }));
  };
  const nextStep = async () => {
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsSubmitting(true);
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete(data);
      setIsSubmitting(false);
    }
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return data.desiredProfit > 0;
      case 1:
        return data.aov > 0 && data.cogs >= 0 && data.cogs < data.aov;
      case 2:
        return data.conversionRate > 0;
      default:
        return false;
    }
  };
  const steps = [{
    title: t('calculator.wizard.step1.title'),
    icon: Target,
    description: t('calculator.wizard.step1.description')
  }, {
    title: t('calculator.wizard.step2.title'),
    icon: TrendingUp,
    description: t('calculator.wizard.step2.description')
  }, {
    title: t('calculator.wizard.step3.title'),
    icon: Users,
    description: t('calculator.wizard.step3.description')
  }];
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-brand-wine">
                {t('calculator.wizard.step1.question')}
              </h3>
              <p className="text-brand-wine/70">
                {t('calculator.wizard.step1.hint')}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <span className={`text-sm ${!data.isYearly ? 'text-brand-orange font-semibold' : 'text-muted-foreground'}`}>
                  {t('calculator.wizard.step1.monthly')}
                </span>
                <Switch checked={data.isYearly} onCheckedChange={checked => updateData({
                isYearly: checked
              })} />
                <span className={`text-sm ${data.isYearly ? 'text-brand-orange font-semibold' : 'text-muted-foreground'}`}>
                  {t('calculator.wizard.step1.yearly')}
                </span>
              </div>

              <div className="max-w-md mx-auto">
                <Input id="profit-input" type="number" placeholder={t('calculator.wizard.step1.placeholder', {
                amount: formatCurrency(data.isYearly ? 240000 : 20000)
              })} value={data.desiredProfit || ''} onChange={e => updateData({
                desiredProfit: Number(e.target.value)
              })} className="text-lg text-center" aria-describedby="profit-hint" />
              </div>

              
            </div>
          </div>;
      case 1:
        return <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-brand-wine">
                {t('calculator.wizard.step2.question')}
              </h3>
              <p className="text-brand-wine/70">
                {t('calculator.wizard.step2.hint')}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="text-brand-wine font-medium">
                    {t('calculator.wizard.step2.aov')}
                  </Label>
                  <Tooltip content={t('calculator.wizard.step2.aovTooltip')} />
                </div>
                <Input type="number" placeholder={t('calculator.wizard.step1.placeholder', {
                amount: '900'
              })} value={data.aov || ''} onChange={e => updateData({
                aov: Number(e.target.value)
              })} className="text-lg" />
                <p className="text-xs text-brand-wine/60">
                  💡 {t('calculator.wizard.step2.aovHint')}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="text-brand-wine font-medium">
                    {t('calculator.wizard.step2.cogs')}
                  </Label>
                  <Tooltip content={t('calculator.wizard.step2.cogsTooltip')} />
                </div>
                <Input type="number" placeholder={t('calculator.wizard.step1.placeholder', {
                amount: '450'
              })} value={data.cogs || ''} onChange={e => updateData({
                cogs: Number(e.target.value)
              })} className="text-lg" />
                <p className="text-xs text-brand-wine/60">
                  💡 {t('calculator.wizard.step2.cogsHint')}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="text-brand-wine font-medium">
                    {t('calculator.wizard.step2.extra')}
                  </Label>
                  <Tooltip content={t('calculator.wizard.step2.extraTooltip')} />
                </div>
                <Input type="number" placeholder={t('calculator.wizard.step1.placeholder', {
                amount: '50'
              })} value={data.extraCosts || ''} onChange={e => updateData({
                extraCosts: Number(e.target.value)
              })} className="text-lg" />
                <p className="text-xs text-brand-wine/60">
                  💡 {t('calculator.wizard.step2.extraHint')}
                </p>
              </div>

              {data.aov > 0 && data.cogs > 0 && <div className="p-3 bg-brand-light-pink rounded-lg text-center">
                  <p className="text-sm text-brand-wine">
                    {t('calculator.wizard.step2.margin', {
                  percent: ((data.aov - data.cogs - data.extraCosts) / data.aov * 100).toFixed(1)
                })}
                  </p>
                </div>}
            </div>
          </div>;
      case 2:
        return <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-brand-wine">
                {t('calculator.wizard.step3.question')}
              </h3>
              <p className="text-brand-wine/70">
                {t('calculator.wizard.step3.hint')}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="text-brand-wine font-medium">
                    {t('calculator.wizard.step3.conversion')}
                  </Label>
                  <Tooltip content={t('calculator.wizard.step3.conversionTooltip')} />
                </div>
                <Input type="number" step="0.1" placeholder={t('calculator.wizard.step1.placeholder', {
                amount: '2'
              })} value={data.conversionRate || ''} onChange={e => updateData({
                conversionRate: Number(e.target.value)
              })} className="text-lg" />
                <p className="text-xs text-brand-wine/60">
                  💡 {t('calculator.wizard.step3.conversionHint')}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="text-brand-wine font-medium">
                    {t('calculator.wizard.step3.budget')}
                  </Label>
                  <Tooltip content={t('calculator.wizard.step3.budgetTooltip')} />
                </div>
                <Input type="number" placeholder={t('calculator.wizard.step1.placeholder', {
                amount: '5000'
              })} value={data.marketingCosts || ''} onChange={e => updateData({
                marketingCosts: Number(e.target.value)
              })} className="text-lg" />
                <p className="text-xs text-brand-wine/60">
                  💡 {t('calculator.wizard.step3.budgetHint')}
                </p>
              </div>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <Card className="shadow-brand max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-brand text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          {t('calculator.wizard.title')}
        </CardTitle>
        
        {/* Progress indicators */}
        <div className="flex justify-between items-center mt-4">
          {steps.map((step, index) => <div key={index} className="flex items-center">
              <div className={`flex items-center gap-2 ${index === currentStep ? 'text-white' : index < currentStep ? 'text-white/80' : 'text-white/40'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${index === currentStep ? 'border-white bg-white/20' : index < currentStep ? 'border-white/80 bg-white/20' : 'border-white/40'}`}>
                  {index < currentStep ? <div className="w-2 h-2 bg-white rounded-full" /> : <span className="text-sm font-bold">{index + 1}</span>}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs opacity-75">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && <ChevronRight className="w-4 h-4 text-white/40 mx-2" />}
            </div>)}
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        {renderStep()}
        
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            {t('calculator.wizard.navigation.back')}
          </Button>
          
          <div className="text-sm text-brand-wine/60">
            {t('calculator.wizard.navigation.step', {
            current: currentStep + 1,
            total: steps.length
          })}
          </div>
          
          <Button onClick={nextStep} disabled={!canProceed() || isSubmitting} className="flex items-center gap-2">
            {isSubmitting ? <LoadingSpinner size="sm" /> : <>
                {currentStep === steps.length - 1 ? t('calculator.wizard.navigation.calculate') : t('calculator.wizard.navigation.next')}
                <ChevronRight className="w-4 h-4" />
              </>}
          </Button>
        </div>
      </CardContent>
    </Card>;
};