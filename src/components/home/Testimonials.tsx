'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/utils/i18n-client';
import { testimonials } from '@/data/testimonials';
import { getTranslated } from '@/utils/translate';

export default function Testimonials() {
  const { locale } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const displayTestimonials = testimonials.slice(0, 3);

  useEffect(() => {
    const autoPlay = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % displayTestimonials.length);
    }, 6000);

    return () => clearInterval(autoPlay);
  }, [displayTestimonials.length]);

  const handlePrev = () => {
    setActiveIndex(prevIndex => (prevIndex - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % displayTestimonials.length);
  };

  return (
    <div className="testimonials-container" style={{ position: 'relative', overflow: 'hidden', padding: '1rem 0' }} id="testimonials-carousel">
      {displayTestimonials.map((testimonial, idx) => {
        const text = getTranslated(testimonial, 'text', locale);
        const isCurrent = idx === activeIndex;

        return (
          <div 
            key={testimonial.id}
            className={`testimonial-card glass-card ${isCurrent ? 'active' : ''}`}
            style={{
              display: isCurrent ? 'block' : 'none',
              maxWidth: '800px',
              margin: '0 auto',
              padding: '2.5rem'
            }}
            id={`testimonial-card-${testimonial.id}`}
          >
            <div className="stars" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.2rem' }}>
              {'★'.repeat(testimonial.rating)}
              {'☆'.repeat(5 - testimonial.rating)}
            </div>
            <blockquote style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>
              "{text}"
            </blockquote>
            <div className="author" style={{ fontWeight: 'bold', color: 'var(--color-primary)' }} id={`testimonial-author-${testimonial.id}`}>
              {testimonial.name}
            </div>
            <div className="country" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {testimonial.country}
            </div>
          </div>
        );
      })}

      {/* Navigation arrows */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }} id="testimonials-nav">
        <button 
          onClick={handlePrev}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1px solid var(--border-glass)',
            background: 'var(--bg-glass)',
            color: 'var(--color-primary)',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Previous review"
          id="prev-testimonial-btn"
        >
          ◀
        </button>
        <button 
          onClick={handleNext}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1px solid var(--border-glass)',
            background: 'var(--bg-glass)',
            color: 'var(--color-primary)',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Next review"
          id="next-testimonial-btn"
        >
          ▶
        </button>
      </div>

      {/* Simple indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '1rem' }} id="testimonials-indicators">
        {displayTestimonials.map((_, idx) => (
          <span 
            key={idx}
            onClick={() => setActiveIndex(idx)}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: idx === activeIndex ? 'var(--color-primary)' : 'var(--border-glass)',
              cursor: 'pointer',
              transition: 'background var(--transition-fast)'
            }}
            id={`testimonial-indicator-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
