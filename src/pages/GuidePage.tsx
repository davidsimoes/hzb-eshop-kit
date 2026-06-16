import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Navigation/Breadcrumb';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, BookOpen, Github } from 'lucide-react';
import { getGuide, adjacentGuides, githubDocUrl } from '@/data/guides';

const GuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = getGuide(slug);

  if (!guide) {
    return <Navigate to="/pruvodce" replace />;
  }

  const { prev, next } = adjacentGuides(slug);

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
                  const external = !!href && /^https?:\/\//.test(href);
                  const internal = !!href && href.includes('hzb.davidjose.net');
                  // Rewrite our own absolute links to in-app navigation.
                  if (internal) {
                    const path = href!.replace(/^https?:\/\/hzb\.davidjose\.net/, '') || '/';
                    return (
                      <Link to={path} className="text-brand-orange font-medium underline underline-offset-2 hover:text-brand-wine">
                        {children}
                      </Link>
                    );
                  }
                  return (
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="text-brand-orange font-medium underline underline-offset-2 hover:text-brand-wine"
                    >
                      {children}
                    </a>
                  );
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

          {/* Prev / next + GitHub source */}
          <div className="mt-12 pt-6 border-t border-brand-light-pink flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
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
            <div className="flex gap-2">
              <Button asChild variant="ghost" size="sm" className="text-brand-wine/70">
                <Link to="/pruvodce"><BookOpen className="w-4 h-4 mr-1" /> Všichni průvodci</Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="text-brand-wine/70">
                <a href={githubDocUrl(guide.slug)} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-1" /> Zdroj na GitHubu
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default GuidePage;
