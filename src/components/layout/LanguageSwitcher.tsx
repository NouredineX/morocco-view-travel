'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { locales, Locale } from '@/utils/i18n';
import { translatePath } from '@/utils/routes';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'zh', label: '中文', flag: '🇨🇳' }
  ];

  // Extract current locale from pathname
  const pathParts = pathname.split('/');
  const currentLocaleCode = (locales.includes(pathParts[1] as Locale) ? pathParts[1] : 'en') as Locale;
  const currentLanguage = languages.find(lang => lang.code === currentLocaleCode) || languages[0];

  const changeLanguage = (code: string) => {
    setIsOpen(false);
    const newPath = translatePath(pathname, code as Locale);
    router.push(newPath);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="lang-switcher" ref={dropdownRef} id="lang-switcher-container">
      <button 
        className="lang-switcher-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        id="lang-switcher-trigger"
        aria-label="Select Language"
      >
        <span className="lang-flag">{currentLanguage.flag}</span>
        <span className="lang-label">{currentLanguage.label}</span>
        <span className="lang-arrow">▼</span>
      </button>
      <div className={`lang-dropdown ${isOpen ? 'open' : ''}`} id="lang-switcher-dropdown">
        {languages.map(lang => (
          <button
            key={lang.code}
            className={`lang-option ${currentLocaleCode === lang.code ? 'active' : ''}`}
            onClick={() => changeLanguage(lang.code)}
            id={`lang-btn-${lang.code}`}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
