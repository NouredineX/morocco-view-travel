'use client';

import { useParams } from 'next/navigation';
import { Locale, translations } from './i18n';

export function useTranslation() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'en';
  const t = translations[locale] || translations['en'];

  return {
    t: (key: string, defaultValue?: string) => {
      const keys = key.split('.');
      let value = t;
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) break;
      }
      return value || defaultValue || key;
    },
    locale
  };
}
