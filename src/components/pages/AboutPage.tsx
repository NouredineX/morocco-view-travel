import React from 'react';
import Image from 'next/image';
import { Locale, getTranslations } from '@/utils/i18n';

export const aboutMetadata = {
  titles: {
    en: "About Travelling Through Morocco | Travel Agency & Desert Experts",
    fr: "À Propos de Travelling Through Morocco | Agence de Voyage & Experts du Désert",
    es: "Sobre Travelling Through Morocco | Agencia de Viajes y Expertos del Desierto",
    it: "Informazioni su Travelling Through Morocco | Agenzia di Viaggi ed Esperti del Deserto",
    ja: "Travelling Through Moroccoについて | 旅行代理店＆砂漠のエキスパート",
    zh: "关于 Travelling Through Morocco | 旅行社与沙漠专家"
  },
  descriptions: {
    en: "Learn more about Travelling Through Morocco, a premium private travel agency based in Meknes. Meet our local guides and team offering authentic desert tours.",
    fr: "En savoir plus sur Travelling Through Morocco, agence de voyage privée premium basée à Meknès. Rencontrez nos guides locaux et notre équipe pour des circuits authentiques.",
    es: "Conoce más sobre Travelling Through Morocco, una agencia de viajes privada premium con sede en Meknes. Conoce a nuestros guías locales y equipo.",
    it: "Scopri di più su Travelling Through Morocco, un'agenzia di viaggi privata premium con sede a Meknes. Incontra le nostre guide locali e il nostro team.",
    ja: "メクネスに拠点を置くプレミアムプライベート旅行代理店、Travelling Through Moroccoについて詳しくご覧ください。現地の専門ガイドとチームをご紹介します。",
    zh: "详细了解 Travelling Through Morocco，这是一家位于梅克内斯的优质私人旅行社。结识我们提供正宗沙漠游的当地导游与团队。"
  }
};

