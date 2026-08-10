'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { locales, Locale } from '@/utils/i18n';
import { useTranslation } from '@/utils/i18n-client';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t, locale } = useTranslation();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

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

  // Initialize theme from HTML attribute on mount
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

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
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Link 
          href={`/${locale}`} 
          className="navbar-logo" 
          onClick={closeMobileMenu}
          id="logo-link"
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
        >
          <div className="logo-img-wrapper" style={{ position: 'relative', width: '65px', height: '65px', flexShrink: 0 }}>
            <Image 
              src="/images/logo.png" 
              alt="Morocco View Travel Logo" 
              fill
              sizes="65px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className="logo-text-brand" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.15' }}>
            <span style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 800, 
              fontSize: '1.25rem', 
              letterSpacing: '0.5px',
              background: 'linear-gradient(135deg, #E6B800 0%, #FFF099 50%, #D4A017 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase'
            }}>
              Morocco View
            </span>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              letterSpacing: '2.5px', 
              color: 'var(--color-primary)',
              textTransform: 'uppercase'
            }}>
              Travel
            </span>
          </div>
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

        <div className="navbar-actions" id="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn" 
            aria-label="Toggle theme"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              cursor: 'pointer',
              fontSize: '1.25rem',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform var(--transition-base)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15) rotate(15deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

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
