import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Target, AlertTriangle, Calendar, Download } from 'lucide-react';
interface ActionableResultsProps {
  results: {
    monthlyProfit: number;
    yearlyProfit: number;
    requiredOrders: number;
    requiredVisitors: number;
    grossMargin: number;
  };
  wizardData: {
    aov: number;
    conversionRate: number;
    marketingCosts: number;
    desiredProfit: number;
    isYearly: boolean;
  };
  onExportData: () => void;
}
export const ActionableResults = ({
  results,
  wizardData,
  onExportData
}: ActionableResultsProps) => {
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('cs-CZ').format(Math.round(num));
  };

  // Calculate key action metrics
  const dailyOrders = Math.ceil(results.requiredOrders / 30);
  const dailyVisitors = Math.ceil(results.requiredVisitors / 30);
  const weeklyRevenue = results.requiredOrders * wizardData.aov / 4;

  // Determine priority actions based on current gaps
  const getPriorityActions = () => {
    const actions = [];
    if (wizardData.conversionRate < 1.5) {
      actions.push({
        priority: 'high',
        category: 'Konverze',
        action: 'Zlepši UX a trust signály',
        description: 'Tvoje konverze je pod průměrem. Zaměř se na testimonials, certifikáty, zjednodušení objednávky.',
        timeframe: '2-4 týdny',
        impact: 'Zvýšení konverze o 0.5% = -30% potřebných návštěvníků'
      });
    }
    if (wizardData.aov < 600) {
      actions.push({
        priority: 'medium',
        category: 'AOV',
        action: 'Navyš průměrnou objednávku',
        description: 'Cross-selling, upselling, doprava zdarma od X Kč, bundly produktů.',
        timeframe: '1-2 týdny',
        impact: 'Zvýšení AOV o 100 Kč = -12% potřebných objednávek'
      });
    }
    if (results.grossMargin < 25) {
      actions.push({
        priority: 'high',
        category: 'Marže',
        action: 'Optimalizuj náklady nebo ceny',
        description: 'Přejednej s dodavateli, zvaž mírné zvýšení cen, snižuj logistické náklady.',
        timeframe: '1-3 měsíce',
        impact: 'Zvýšení marže o 5% = výrazně méně potřebných objednávek'
      });
    }
    actions.push({
      priority: 'medium',
      category: 'Marketing',
      action: 'Spusť systematické kampaně',
      description: 'Začni s Google Ads (search), pak Facebook/Instagram, měř CAC týdně.',
      timeframe: 'průběžně',
      impact: 'Systematický marketing = předvídatelný růst'
    });
    return actions;
  };
  const actions = getPriorityActions();

  // Weekly/Monthly milestones
  const getMilestones = () => {
    return [{
      period: 'Týden 1-2',
      target: `${dailyOrders * 7} objednávek`,
      focus: 'Testování a optimalizace',
      tasks: ['Spusti první kampaně', 'Sleduj konverze denně', 'Testuj landing pages']
    }, {
      period: 'Měsíc 1',
      target: `${Math.round(results.requiredOrders * 0.3)} objednávek`,
      focus: 'Stabilizace procesů',
      tasks: ['Vylaď nejlepší kampaně', 'Automatizuj email marketing', 'Zlepši customer service']
    }, {
      period: 'Měsíc 2-3',
      target: `${Math.round(results.requiredOrders * 0.7)} objednávek`,
      focus: 'Škálování úspěšných kanálů',
      tasks: ['Navyš rozpočet úspěšných kampaní', 'Testuj nové kanály', 'Implementuj remarketing']
    }, {
      period: 'Měsíc 4+',
      target: `${results.requiredOrders}+ objednávek`,
      focus: 'Dosažení a překročení cíle',
      tasks: ['Udržuj CAC pod kontrolou', 'Diverzifikuj traffic zdroje', 'Plánuj další růst']
    }];
  };
  const milestones = getMilestones();
  return <div className="space-y-6">
      {/* Action Plan Header */}
      <Card className="shadow-soft border-2 border-brand-orange">
        <CardHeader className="bg-gradient-brand text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Tvůj akční plán k úspěchu
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-brand-light-pink rounded-lg">
              <div className="text-2xl font-bold text-brand-wine">{dailyOrders}</div>
              <div className="text-sm text-brand-wine/70">objednávek denně</div>
            </div>
            <div className="text-center p-4 bg-brand-light-pink rounded-lg">
              <div className="text-2xl font-bold text-brand-wine">{formatNumber(dailyVisitors)}</div>
              <div className="text-sm text-brand-wine/70">návštěvníků denně</div>
            </div>
            <div className="text-center p-4 bg-brand-light-pink rounded-lg">
              <div className="text-2xl font-bold text-brand-wine">{formatCurrency(weeklyRevenue)}</div>
              <div className="text-sm text-brand-wine/70">týdně obrat</div>
            </div>
          </div>
          
          <div className="flex gap-3 justify-center">
            
            
          </div>
        </CardContent>
      </Card>

      {/* Priority Actions */}
      <Card className="shadow-soft">
        <CardHeader className="bg-brand-wine text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Prioritní kroky pro zlepšení
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {actions.map((action, index) => <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Badge variant={action.priority === 'high' ? 'destructive' : 'secondary'} className="mt-1">
                    {action.priority === 'high' ? 'Vysoká' : 'Střední'}
                  </Badge>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-brand-wine">{action.action}</h4>
                      <Badge variant="outline" className="text-xs">
                        {action.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-brand-wine/80 mb-2">
                      {action.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>⏱️ {action.timeframe}</span>
                      <span>📈 {action.impact}</span>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* Timeline & Milestones */}
      <Card className="shadow-soft">
        <CardHeader className="bg-brand-pink text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Cesta k tvému cíli - milníky
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {milestones.map((milestone, index) => <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    {index < milestones.length - 1 && <div className="w-0.5 h-16 bg-brand-orange/30 mt-2"></div>}
                  </div>
                  
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-brand-wine">{milestone.period}</h4>
                      <Badge variant="outline">{milestone.target}</Badge>
                    </div>
                    <p className="text-sm text-brand-wine/80 mb-3">
                      <strong>Zaměření:</strong> {milestone.focus}
                    </p>
                    <div className="space-y-1">
                      {milestone.tasks.map((task, taskIndex) => <div key={taskIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-brand-wine">{task}</span>
                        </div>)}
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* Quick Win Tips */}
      <Card className="shadow-soft border-l-4 border-brand-orange">
        <CardContent className="p-6">
          <h3 className="font-bold text-brand-wine mb-4 flex items-center gap-2">
            ⚡ Rychlé vítězství (do 7 dní)
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-brand-wine text-sm">Na webu:</h4>
              <ul className="text-sm text-brand-wine/80 space-y-1">
                <li>• Přidej trust signály (certifikáty, recenze)</li>
                <li>• Zjednodušš checkout proces</li>
                <li>• Nastav Google Analytics goals</li>
                <li>• Přidej live chat nebo FAQ</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-brand-wine text-sm">Marketing:</h4>
              <ul className="text-sm text-brand-wine/80 space-y-1">
                <li>• Spusť Google Ads pro branded terms</li>
                <li>• Nastav Facebook pixel</li>
                <li>• Vytvoř email welcome sérii</li>
                <li>• Optimalizuj product pages pro SEO</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};