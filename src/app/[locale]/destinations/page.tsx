'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Locale, getTranslations } from '@/utils/i18n';
import { destinations } from '@/data/destinations';
import { getTranslated } from '@/utils/translate';

export default function DestinationsPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'en';
  const t = getTranslations(locale);

  return (
    <div id="destinations-page">
      {/* Banner */}
      <section className="page-hero" style={{ background: 'linear-gradient(rgba(10, 15, 26, 0.75), rgba(10, 15, 26, 0.9)), url("/images/merzoga.webp") no-repeat center center/cover', paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
        <div className="page-hero-content">
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{t('nav.destinations', 'Destinations')}</h1>
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <a href={`/${locale}`} style={{ color: 'inherit' }}>{t('nav.home', 'Home')}</a>
            <span className="separator">/</span>
            <span style={{ color: 'var(--color-primary)' }}>{t('nav.destinations', 'Destinations')}</span>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="section" id="destinations-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle" style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>{t('destinations.subtitle', 'Amazing Places')}</span>
            <h2>{t('destinations.title', 'Explore Morocco\'s Best Destinations')}</h2>
            <p>{t('destinations.desc', 'From imperial cities to coastal towns, discover the diverse beauty of Morocco')}</p>
          </div>

          <div className="grid-3" id="destinations-grid">
            {destinations.map((dest) => {
              const name = getTranslated(dest, 'name', locale);
              const tagline = getTranslated(dest, 'tagline', locale);
              
              return (
                <Link 
                  href={`/${locale}/tours`}
                  key={dest.id}
                  className="dest-card"
                  style={{ display: 'block', position: 'relative', overflow: 'hidden', height: '300px', cursor: 'pointer' }}
                  id={`dest-card-${dest.id}`}
                >
                  <div className="dest-card-image" style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <Image 
                      src={`/images/${dest.image}`} 
                      alt={name} 
                      fill
                      loading="lazy"
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="dest-card-overlay">
                    <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.4rem' }}>{name}</h3>
                    <p className="dest-tagline" style={{ margin: '0.25rem 0 0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{tagline}</p>
                    <div className="dest-tours" style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                      📁 {dest.tourCount} {t('destinations.tours', 'tours available')}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
