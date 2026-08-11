'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Locale, getTranslations } from '@/utils/i18n';
import TourCard from '@/components/tours/TourCard';
import { tours, tourCategories } from '@/data/tours';
import { getTranslated } from '@/utils/translate';

export default function ToursPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'en';
  const t = getTranslations(locale);

  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter tours by active category selection
  const filteredTours = activeCategory === 'all'
    ? tours
    : tours.filter(tour => tour.category === activeCategory);

  return (
    <div id="tours-page">
      {/* Banner */}
      <section className="page-hero" style={{ background: 'linear-gradient(rgba(10, 15, 26, 0.75), rgba(10, 15, 26, 0.9)), url("/images/merzoga.webp") no-repeat center center/cover', paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
        <div className="page-hero-content">
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{t('nav.tours', 'Tours')}</h1>
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <a href={`/${locale}`} style={{ color: 'inherit' }}>{t('nav.home', 'Home')}</a>
            <span className="separator">/</span>
            <span style={{ color: 'var(--color-primary)' }}>{t('nav.tours', 'Tours')}</span>
          </div>
        </div>
      </section>

      {/* Filter & Tour Grid */}
      <section className="section" id="tours-grid-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle" style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>
              {t('tours.subtitle', 'Morocco Sahara Adventures')}
            </span>
            <h2>{t('tours.title', 'Best Morocco Desert Tours & Excursions')}</h2>
            <p>{t('tours.desc', 'Select from our pre-planned curated itineraries or contact us for a customized itinerary designed just for you.')}</p>
          </div>

          {/* Filter Bar */}
          <div className="glass-card filter-bar" id="tours-filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', padding: '1.25rem', marginBottom: '3rem', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginRight: '0.5rem' }}>{t('tour.filterBy', 'Filter by')}:</span>
            {tourCategories.map(cat => {
              const label = getTranslated(cat, 'label', locale);
              return (
                <button
                  key={cat.id}
                  className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  id={`filter-btn-${cat.id}`}
                  style={{
                    padding: '0.5rem 1.25rem',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-full)',
                    background: activeCategory === cat.id ? 'var(--color-primary)' : 'var(--bg-glass)',
                    color: activeCategory === cat.id ? 'var(--bg-dark)' : 'var(--text-primary)',
                    border: '1px solid var(--border-glass)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Tours Grid */}
          {filteredTours.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
              <p>{t('tour.noTours', 'No tours found matching your criteria')}</p>
            </div>
          ) : (
            <div className="grid-3" id="all-tours-grid">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
