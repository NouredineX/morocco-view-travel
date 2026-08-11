import React from 'react';
import { Locale, getTranslations } from '@/utils/i18n';
import { testimonials } from '@/data/testimonials';
import { getTranslated } from '@/utils/translate';

export const testimonialsMetadata = {
  titles: {
    en: "Testimonials & Reviews | Travelling Through Morocco Client Feedback",
    fr: "Témoignages & Avis | Retours Clients Travelling Through Morocco",
    es: "Testimonios y Reseñas | Opiniones de Clientes de Travelling Through Morocco",
    it: "Testimonianze e Recensioni | Feedback dei Clienti di Travelling Through Morocco",
    ja: "お客様の声・評価 | Travelling Through Morocco クチコミ",
    zh: "客户见证与评价 | Travelling Through Morocco 客户反馈"
  },
  descriptions: {
    en: "Read reviews and testimonials from travelers who experienced Morocco desert tours and private trips with Travelling Through Morocco. 5-star rated travel provider.",
    fr: "Lisez les avis et témoignages des voyageurs qui ont vécu des circuits dans le désert et des voyages privés avec Travelling Through Morocco. Note globale 5 étoiles.",
    es: "Lee las reseñas y testimonios de viajeros que vivieron tours al desierto y viajes privados con Travelling Through Morocco.",
    it: "Leggi le recensioni e le testimonianze dei viaggiatori che hanno vissuto i tour del deserto e i viaggi privati con Travelling Through Morocco.",
    ja: "Travelling Through Moroccoでモロッコの砂漠ツアーやプライベート旅行を体験されたお客様のクチコミと評価をご覧ください。5つ星評価。",
    zh: "阅读通过 Travelling Through Morocco 体验过摩洛哥沙漠游和私人订制旅行的游客评价与见证。五星级旅行服务商。"
  }
};

export default function TestimonialsPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <div id="testimonials-page">
      {/* Banner */}
      <section className="page-hero" style={{ background: 'linear-gradient(rgba(10, 15, 26, 0.75), rgba(10, 15, 26, 0.9)), url("/images/merzoga.webp") no-repeat center center/cover', paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
        <div className="page-hero-content">
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{t('sections.testimonialsTitle', 'Reviews')}</h1>
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <a href={`/${locale}`} style={{ color: 'inherit' }}>{t('nav.home', 'Home')}</a>
            <span className="separator">/</span>
            <span style={{ color: 'var(--color-primary)' }}>{t('sections.testimonialsSubtitle', 'Testimonials')}</span>
          </div>
        </div>
      </section>

      {/* Main Reviews Section */}
      <section className="section" id="reviews-list-section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-subtitle" style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>{t('sections.testimonialsSubtitle', 'Happy Travelers')}</span>
            <h2>{t('sections.testimonialsTitle', 'What Our Travelers Say')}</h2>
          </div>

          {/* TripAdvisor Card */}
          <div className="glass-card" style={{ padding: '3.5rem', textAlign: 'center', marginBottom: '3.5rem', border: '1px solid var(--border-glass)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>{t('testimonials.awardsTitle', 'TripAdvisor Rating & Awards')}</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem', color: '#00AF87' }}>⬤⬤⬤⬤⬤</span>
              <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>5.0 / 5.0</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {t('testimonials.awardsDesc', 'We are recognized as a premium travel provider on TripAdvisor, with an overall 5.0 rating based on hundreds of verified reviews from international travelers.')}
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <a 
                href="https://www.tripadvisor.com/Attraction_Review-g293734-d23498363-Reviews-Morocco_View_Travel-Marrakech_Marrakech_Safi.html" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary btn-sm"
              >
                {t('testimonials.viewOnTripAdvisor', 'View on TripAdvisor')}
              </a>
            </div>
          </div>

          {/* Review List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} id="all-reviews-list">
            {testimonials.map((testimonial) => {
              const text = getTranslated(testimonial, 'text', locale);
              return (
                <div key={testimonial.id} className="glass-card" style={{ padding: '2.5rem', border: '1px solid var(--border-glass)' }} id={`review-${testimonial.id}`}>
                  <div className="stars" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.2rem' }}>
                    {'★'.repeat(testimonial.rating)}
                    {'☆'.repeat(5 - testimonial.rating)}
                  </div>
                  <blockquote style={{ fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                    "{text}"
                  </blockquote>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{testimonial.name}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>📍 {testimonial.country}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
