import React, { Suspense } from 'react';
import { Locale, getTranslations } from '@/utils/i18n';
import ContactForm from '@/components/contact/ContactForm';

export const contactMetadata = {
  titles: {
    en: "Contact Travelling Through Morocco | Plan Your Custom Desert Tour",
    fr: "Contacter Travelling Through Morocco | Planifiez Votre Voyage Sur Mesure",
    es: "Contacto Travelling Through Morocco | Planifica Tu Viaje al Desierto",
    it: "Contatta Travelling Through Morocco | Pianifica il Tuo Tour del Deserto",
    ja: "Travelling Through Moroccoお問い合わせ | カスタム砂漠ツアー計画",
    zh: "联系 Travelling Through Morocco | 规划您的定制沙漠游"
  },
  descriptions: {
    en: "Contact Travelling Through Morocco to design your custom itinerary. Talk to our Meknes office via phone, email, or WhatsApp for a free desert tour quote.",
    fr: "Contactez Travelling Through Morocco pour concevoir votre itinéraire sur mesure. Contactez notre bureau de Meknès par téléphone, e-mail ou WhatsApp.",
    es: "Contacta a Travelling Through Morocco para diseñar tu intranet a medida. Comunícate con nuestra oficina de Meknes por teléfono, correo o WhatsApp.",
    it: "Contatta Travelling Through Morocco per progettare il tuo itinerario personalizzato. Parla con il nostro ufficio di Meknes tramite telefono, e-mail o WhatsApp.",
    ja: "カスタム旅程の作成はTravelling Through Moroccoにお問い合わせください。無料 of 砂漠ツアー見積もりについて、メクネスオフィスまでお電話、メール、またはWhatsAppでご連絡ください。",
    zh: "联系 Travelling Through Morocco 量身定制您的专属行程。欢迎通过电话、电子邮件或 WhatsApp 与我们梅克内斯办公室沟通，获取免费沙漠游报价。"
  }
};

export default function ContactPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

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
    <div id="contact-page">
      {/* Organization JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Meknes, Morocco</p>
              </div>

              {/* Phone Card */}
              <a 
                href="https://wa.me/212708228026?text=Hello%20Travelling%20Through%20Morocco%2C%20I%20would%20like%20to%20inquire%20about%20your%20tours!" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="glass-card contact-info-card" 
                id="contact-card-phone" 
                style={{ textDecoration: 'none', display: 'block', color: 'inherit', padding: '2rem' }}
              >
                <div className="icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>📞</div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('contact.phoneLabel', 'Call Us')}</h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>+212 708-228026</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>WhatsApp Available</p>
              </a>

              {/* Email Card */}
              <a 
                href="mailto:travellingthroughmorocco@gmail.com?subject=Inquiry%20-%20Travelling%20Through%20Morocco" 
                className="glass-card contact-info-card" 
                id="contact-card-email" 
                style={{ textDecoration: 'none', display: 'block', color: 'inherit', padding: '2rem' }}
              >
                <div className="icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>✉️</div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('contact.emailLabel', 'Email Us')}</h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>travellingthroughmorocco@gmail.com</p>
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="section" style={{ background: 'var(--bg-dark-2)', borderTop: '1px solid var(--border-glass)' }} id="contact-map-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle" style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>{t('contact.mapTitle', 'Find Us')}</span>
            <h2>{t('contact.hqTitle', 'Our Headquarters in Meknes')}</h2>
            <p>{t('contact.hqDesc', 'Visit us or reach out to coordinate your custom Morocco adventures starting from Marrakech, Casablanca, Fes, or Tangier.')}</p>
          </div>

          <div className="google-map" id="google-map-iframe-container" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
            <iframe 
              title="Google Maps Headquarters Meknes"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105988.66579899321!2d-5.617300305106191!3d33.88609653158021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9b7f2db8bf346d%3A0x6e2dfdfbdbe6cb09!2sMeknes!5e0!3m2!1sen!2sma!4v1723370000000!5m2!1sen!2sma" 
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