export default function AboutPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const valueKeys = ['agency', 'safety', 'pricing', 'custom', 'booking', 'guides'];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Travelling Through Morocco",
    "image": "https://travellingthroughmorocco.com/images/logo.png",
    "@id": "https://travellingthroughmorocco.com/#localbusiness",
    "url": "https://travellingthroughmorocco.com",
    "telephone": "+212708228026",
    "email": "travellingthroughmorocco@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Meknes Office",
      "addressLocality": "Meknes",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.8938",
      "longitude": "-5.5547"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  return (
    <div id="about-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Banner */}
      <section className="page-hero" style={{ background: 'linear-gradient(rgba(10, 15, 26, 0.75), rgba(10, 15, 26, 0.9)), url("/images/merzoga.webp") no-repeat center center/cover', paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
        <div className="page-hero-content">
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{t('nav.about', 'About Us')}</h1>
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <a href={`/${locale}`} style={{ color: 'inherit' }}>{t('nav.home', 'Home')}</a>
            <span className="separator">/</span>
            <span style={{ color: 'var(--color-primary)' }}>{t('nav.about', 'About Us')}</span>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section" id="about-story-section">
        <div className="container container-narrow" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle" style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>{t('about.storyTitle', 'Our Story')}</span>
            <h2>{t('about.storySubtitle', 'Local Expert Morocco Travel Agency')}</h2>
          </div>
          <div style={{ fontSize: '1.05rem', lineHeight: '1.9', color: 'var(--text-secondary)' }} id="agency-story-content">
            <p style={{ marginBottom: '1.5rem' }}>{t('about.story1', 'Travelling Through Morocco is a premium travel company based in Meknes, Morocco, specializing in authentic Moroccan experiences. With years of expertise, we craft unforgettable journeys that blend adventure, culture, and comfort.')}</p>
            <p style={{ marginBottom: '1.5rem' }}>{t('about.story2', 'As a fully integrated tourism and transport company, we handle every detail of your trip — from comfortable 4x4 vehicles to handpicked accommodations and expert local guides who bring Morocco\'s rich heritage to life.')}</p>
            <p>{t('about.story3', 'Our mission is simple: to show you the real Morocco. Not just the tourist spots, but the hidden gems, the local stories, and the warm hospitality that makes this country truly special.')}</p>
          </div>
        </div>
      </section>

      {/* Values Grid Section */}
      <section className="section" id="about-values-section" style={{ background: 'var(--bg-dark-2)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle" style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>{t('about.subtitle', 'Your Trusted Partner')}</span>
            <h2>{t('about.valuesTitle', 'Why Choose Us')}</h2>
          </div>

          <div className="grid-3" id="values-grid">
            {valueKeys.map((key) => {
              const getIcon = (k: string) => {
                const iconStyle = { color: 'var(--color-primary)', display: 'block' };
                switch (k) {
                  case 'agency':
                    return (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
                        <circle cx="12" cy="8" r="6"/>
                        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                      </svg>
                    );
                  case 'safety':
                    return (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    );
                  case 'pricing':
                    return (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
                        <path d="M6 3h12l4 6-10 13L2 9z"/>
                        <path d="M11 3 8 9l4 13 4-13-3-6"/>
                        <path d="M2 9h20"/>
                      </svg>
                    );
                  case 'custom':
                    return (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
                        <line x1="4" y1="21" x2="4" y2="14"/>
                        <line x1="4" y1="10" x2="4" y2="3"/>
                        <line x1="12" y1="21" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12" y2="3"/>
                        <line x1="20" y1="21" x2="20" y2="16"/>
                        <line x1="20" y1="12" x2="20" y2="3"/>
                        <line x1="1" y1="14" x2="7" y2="14"/>
                        <line x1="9" y1="8" x2="15" y2="8"/>
                        <line x1="17" y1="16" x2="23" y2="16"/>
                      </svg>
                    );
                  case 'booking':
                    return (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                      </svg>
                    );
                  case 'guides':
                    return (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
                        <circle cx="12" cy="12" r="10"/>
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                      </svg>
                    );
                  default:
                    return null;
                }
              };

              return (
                <div className="glass-card" style={{ padding: '2.25rem 2rem', height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease, border-color 0.3s ease' }} key={key} id={`value-card-${key}`}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    background: 'rgba(197, 168, 110, 0.08)', 
                    border: '1px solid rgba(197, 168, 110, 0.22)', 
                    marginBottom: '1.25rem' 
                  }}>
                    {getIcon(key)}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>{t(`about.values.${key}.title`)}</h3>
                  <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>{t(`about.values.${key}.desc`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section" id="about-team-section" style={{ borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-subtitle" style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>{t('about.teamSubtitle', 'Local Experts')}</span>
            <h2>{t('about.teamTitle', 'Our Team')}</h2>
            <p>{t('about.teamDesc', 'The passionate travelers and guides behind Travelling Through Morocco.')}</p>
          </div>

          <div className="grid-3" id="team-grid">
            {/* Owner */}
            <div className="glass-card team-card" id="team-member-owner" style={{ padding: '0', overflow: 'hidden', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ position: 'relative', height: '350px', width: '100%' }}>
                <Image 
                  src="/images/team/owner mohamed boumeshoul.jpeg" 
                  alt="Mohamed Boumeshoul" 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Mohamed Boumeshoul</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: '600', marginBottom: '1rem' }}>{t('about.roles.owner', 'Founder & Managing Director')}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
                  {t('about.bios.owner', 'Mohamed grew up in Merzouga and has spent over 15 years guiding international travelers through the Sahara desert.')}
                </p>
              </div>
            </div>

            {/* Driver */}
            <div className="glass-card team-card" id="team-member-driver" style={{ padding: '0', overflow: 'hidden', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ position: 'relative', height: '350px', width: '100%' }}>
                <Image 
                  src="/images/team/Mohamed ohso driver.jpeg" 
                  alt="Mohamed Ohso" 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Mohamed Ohso</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: '600', marginBottom: '1rem' }}>{t('about.roles.driver', 'Professional Driver & Desert Guide')}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
                  {t('about.bios.driver', 'An expert navigator of the Atlas Mountains and Sahara desert tracks, ensuring your safety and comfort at every turn.')}
                </p>
              </div>
            </div>

            {/* Designer */}
            <div className="glass-card team-card" id="team-member-designer" style={{ padding: '0', overflow: 'hidden', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ position: 'relative', height: '350px', width: '100%' }}>
                <Image 
                  src="/images/team/Noureddine designer.jpeg" 
                  alt="Noureddine" 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Noureddine</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: '600', marginBottom: '1rem' }}>{t('about.roles.designer', 'Customer Relations & Designer')}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
                  {t('about.bios.designer', 'Noureddine handles customer inquiries and itineraries, crafting tailored experiences for groups and families.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TripAdvisor Badge Section */}
      <section className="section" id="about-tripadvisor-section" style={{ textAlign: 'center', background: 'var(--bg-dark-2)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>{t('about.tripAdvisorTitle', 'Travelling Through Morocco TripAdvisor Rating')}</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem', color: '#00AF87' }}>⬤⬤⬤⬤⬤</span>
              <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>5.0</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {t('about.tripAdvisorDesc', 'Based on verified traveler reviews from around the globe. Proud to deliver exceptional service and unforgettable desert adventures.')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
