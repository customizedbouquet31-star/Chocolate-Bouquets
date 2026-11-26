import { useEffect } from 'react';

interface SEOOptions {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | null;
}

const BASE_URL = 'https://thechocolatebouquets.in';
const DEFAULT_KEYWORDS =
  'the chocolate bouquet, chocolate bouquet, chocolate bouquets, bouquets, flower bouquets, custom bouquets, customized chocolate bouquet, luxury gift hampers, polaroid bouquet, mens hampers, womens hampers, pan india bouquet delivery';

function setMetaTag(selector: string, attrName: 'name' | 'property', attrValue: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useSEO({
  title,
  description,
  keywords = DEFAULT_KEYWORDS,
  canonicalPath = '/',
  ogImage = `${BASE_URL}/logo.png`,
  jsonLd = null,
}: SEOOptions) {
  useEffect(() => {
    document.title = title;

    const fullUrl = `${BASE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', fullUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    const scriptId = 'dynamic-page-jsonld';
    const existingScript = document.getElementById(scriptId);
    if (jsonLd) {
      const script = existingScript || document.createElement('script');
      script.id = scriptId;
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(jsonLd);
      if (!existingScript) {
        document.head.appendChild(script);
      }
    } else if (existingScript) {
      existingScript.remove();
    }

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [title, description, keywords, canonicalPath, ogImage, jsonLd]);
}

