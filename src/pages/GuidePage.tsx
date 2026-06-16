import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Navigation/Breadcrumb';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, BookOpen, Wrench, Sparkles, Copy, Check, HelpCircle } from 'lucide-react';
import { getGuide, adjacentGuides, getIntegration, getPromptRaw } from '@/data/guides';

const GuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = getGuide(slug);
  const [copied, setCopied] = useState(false);

  if (!guide) {
    return <Navigate to="/pruvodce" replace />;
  }

  const { prev, next } = adjacentGuides(slug);
  const integration = getIntegration(guide.slug);
  const promptRaw = getPromptRaw(integration.prompt);

  const copyPrompt = async () => {
    if (!promptRaw) return;
    try {
      await navigator.clipboard.writeText(promptRaw);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* schránka nedostupná, ignoruj */
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-soft">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Breadcrumb />

          <Link
            to="/pruvodce"
            className="inline-flex items-center gap-2 text-sm text-brand-wine/70 hover:text-brand-wine mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Všichni průvodci
          </Link>

          <h1 className="text-3xl lg:text-4xl font-bold text-brand-wine mb-3">{guide.title}</h1>
          {guide.summary && (
            <p className="text-lg text-brand-wine/70 mb-8 border-l-4 border-brand-orange/50 pl-4">
              {guide.summary}
            </p>
          )}

          {/* Nástroje k tomuhle kroku */}
          {integration.tools.length > 0 && (
            <div className="mb-8 rounded-xl border border-brand-light-pink bg-white/80 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-5 h-5 text-brand-orange flex-shrink-0" />
                <span className="text-base font-bold text-brand-wine">Nástroje k tomuhle kroku</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {integration.tools.map((t) => (
                  <Button
                    key={t.to + t.label}
                    asChild
                    className="bg-brand-wine text-white hover:bg-brand-wine/90"
                  >
                    <Link to={t.to}>
                      {t.label} <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <article className="guide-prose text-brand-wine/85">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-brand-wine mt-10 mb-3">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-brand-wine mt-7 mb-2">{children}</h3>
                ),
                p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1.5">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1.5">{children}</ol>,
                li: ({ children }) => <li className="leading-7">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-brand-wine">{children}</strong>,
                a: ({ href, children }) => {
                  const linkClass = 'text-brand-orange font-medium underline underline-offset-2 hover:text-brand-wine';
                  const raw = href || '';
                  const inApp = (to: string) => (
                    <Link to={to} className={linkClass}>{children}</Link>
                  );
                  const ext = (url: string) => (
                    <a href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>{children}</a>
                  );

                  // Same-page anchors.
                  if (raw.startsWith('#')) return <a href={raw} className={linkClass}>{children}</a>;
                  // Our own absolute links -> in-app navigation.
                  if (raw.includes('hzb.davidjose.net')) {
                    return inApp(raw.replace(/^https?:\/\/hzb\.davidjose\.net/, '') || '/');
                  }
                  // Strip a leading ./ or ../ from relative repo links.
                  const cleaned = raw.replace(/^(\.\.?\/)+/, '');
                  // Prompt files (/prompts/X.md) -> hotový prompt je zobrazený přímo na stránce.
                  if (/^prompts\/.+\.md$/i.test(cleaned)) {
                    return <a href="#ai-prompt" className={linkClass}>{children}</a>;
                  }
                  // Links to other guide docs (NN-slug.md or slug.md) -> in-app guide page.
                  const doc = cleaned.match(/^(?:\d+-)?([a-z0-9-]+)\.md$/i);
                  if (doc) return inApp(`/pruvodce/${doc[1]}`);
                  // Any other .md -> nejbližší interní cíl (seznam průvodců), ať to nikdy nespadne na 404.
                  if (/\.md$/i.test(cleaned)) return inApp('/pruvodce');
                  // External links.
                  if (/^https?:\/\//.test(raw)) return ext(raw);
                  // Fallback: render as-is.
                  return <a href={raw} className={linkClass}>{children}</a>;
                },
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-brand-light-pink bg-brand-light-pink/15 rounded-r-lg px-4 py-2 my-4 text-brand-wine/80">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="w-full text-sm border-collapse">{children}</table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="text-left font-semibold text-brand-wine border-b border-brand-light-pink p-2">{children}</th>
                ),
                td: ({ children }) => <td className="border-b border-brand-light-pink/60 p-2 align-top">{children}</td>,
                code: ({ children }) => (
                  <code className="bg-brand-light-pink/30 text-brand-wine px-1.5 py-0.5 rounded text-[0.9em]">{children}</code>
                ),
                hr: () => <hr className="my-8 border-brand-light-pink" />,
              }}
            >
              {guide.content}
            </ReactMarkdown>
          </article>

          {/* Hotový AI prompt pro tenhle krok */}
          {promptRaw && (
            <section id="ai-prompt" className="mt-12 scroll-mt-24">
              <div className="rounded-xl border border-brand-light-pink bg-gradient-to-br from-brand-light-pink/20 to-brand-light-pink/40 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-brand-wine flex-shrink-0" />
                  <h2 className="text-xl font-bold text-brand-wine">Hotový AI prompt pro tenhle krok</h2>
                </div>
                <p className="text-sm text-brand-wine/80 mb-4">
                  Zkopíruj si ho a vlož do ChatGPT, Claude nebo Gemini. Doplň si jen závorky a máš
                  parťáka na tenhle krok.
                </p>
                <pre className="text-xs sm:text-sm bg-white/70 rounded-lg p-4 max-h-96 overflow-auto text-brand-wine/90 whitespace-pre-wrap font-mono mb-3">
                  {promptRaw}
                </pre>
                <Button
                  onClick={copyPrompt}
                  variant="outline"
                  className="border-brand-wine text-brand-wine hover:bg-brand-wine hover:text-white"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Zkopírováno' : 'Zkopírovat prompt'}
                </Button>
              </div>
            </section>
          )}

          {/* Související */}
          <section className="mt-12 pt-6 border-t border-brand-light-pink">
            <h2 className="text-lg font-bold text-brand-wine mb-3">Související</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
              {integration.tools.map((t) => (
                <Link
                  key={t.to + t.label}
                  to={t.to}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-wine hover:text-brand-orange transition-colors"
                >
                  <Wrench className="w-4 h-4" /> {t.label}
                </Link>
              ))}
              <Link
                to="/faq"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-wine hover:text-brand-orange transition-colors"
              >
                <HelpCircle className="w-4 h-4" /> Máš otázku? Mrkni na časté dotazy
              </Link>
            </div>

            {/* Předchozí / další průvodce */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="flex gap-2 flex-wrap">
                {prev && (
                  <Button asChild variant="outline" size="sm" className="border-brand-wine/30 text-brand-wine">
                    <Link to={`/pruvodce/${prev.slug}`}><ArrowLeft className="w-4 h-4 mr-1" /> {prev.title}</Link>
                  </Button>
                )}
                {next && (
                  <Button asChild variant="outline" size="sm" className="border-brand-wine/30 text-brand-wine">
                    <Link to={`/pruvodce/${next.slug}`}>{next.title} <ArrowRight className="w-4 h-4 ml-1" /></Link>
                  </Button>
                )}
              </div>
              <Button asChild variant="ghost" size="sm" className="text-brand-wine/70">
                <Link to="/pruvodce"><BookOpen className="w-4 h-4 mr-1" /> Všichni průvodci</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default GuidePage;
