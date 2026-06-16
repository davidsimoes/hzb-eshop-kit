// Průvodce (written guides). Source of truth = /docs/*.md in the repo (also on GitHub).
// Loaded at build time via Vite glob so the web pages and the GitHub docs never drift.

const files = import.meta.glob('/docs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface Guide {
  slug: string;        // URL slug, e.g. "spusteni-a-pravo"
  order: number;       // numeric prefix from the filename
  title: string;       // first "# N. Title" line, prefix stripped
  summary: string;     // first blockquote line (the "> ..." intro)
  content: string;     // full markdown (heading line removed; title rendered by the page)
}

function parse(path: string, raw: string): Guide {
  const file = path.split('/').pop() || '';
  const m = file.match(/^(\d+)-(.+)\.md$/);
  const order = m ? parseInt(m[1], 10) : 999;
  const slug = m ? m[2] : file.replace(/\.md$/, '');

  const lines = raw.split('\n');
  // Title from the first "# ..." line, strip a leading "N. " counter.
  const h1 = lines.find((l) => l.startsWith('# ')) || '';
  const title = h1.replace(/^#\s+/, '').replace(/^\d+\.\s*/, '').trim() || slug;
  // Summary from the first blockquote line.
  const quote = lines.find((l) => l.trim().startsWith('>')) || '';
  const summary = quote.replace(/^\s*>\s*/, '').trim();

  // Drop the first H1 (the page renders the title itself) to avoid a double heading.
  const h1Index = lines.findIndex((l) => l.startsWith('# '));
  const body = (h1Index >= 0 ? lines.slice(h1Index + 1) : lines).join('\n').trim();

  return { slug, order, title, summary, content: body };
}

export const GUIDES: Guide[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .sort((a, b) => a.order - b.order);

export function getGuide(slug?: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function adjacentGuides(slug?: string): { prev?: Guide; next?: Guide } {
  const i = GUIDES.findIndex((g) => g.slug === slug);
  if (i < 0) return {};
  return { prev: GUIDES[i - 1], next: GUIDES[i + 1] };
}

// Public GitHub source (same content, for those who want to download the whole kit).
export const GITHUB_REPO = 'https://github.com/davidsimoes/hzb-eshop-kit';
export const githubDocUrl = (slug: string) => {
  const g = GUIDES.find((x) => x.slug === slug);
  const num = g ? String(g.order).padStart(2, '0') : '00';
  return `${GITHUB_REPO}/blob/main/docs/${num}-${slug}.md`;
};
