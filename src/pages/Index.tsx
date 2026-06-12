import { Header } from '@/components/Header/Header';
import { MissionHero } from '@/components/MissionHero';
import { LearningPath } from '@/components/LearningPath';
import { ClientLogos } from '@/components/ClientLogos';
import { OrganizationPartnership } from '@/components/OrganizationPartnership';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Shield, Clock, Users } from 'lucide-react';

const Index = () => {
  const { t } = useTranslation();

  const fearPoints = t('encouragement.fear.points', { returnObjects: true }) as string[];
  const realityPoints = t('encouragement.reality.points', { returnObjects: true }) as string[];

  return (
    <>
      <Header />
      <main id="main-content" role="main" aria-label={t('site.description')}>
        {/* Mission Hero */}
        <MissionHero />

        {/* Client logos — light credibility strip */}
        <ClientLogos />

        {/* Fear Reduction Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="bg-brand-pink/20 text-brand-wine mb-4 text-base px-4 py-2">
                  <Shield className="w-4 h-4 mr-2 animate-pulse" />
                  {t('mission.support.title')}
                </Badge>
                <p className="text-lg text-brand-wine/70 mb-6">
                  {t('mission.support.helpText')}
                </p>
                <p className="text-base text-brand-wine/60">
                  {t('mission.support.confidence')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-brand-light-pink bg-gradient-soft">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-brand-wine mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-brand-orange" />
                      {t('encouragement.fear.title')}
                    </h3>
                    <ul className="space-y-3">
                      {fearPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-brand-wine/70">
                          <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 flex-shrink-0"></div>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-brand-light-pink bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-brand-wine mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-brand-orange" />
                      {t('encouragement.reality.title')}
                    </h3>
                    <p className="text-brand-wine/60 italic mb-4 text-sm">
                      {t('encouragement.reality.honest')}
                    </p>
                    <ul className="space-y-3">
                      {realityPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-brand-wine/70">
                          <div className="w-2 h-2 bg-brand-wine rounded-full mt-2 flex-shrink-0"></div>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Path */}
        <LearningPath />

        {/* Organization Partnership */}
        <OrganizationPartnership />
      </main>
    </>
  );
};

export default Index;
