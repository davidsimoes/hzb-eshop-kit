import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, MessageCircle, ExternalLink } from 'lucide-react';
export const OrganizationPartnership = () => {
  const { t } = useTranslation();
  
  const organizationsData = t('organizations.supportCommunity', { returnObjects: true }) as any;
  const organizations = Array.isArray(organizationsData) ? organizationsData : [];

  // Don't render a "partner organizations" claim with nothing behind it.
  if (organizations.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-brand-wine mb-4">
          {t('organizations.title')}
        </h2>
        <p className="text-lg text-brand-wine/70">
          {t('organizations.subtitle')}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {organizations.map((org: any, index: number) => (
          <Card key={index} className="border-brand-light-pink hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-brand-wine">{org.name}</CardTitle>
                <Users className="w-6 h-6 text-brand-orange" />
              </div>
              <CardDescription className="text-brand-wine/70">
                {org.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="mb-4 border-brand-orange text-brand-wine">
                {org.focus}
              </Badge>
              <Button asChild className="w-full bg-gradient-orange text-white">
                <a href={org.link} target="_blank" rel="noopener noreferrer">
                  Zjistit více
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};