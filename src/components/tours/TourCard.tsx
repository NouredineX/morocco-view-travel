'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Locale } from '@/utils/i18n';
import { useTranslation } from '@/utils/i18n-client';
import { getLocalizedPath } from '@/utils/routes';
import type { Tour } from '@/types';
import { getTranslated } from '@/utils/translate';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  const { locale } = useTranslation();
  const { t } = useTranslation();
  const [imgSrc, setImgSrc] = useState(`/images/${tour.image}`);

  // Localized title and highlights
  const title = getTranslated(tour, 'title', locale) as string;
  const highlights = getTranslated(tour, 'highlights', locale) as string[];

  // Fallback to unsplash if local image fails
  const handleError = () => {
    setImgSrc('https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80');
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = encodeURIComponent(`Hello Travelling Through Morocco, I would like to inquire about booking the tour: "${title}"`);
    window.open(`https://wa.me/212708228026?text=${message}`, '_blank');
  };

  return (
    <article className="tour-card glass-card" id={`tour-card-${tour.id}`}>
      <div className="tour-card-image" style={{ position: 'relative', height: '220px', width: '100%' }}>
        {tour.badge && (
          <span className={`badge badge-${tour.badge}`} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>
            {tour.badge}
          </span>
        )}
        <Image 
          src={imgSrc} 
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="tour-image"
          style={{ objectFit: 'cover' }}
          onError={handleError}
        />
      </div>
      <div className="tour-card-body">
        <div className="tour-card-meta">
          <span className="meta-item" id={`tour-duration-${tour.id}`}>
            🕒 {tour.duration} {tour.duration > 1 ? t('tour.days', 'days') : t('tour.day', 'day')}
          </span>
          <span className="meta-item" id={`tour-departure-${tour.id}`}>
            📍 {t('tour.departure', 'From')}: {tour.departure}
          </span>
        </div>
        <h3 style={{ fontSize: '1.25rem', margin: '0.5rem 0' }}>
          <Link href={getLocalizedPath('tours', locale, tour.slug)} id={`tour-title-link-${tour.id}`} style={{ color: 'inherit' }}>
            {title}
          </Link>
        </h3>
        <div className="tour-card-rating" style={{ display: 'flex', gap: '0.4rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
          <span style={{ color: 'var(--color-primary)' }}>⭐ {tour.rating.toFixed(1)}</span>
          <span style={{ color: 'var(--text-muted)' }}>({tour.reviewCount} {t('tour.reviews', 'reviews')})</span>
        </div>
        <ul className="tour-highlights-list" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem', listStyleType: 'circle', marginBottom: '1.5rem' }}>
          {highlights.slice(0, 3).map((hl, idx) => (
            <li key={idx} style={{ marginBottom: '0.25rem' }}>{hl}</li>
          ))}
        </ul>
        <div className="tour-card-footer">
          <button 
            onClick={handleBookNow} 
            className="btn btn-secondary btn-sm" 
            style={{ width: '100%', textAlign: 'center' }} 
            id={`tour-book-btn-${tour.id}`}
          >
            {t('tour.bookNow', 'Book Now')}
          </button>
        </div>
      </div>
    </article>
  );
}
