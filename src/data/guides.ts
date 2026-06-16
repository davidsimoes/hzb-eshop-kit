// Průvodce (written guides). Source of truth = /docs/*.md in the repo (also on GitHub).
// Loaded at build time via Vite glob so the web pages and the GitHub docs never drift.

const files = import.meta.glob('/docs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// AI prompty (/prompts/*.md) nahrané stejnou technikou jako docs, aby web a repo nedrift­ovaly.
const promptFiles = import.meta.glob('/prompts/*.md', {
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

// ---------------------------------------------------------------------------
// Propojení průvodců s nástroji webu a hotovými AI prompty.
// ---------------------------------------------------------------------------

export interface ToolLink {
  label: string; // text tlačítka
  to: string;    // interní route v aplikaci
}

export interface GuideIntegration {
  tools: ToolLink[];   // navazující nástroje (CTA)
  prompt?: string;     // soubor v /prompts (např. "validace-persony.md")
}

// Mapa slug -> navazující nástroje + AI prompt. Routes ověřeny proti App.tsx.
export const GUIDE_INTEGRATIONS: Record<string, GuideIntegration> = {
  'zacni-tady': {
    tools: [{ label: 'Ověř svůj nápad', to: '/validace' }],
  },
  validace: {
    tools: [{ label: 'Otevři nástroj: Ověř nápad', to: '/validace' }],
    prompt: 'validace-persony.md',
  },
  'vyber-platformy': {
    tools: [{ label: 'Průvodce výběrem platformy', to: '/vyber-platformy' }],
    prompt: 'vyber-platformy.md',
  },
  'spusteni-a-pravo': {
    tools: [{ label: 'Spouštěcí checklist', to: '/checklist' }],
    prompt: 'spusteni-checklist.md',
  },
  'marketing-a-znacka': {
    tools: [{ label: 'Diagnostika e-shopu', to: '/diagnostika' }],
    prompt: 'marketing-plan.md',
  },
  'provoz-a-finance': {
    tools: [
      { label: 'Finanční kalkulačka', to: '/kalkulacka' },
      { label: 'ROI kalkulačka', to: '/roi-kalkulacka' },
    ],
    prompt: 'connect-data.md',
  },
  'kdyz-to-neprodava': {
    tools: [{ label: 'Diagnostika e-shopu', to: '/diagnostika' }],
    prompt: 'diagnostika-prodeje.md',
  },
  pribehy: {
    tools: [],
  },
};

export function getIntegration(slug?: string): GuideIntegration {
  return (slug && GUIDE_INTEGRATIONS[slug]) || { tools: [] };
}

// Vrátí surový text AI promptu (k zkopírování do ChatGPT), nebo undefined.
export function getPromptRaw(file?: string): string | undefined {
  if (!file) return undefined;
  const key = Object.keys(promptFiles).find((p) => p.endsWith('/' + file) || p.endsWith(file));
  return key ? promptFiles[key] : undefined;
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
