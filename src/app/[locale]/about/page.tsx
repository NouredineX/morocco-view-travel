'use client';

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Locale, getTranslations } from '@/utils/i18n';

export default function AboutPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'en';
  const t = getTranslations(locale);

  const valueKeys = ['agency', 'safety', 'pricing', 'custom', 'booking', 'guides'];

  return (
    <div id="about-page">
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
            <h2>Local Expert Morocco Travel Agency</h2>
          </div>
          <div style={{ fontSize: '1.05rem', lineHeight: '1.9', color: 'var(--text-secondary)' }} id="agency-story-content">
            <p style={{ marginBottom: '1.5rem' }}>{t('about.story1', 'Morocco View Travel is a premium travel company based in Rissani, Merzouga, specializing in authentic Moroccan experiences. With years of expertise, we craft unforgettable journeys that blend adventure, culture, and comfort.')}</p>
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
            {valueKeys.map((key) => (
              <div className="glass-card" style={{ padding: '2rem', height: '100%' }} key={key} id={`value-card-${key}`}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                  {key === 'agency' ? '🏆' : key === 'safety' ? '🛡️' : key === 'pricing' ? '💎' : key === 'custom' ? '⚙️' : key === 'booking' ? '⚡' : '🗺️'}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>{t(`about.values.${key}.title`)}</h3>
                <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>{t(`about.values.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section" id="about-team-section" style={{ borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-subtitle" style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>{t('about.teamSubtitle', 'Local Experts')}</span>
            <h2>Our Team</h2>
            <p>The passionate travelers and guides behind Morocco View Travel.</p>
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
                <p style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: '600', marginBottom: '1rem' }}>Founder & Managing Director</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
                  Mohamed grew up in Merzouga and has spent over 15 years guiding international travelers through the Sahara desert.
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
                <p style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: '600', marginBottom: '1rem' }}>Professional Driver & Desert Guide</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
                  An expert navigator of the Atlas Mountains and Sahara desert tracks, ensuring your safety and comfort at every turn.
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
                <p style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: '600', marginBottom: '1rem' }}>Customer Relations & Designer</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
                  Noureddine handles customer inquiries and itineraries, crafting tailored experiences for groups and families.
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
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Morocco View Travel TripAdvisor Rating</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem', color: '#00AF87' }}>⬤⬤⬤⬤⬤</span>
              <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>5.0</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Based on verified traveler reviews from around the globe. Proud to deliver exceptional service and unforgettable desert adventures.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
