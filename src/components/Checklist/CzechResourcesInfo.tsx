import { ExternalLink, CreditCard, Truck, Building, Scale, Megaphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const CzechResourcesInfo = () => {
  const { t } = useTranslation();

  const resourceSections = [
    {
      key: 'banks',
      title: t('checklist.czechResources.banks.title'),
      icon: <Building className="w-5 h-5" />,
      items: t('checklist.czechResources.banks.items', { returnObjects: true }) as string[]
    },
    {
      key: 'payment',
      title: t('checklist.czechResources.payment.title'),
      icon: <CreditCard className="w-5 h-5" />,
      items: t('checklist.czechResources.payment.items', { returnObjects: true }) as string[]
    },
    {
      key: 'shipping',
      title: t('checklist.czechResources.shipping.title'),
      icon: <Truck className="w-5 h-5" />,
      items: t('checklist.czechResources.shipping.items', { returnObjects: true }) as string[]
    },
    {
      key: 'platforms',
      title: t('checklist.czechResources.platforms.title'),
      icon: <ExternalLink className="w-5 h-5" />,
      items: t('checklist.czechResources.platforms.items', { returnObjects: true }) as string[]
    },
    {
      key: 'legal',
      title: t('checklist.czechResources.legal.title'),
      icon: <Scale className="w-5 h-5" />,
      items: t('checklist.czechResources.legal.items', { returnObjects: true }) as string[]
    },
    {
      key: 'marketing',
      title: t('checklist.czechResources.marketing.title'),
      icon: <Megaphone className="w-5 h-5" />,
      items: t('checklist.czechResources.marketing.items', { returnObjects: true }) as string[]
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          {t('checklist.czechResources.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resourceSections.map((section, index) => (
            <div 
              key={section.key}
              className="p-4 border rounded-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="font-medium flex items-center gap-2 mb-3">
                {section.icon}
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-muted-foreground">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};