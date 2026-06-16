import { Link } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Navigation/Breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight, Github } from 'lucide-react';
import { GUIDES, GITHUB_REPO } from '@/data/guides';

const Guides = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-soft">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Breadcrumb />

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-brand-orange mb-3">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Průvodci</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-brand-wine mb-3">
              Psaní průvodci ke každé oblasti
            </h1>
            <p className="text-lg text-brand-wine/70 max-w-2xl mx-auto">
              Ke každému kroku máš podrobný text, který tě provede do hloubky. Nástroje ti spočítají čísla,
              průvodci ti vysvětlí, co s nimi.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {GUIDES.map((g) => (
              <Link
                key={g.slug}
                to={`/pruvodce/${g.slug}`}
                className="group focus:outline-none focus:ring-2 focus:ring-brand-wine focus:ring-offset-2 rounded-xl"
              >
                <Card className="h-full border-brand-light-pink bg-white/80 hover:bg-white hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <h2 className="font-bold text-brand-wine text-lg mb-1 group-hover:text-brand-orange transition-colors">
                      {g.title}
                    </h2>
                    {g.summary && <p className="text-sm text-brand-wine/70 mb-3">{g.summary}</p>}
                    <span className="inline-flex items-center gap-1 text-sm text-brand-orange font-medium">
                      Číst průvodce <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="border-brand-wine/30 text-brand-wine">
              <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" /> Celý kit (a zdroje) na GitHubu
              </a>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Guides;
