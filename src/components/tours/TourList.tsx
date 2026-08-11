'use client';

import React, { useState } from 'react';
import TourCard from '@/components/tours/TourCard';
import { tours, tourCategories } from '@/data/tours';
import { getTranslated } from '@/utils/translate';
import { useTranslation } from '@/utils/i18n-client';

export default function TourList() {
  const { t, locale } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter tours by active category selection
  const filteredTours = activeCategory === 'all'
    ? tours
    : tours.filter(tour => tour.category === activeCategory);

  return (
    <>
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
                transition: 'all var(--transition-fast)',
                cursor: 'pointer'
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
    </>
  );
}
