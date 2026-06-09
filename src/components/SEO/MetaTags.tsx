import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  structuredData?: object;
}

const BASE_URL = 'https://hzb.davidjose.net';

export const MetaTags = ({ 
  title, 
  description, 
  image = `${BASE_URL}/og-image.jpg`,
  url = window.location.href,
  type = 'website',
  structuredData
}: MetaTagsProps) => {
  const { t } = useTranslation();
  
  const siteTitle = t('site.title');
  const siteDescription = t('site.description');
  
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const fullDescription = description || siteDescription;
  
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": siteTitle,
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

  const finalStructuredData = structuredData || baseStructuredData;

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
      <meta name="twitter:creator" content="@davidlsimoes" />
      
      {/* Enhanced Czech keywords */}
      <meta name="keywords" content="e-shop checklist, spuštění e-shopu, finanční kalkulačka, online byznys, podnikání, e-commerce, internetový obchod, webshop, dropshipping, marketingový rozpočet, ROI kalkulačka, zisk z e-shopu, jak začít prodávat online, shopify, shoptet, david simões, e-shop poradenství, online prodej, digitální marketing, konverzní poměr, průměrná objednávka, náklady na získání zákazníka" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};