import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
export const SuccessStories = () => {
  const { t } = useTranslation();
  const stories = [{
    name: "Fitness oblečení Praha",
    category: "Sport",
    aov: 850,
    monthlyOrders: 1200,
    monthlyRevenue: 1020000,
    profit: 204000,
    timeline: "6 měsíců",
    keyTactic: "Instagram influenceři + Google Ads",
    icon: "💪",
    testimonial: "Začali jsme s 15k rozpočtem, teď investujeme 150k měsíčně"
  }, {
    name: "Dětské hračky Brno",
    category: "Děti",
    aov: 650,
    monthlyOrders: 800,
    monthlyRevenue: 520000,
    profit: 78000,
    timeline: "4 měsíce",
    keyTactic: "Facebook Ads + email marketing",
    icon: "🧸",
    testimonial: "Klíč byl cílení na rodiče 25-40 let + sezónní kampaně"
  }, {
    name: "Kosmetika online",
    category: "Beauty",
    aov: 480,
    monthlyOrders: 2100,
    monthlyRevenue: 1008000,
    profit: 151200,
    timeline: "8 měsíců",
    keyTactic: "TikTok + affiliate program",
    icon: "💄",
    testimonial: "TikTok nám přinesl 60% zákazníků pod 30 let"
  }];
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">🏆 {t('calculator.success.title')}</h3>
        <p className="text-muted-foreground">
          {t('calculator.success.subtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {t(`calculator.success.category.${story.category.toLowerCase()}`)}
                </Badge>
                <span className="text-2xl">{story.icon}</span>
              </div>
              <CardTitle className="text-lg">{story.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">AOV</p>
                  <p className="font-medium">{formatCurrency(story.aov)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('calculator.success.monthlyOrders')}</p>
                  <p className="font-medium flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {story.monthlyOrders}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('calculator.success.monthlyRevenue')}</p>
                  <p className="font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {formatCurrency(story.monthlyRevenue)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('calculator.success.monthlyProfit')}</p>
                  <p className="font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {formatCurrency(story.profit)}
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-3">
                <p className="text-xs text-muted-foreground mb-1">
                  {t('calculator.success.growthTime')}: {story.timeline}
                </p>
                <p className="text-xs font-medium mb-2">
                  {story.keyTactic}
                </p>
                <blockquote className="text-xs italic border-l-2 border-primary/20 pl-2">
                  "{story.testimonial}"
                </blockquote>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};