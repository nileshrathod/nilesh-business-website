import { useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';

interface SeoHeadProps {
  title?: string;
  description?: string;
}

export function SeoHead({ title, description }: SeoHeadProps) {
  useEffect(() => {
    const resolvedTitle = title
      ? siteConfig.seo.titleTemplate.replace('%s', title)
      : siteConfig.seo.defaultTitle;
    const resolvedDescription = description || siteConfig.seo.defaultDescription;

    document.title = resolvedTitle;

    const updateMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    updateMeta('meta[name="description"]', resolvedDescription);
    updateMeta('meta[property="og:title"]', resolvedTitle);
    updateMeta('meta[property="og:description"]', resolvedDescription);
    updateMeta('meta[name="twitter:title"]', resolvedTitle);
    updateMeta('meta[name="twitter:description"]', resolvedDescription);
  }, [title, description]);

  return null;
}
