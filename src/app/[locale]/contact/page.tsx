'use client';

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { Locale, getTranslations } from '@/utils/i18n';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'en';
  const t = getTranslations(locale);

  return (
    <div id="contact-page">
      {/* Banner */}
      <section className="page-hero" style={{ background: 'linear-gradient(rgba(10, 15, 26, 0.75), rgba(10, 15, 26, 0.9)), url("/images/merzoga.webp") no-repeat center center/cover', paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
        <div className="page-hero-content">
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{t('nav.contact', 'Contact')}</h1>
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <a href={`/${locale}`} style={{ color: 'inherit' }}>{t('nav.home', 'Home')}</a>
            <span className="separator">/</span>
            <span style={{ color: 'var(--color-primary)' }}>{t('nav.contact', 'Contact')}</span>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="section" id="contact-details-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle" style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>{t('contact.subtitle', 'Contact Us')}</span>
            <h2>{t('contact.title', 'Get in Touch')}</h2>
            <p>{t('contact.desc', 'Ready to book your Morocco adventure? Send us a message and we\'ll get back to you within 24 hours.')}</p>
          </div>

          <div className="grid-2" style={{ gap: '3rem', alignItems: 'start' }} id="contact-grid-container">
            {/* Left Column: Form */}
            <Suspense fallback={<div className="glass-card" style={{ padding: '2.5rem' }}>Loading...</div>}>
              <ContactForm locale={locale} />
            </Suspense>

            {/* Right Column: Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} id="contact-cards-container">
              {/* Address Card */}
              <div className="glass-card contact-info-card" id="contact-card-address" style={{ padding: '2rem' }}>
                <div className="icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>📍</div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('contact.addressLabel', 'Our Office')}</h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Rissani, Merzouga 52022, Morocco</p>
              </div>

              {/* Phone Card */}
              <a 
                href="https://wa.me/212638443209?text=Hello%20Morocco%20View%20Travel%2C%20I%20would%20like%20to%20inquire%20about%20your%20tours!" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="glass-card contact-info-card" 
                id="contact-card-phone" 
                style={{ textDecoration: 'none', display: 'block', color: 'inherit', padding: '2rem' }}
              >
                <div className="icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>📞</div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('contact.phoneLabel', 'Call Us')}</h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>+212 638-443209</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>WhatsApp Available</p>
              </a>

              {/* Email Card */}
              <a 
                href="mailto:moroccoviewtravel@gmail.com?subject=Inquiry%20-%20Morocco%20View%20Travel" 
                className="glass-card contact-info-card" 
                id="contact-card-email" 
                style={{ textDecoration: 'none', display: 'block', color: 'inherit', padding: '2rem' }}
              >
                <div className="icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>✉️</div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('contact.emailLabel', 'Email Us')}</h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>moroccoviewtravel@gmail.com</p>
              </a>

              {/* Hours Card */}
              <div className="glass-card contact-info-card" id="contact-card-hours" style={{ padding: '2rem' }}>
                <div className="icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>🕒</div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('contact.hoursLabel', 'Working Hours')}</h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{t('contact.hours', 'Mon - Sat: 8am - 8pm')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="section" style={{ background: 'var(--bg-dark-2)', borderTop: '1px solid var(--border-glass)' }} id="contact-map-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle" style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>{t('contact.mapTitle', 'Find Us')}</span>
            <h2>{t('contact.hqTitle', 'Our Headquarters in Merzouga')}</h2>
            <p>{t('contact.hqDesc', 'Visit us or reach out to coordinate your custom Morocco adventures starting from Marrakech, Casablanca, Fes, or Tangier.')}</p>
          </div>

          <div className="google-map" id="google-map-iframe-container" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
            <iframe 
              title="Google Maps Headquarters Merzouga"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13700.00!2d-4.2728!3d31.2912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDE3JzI4LjMiTiA0wrAxNicyMi4xIlc!5e0!3m2!1sen!2sma!4v1600000000000!5m2!1sen!2sma" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
