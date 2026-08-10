'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, Locale } from '@/utils/i18n';
import { useTranslation } from '@/utils/i18n-client';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t, locale } = useTranslation();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    const cleanPathname = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    if (path === '/') {
      return cleanPathname === '/';
    }
    return cleanPathname.startsWith(path);
  };

  const navItems = [
    { name: t('nav.home', 'Home'), path: '/' },
    { name: t('nav.tours', 'Tours'), path: '/tours' },
    { name: t('nav.fleet', 'Our Fleet'), path: '/our-fleet' },
    { name: t('nav.about', 'About Us'), path: '/about' },
    { name: t('nav.blog', 'Blog'), path: '/blog' },
    { name: t('nav.contact', 'Contact'), path: '/contact' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="main-header">
      <div className="container">
        <Link 
          href={`/${locale}`} 
          className="navbar-logo" 
          onClick={closeMobileMenu}
          id="logo-link"
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
        >
          <span className="logo-text">
            <span className="logo-part-1">Morocco View</span>
            <span className="logo-part-2">Travel</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-links" id="desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={`/${locale}${item.path}`}
              className={isActive(item.path) ? 'active' : ''}
              id={`nav-${item.path.replace('/', '') || 'home'}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="navbar-actions" id="header-actions">
          <LanguageSwitcher />
          
          <Link 
            href={`/${locale}/contact`} 
            className="btn btn-primary btn-sm book-btn-desktop" 
            id="book-btn-desktop"
          >
            {t('nav.bookNow', 'Book Now')}
          </Link>

          <button 
            className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            id="hamburger-btn"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu Overlay */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`} id="mobile-nav-overlay">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={`/${locale}${item.path}`}
            onClick={closeMobileMenu}
            className={isActive(item.path) ? 'active' : ''}
            id={`mob-nav-${item.path.replace('/', '') || 'home'}`}
          >
            {item.name}
          </Link>
        ))}
        <Link 
          href={`/${locale}/contact`} 
          onClick={closeMobileMenu} 
          className="btn btn-primary" 
          id="mob-book-btn"
          style={{ marginTop: '1.5rem', width: '100%', textAlign: 'center' }}
        >
          {t('nav.bookNow', 'Book Now')}
        </Link>
      </div>
    </header>
  );
}
