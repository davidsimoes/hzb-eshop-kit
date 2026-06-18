import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface FaqItem {
  question: string;
  answer: string;
}

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  structuredData?: object;
  /** When provided, emits FAQPage JSON-LD in addition to the page structured data. */
  faqItems?: FaqItem[];
}

const BASE_URL = 'https://hzb.davidjose.net';

export const MetaTags = ({ 
  title, 
  description, 
  image = `${BASE_URL}/og-image.jpg`,
  url = (window.location.origin + window.location.pathname),
  type = 'website',
  structuredData,
  faqItems
}: MetaTagsProps) => {
  const { t } = useTranslation();
  
  const siteTitle = t('site.title');
  const siteDescription = t('site.description');
  
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const fullDescription = description || siteDescription;
  
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": fullTitle,
    "description": fullDescription,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "url": BASE_URL,
    "inLanguage": "cs",
    "author": {
      "@type": "Person",
      "name": "David Simões",
      "jobTitle": "E-commerce Consultant",
      "url": `${BASE_URL}/o-mne`
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CZK"
    },
    "featureList": [
      "Finanční kalkulačka pro e-shop",
      "15denní checklist pro spuštění",
      "Marketingový plánovač",
      "ROI kalkulačka",
      "Nástroje pro podnikatele"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Entrepreneurs",
      "geographicArea": {
        "@type": "Country",
        "name": "Czech Republic"
      }
    },
    "mainEntity": {
      "@type": "WebApplication",
      "@id": BASE_URL + "#calculator",
      "name": "E-shop finanční kalkulačka",
      "description": "Kalkulačka pro plánování zisku a rozpočtu e-shopu",
      "applicationCategory": "FinanceApplication"
    }
  };

  // Article variant for guide/article pages — gives those pages page-specific
  // Article structured data instead of the generic SoftwareApplication.
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": fullTitle,
    "description": fullDescription,
    "image": image,
    "url": url,
    "inLanguage": "cs",
    "author": {
      "@type": "Person",
      "name": "David Simões",
      "jobTitle": "E-commerce Consultant",
      "url": `${BASE_URL}/o-mne`
    },
    "publisher": {
      "@type": "Person",
      "name": "David Simões",
      "url": `${BASE_URL}/o-mne`
    }
  };

  // Explicit structuredData prop wins; otherwise pick Article for article pages,
  // SoftwareApplication for everything else.
  const finalStructuredData =
    structuredData || (type === 'article' ? articleStructuredData : baseStructuredData);

  // Optional FAQPage JSON-LD, emitted alongside the page structured data.
  const faqStructuredData =
    faqItems && faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        }
      : null;

  return (
    <Helmet>
      {/* HTML language - Czech only */}
      <html lang="cs" />
      
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="language" content="cs" />
      <meta name="author" content="David Simões" />
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="cs_CZ" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@davidsimoes_" />
      <meta name="twitter:creator" content="@davidsimoes_" />
      
      {/* Enhanced Czech keywords */}
      <meta name="keywords" content="e-shop checklist, spuštění e-shopu, finanční kalkulačka, online byznys, podnikání, e-commerce, internetový obchod, webshop, dropshipping, marketingový rozpočet, ROI kalkulačka, zisk z e-shopu, jak začít prodávat online, shopify, shoptet, david simões, e-shop poradenství, online prodej, digitální marketing, konverzní poměr, průměrná objednávka, náklady na získání zákazníka" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>

      {/* FAQPage Structured Data (only when faqItems provided) */}
      {faqStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      )}
    </Helmet>
  );
};