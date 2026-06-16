import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Header } from '@/components/Header/Header';
import { cn } from '@/lib/utils';
import {
  HelpCircle,
  Scale,
  Search,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

const iconMap = {
  Scale,
  Search,
  TrendingUp,
  Lightbulb,
} as const;

interface FaqLink {
  text: string;
  url: string;
  internal?: boolean;
}

interface FaqQuestion {
  q: string;
  a: string;
  links?: FaqLink[];
}

interface FaqSection {
  title: string;
  icon: keyof typeof iconMap;
  color: string;
  questions: FaqQuestion[];
}

const FAQ = () => {
  const { t } = useTranslation();

  const sections = t('faq.sections', { returnObjects: true }) as Record<string, FaqSection>;
  const sectionKeys = Object.keys(sections);
  const [active, setActive] = useState<string>(sectionKeys[0]);

  const scrollToSection = (key: string) => {
    setActive(key);
    const el = document.getElementById(`faq-${key}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <main className="container mx-auto px-4 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <header className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-3 mb-5">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light-pink/40">
                <HelpCircle className="h-8 w-8 text-brand-wine" />
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-brand-wine via-brand-orange to-brand-pink bg-clip-text text-transparent leading-tight">
                {t('faq.title')}
              </h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </header>

          {/* Category nav */}
          <nav
            aria-label="Kategorie otázek"
            className="sticky top-2 z-20 mb-12 flex flex-wrap justify-center gap-2 rounded-2xl border bg-background/85 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/70 shadow-sm"
          >
            {sectionKeys.map((key) => {
              const section = sections[key];
              const Icon = iconMap[section.icon] ?? HelpCircle;
              const isActive = active === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => scrollToSection(key)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-wine text-white shadow-sm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{section.title}</span>
                </button>
              );
            })}
          </nav>

          {/* Sections */}
          <div className="space-y-16">
            {sectionKeys.map((key) => {
              const section = sections[key];
              const Icon = iconMap[section.icon] ?? HelpCircle;

              return (
                <section
                  key={key}
                  id={`faq-${key}`}
                  className="scroll-mt-24"
                >
                  <div className="mb-5 flex items-center gap-3 border-b pb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                      <Icon className={cn('h-5 w-5', section.color)} />
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      {section.title}
                    </h2>
                  </div>

                  <Accordion type="single" collapsible className="w-full space-y-3">
                    {section.questions.map((question, qi) => (
                      <AccordionItem
                        key={qi}
                        value={`${key}-${qi}`}
                        className="rounded-xl border bg-card px-2 transition-shadow data-[state=open]:shadow-md"
                      >
                        <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                          <span className="text-base sm:text-lg font-semibold text-foreground pr-4">
                            {question.q}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-5">
                          <p className="whitespace-pre-line text-[15px] sm:text-base leading-7 text-muted-foreground">
                            {question.a}
                          </p>

                          {question.links && question.links.length > 0 && (
                            <FaqLinks links={question.links} />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              );
            })}
          </div>

          {/* Footer card */}
          <div className="mt-16">
            <div className="rounded-2xl border border-brand-pink/30 bg-gradient-to-r from-brand-light-pink/25 to-background p-7 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t('faq.footer.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('faq.footer.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const FaqLinks = ({ links }: { links: FaqLink[] }) => {
  const internal = links.filter((l) => l.internal);
  const external = links.filter((l) => !l.internal);

  return (
    <div className="mt-5 space-y-4">
      {internal.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {internal.map((link, i) => (
            <Link
              key={i}
              to={link.url}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-wine/10 px-3.5 py-2 text-sm font-medium text-brand-wine transition-colors hover:bg-brand-wine hover:text-white"
            >
              {link.text}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      )}

      {external.length > 0 && (
        <div className="border-t pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Užitečné odkazy
          </p>
          <ul className="space-y-1.5">
            {external.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-brand-orange underline-offset-4 hover:underline"
                >
                  {link.text}
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FAQ;
