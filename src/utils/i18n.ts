import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import it from '../locales/it.json';
import ja from '../locales/ja.json';
import zh from '../locales/zh.json';

export const locales = ['en', 'es', 'fr', 'it', 'ja', 'zh'] as const;
export type Locale = typeof locales[number];

export const translations: Record<Locale, any> = { en, es, fr, it, ja, zh };

export function getTranslations(locale: Locale) {
  const t = translations[locale] || translations['en'];
  return (key: string, defaultValue?: string) => {
    const keys = key.split('.');
    let value = t;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    return value || defaultValue || key;
  };
}
