export function getTranslated<T extends Record<string, any>>(
  obj: T,
  field: string,
  lang: string
): any {
  if (!obj) return '';
  
  const fieldMap: Record<string, string> = {
    fr: 'Fr',
    es: 'Es',
    it: 'It',
    ja: 'Ja',
    zh: 'Zh'
  };
  
  const suffix = fieldMap[lang];
  if (suffix) {
    const key = `${field}${suffix}`;
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
      return obj[key];
    }
  }
  
  return obj[field] || '';
}
