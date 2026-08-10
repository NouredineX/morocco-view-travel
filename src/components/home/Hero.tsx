'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/utils/i18n-client';

export default function Hero() {
  const { t, locale } = useTranslation();

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: 'smooth'
    });
  };

  return (
    <section className="hero" id="main-hero-section">
      <div className="hero-bg">
        <Image
          src="/images/merzoga.webp"
          alt="Sahara Desert Dunes Morocco View Travel"
          fill
          className="hero-image"
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <span className="hero-accent">{t('hero.accent', 'Welcome to Morocco')}</span>
        <h1>{t('hero.title', 'Discover the Magic of Morocco')}</h1>
        <p>{t('hero.subtitle', 'Your gateway to authentic Moroccan adventures — from the golden Sahara dunes to the blue streets of Chefchaouen')}</p>
        
        <div className="hero-buttons">
          <Link href={`/${locale}/tours`} className="btn btn-primary btn-lg" id="hero-btn-tours">
            {t('hero.exploreTours', 'Explore Tours')}
          </Link>
          <Link href={`/${locale}/contact`} className="btn btn-secondary btn-lg" id="hero-btn-contact">
            {t('hero.contactUs', 'Contact Us')}
          </Link>
        </div>
      </div>

      <button 
        className="scroll-indicator" 
        onClick={handleScrollDown}
        aria-label="Scroll to content"
        id="hero-scroll-btn"
      >
        <span>{t('hero.scroll', 'Scroll Down')}</span>
        <div className="arrow"></div>
      </button>
    </section>
  );
}
