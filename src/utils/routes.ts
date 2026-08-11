import { Locale, locales } from './i18n';

export const pageSlugMap = {
  about: {
    en: 'about',
    fr: 'a-propos',
    es: 'sobre-nosotros',
    it: 'chi-siamo',
    ja: 'about',
    zh: 'about',
  },
  contact: {
    en: 'contact',
    fr: 'contact',
    es: 'contacto',
    it: 'contatti',
    ja: 'contact',
    zh: 'contact',
  },
  'our-fleet': {
    en: 'our-fleet',
    fr: 'notre-flotte',
    es: 'nuestra-flota',
    it: 'la-nostra-flotta',
    ja: 'our-fleet',
    zh: 'our-fleet',
  },
  testimonials: {
    en: 'testimonials',
    fr: 'temoignages',
    es: 'testimonios',
    it: 'testimonianze',
    ja: 'testimonials',
    zh: 'testimonials',
  },
  'privacy-policy': {
    en: 'privacy-policy',
    fr: 'politique-de-confidentialite',
    es: 'politica-de-privacidad',
    it: 'politica-sulla-privacy',
    ja: 'privacy-policy',
    zh: 'privacy-policy',
  },
  destinations: {
    en: 'destinations',
    fr: 'destinations',
    es: 'destinos',
    it: 'destinazioni',
    ja: 'destinations',
    zh: 'destinations',
  },
  tours: {
    en: 'tours',
    fr: 'circuits',
    es: 'tours',
    it: 'tour',
    ja: 'tours',
    zh: 'tours',
  },
  blog: {
    en: 'blog',
    fr: 'blog',
    es: 'blog',
    it: 'blog',
    ja: 'blog',
    zh: 'blog',
  },
};

/**
 * Returns the localized URL path for a page type and locale
 */
export function getLocalizedPath(pageType: string, locale: Locale, dynamicSlug?: string): string {
  if (pageType === 'home') {
    return `/${locale}`;
  }

  const mapped = pageSlugMap[pageType as keyof typeof pageSlugMap];
  if (!mapped) {
    return `/${locale}`;
  }

  const slug = mapped[locale] || mapped['en'];
  if (dynamicSlug) {
    return `/${locale}/${slug}/${dynamicSlug}`;
  }
  return `/${locale}/${slug}`;
}

/**
 * Translates a complete path from one locale to another for the Language Switcher
 */
export function translatePath(currentPathname: string, targetLocale: Locale): string {
  const parts = currentPathname.split('/').filter(Boolean);
  if (parts.length === 0) {
    return `/${targetLocale}`;
  }

  const hasLocale = locales.includes(parts[0] as Locale);
  const currentLocale = hasLocale ? (parts[0] as Locale) : 'en';
  const remainingParts = hasLocale ? parts.slice(1) : parts;

  if (remainingParts.length === 0) {
    return `/${targetLocale}`;
  }

  // Check if it matches a page type with a single slug
  if (remainingParts.length === 1) {
    const slug = remainingParts[0];
    for (const [pageType, translations] of Object.entries(pageSlugMap)) {
      if (translations[currentLocale as Locale] === slug) {
        return getLocalizedPath(pageType, targetLocale);
      }
    }
  }

  // Check if it matches a dynamic subpage with two slugs
  if (remainingParts.length === 2) {
    const parentSlug = remainingParts[0];
    const dynamicSlug = remainingParts[1];

    if (pageSlugMap.tours[currentLocale as Locale] === parentSlug) {
      return getLocalizedPath('tours', targetLocale, dynamicSlug);
    }
    if (pageSlugMap.blog[currentLocale as Locale] === parentSlug) {
      return getLocalizedPath('blog', targetLocale, dynamicSlug);
    }
  }

  // Fallback to the target home page if no match found
  return `/${targetLocale}`;
}
