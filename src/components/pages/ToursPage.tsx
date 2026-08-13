import React from 'react';
import { Locale, getTranslations } from '@/utils/i18n';
import TourList from '@/components/tours/TourList';
import InteractiveMap from '@/components/tours/InteractiveMap';
import { tours } from '@/data/tours';
import { getTranslated } from '@/utils/translate';
import { getLocalizedPath } from '@/utils/routes';

export const toursMetadata = {
  titles: {
    en: "Best Morocco Desert Tours & Excursions | Travelling Through Morocco",
    fr: "Meilleurs Circuits au Désert du Maroc & Excursions | Travelling Through Morocco",
    es: "Mejores Tours del Desierto de Marruecos y Excursiones | Travelling Through Morocco",
    it: "I Migliori Tour del Deserto del Marocco ed Escursioni | Travelling Through Morocco",
    ja: "モロッコ砂漠ツアー＆エクスカーション一覧 | Travelling Through Morocco",
    zh: "摩洛哥最佳沙漠旅游与远足线路 | Travelling Through Morocco"
  },
  descriptions: {
    en: "Browse our private Saharan desert tours, day trips, and custom itineraries departing from Marrakech, Fes, Casablanca, or Tangier. Guided by local experts.",
    fr: "Découvrez nos circuits privés dans le désert du Sahara, excursions d'une journée et itinéraires personnalisés au départ de Marrakech, Fès, Casablanca ou Tanger.",
    es: "Explora nuestros tours privados al desierto del Sahara, viajes de un día e itinerarios a medida que salen de Marrakech, Fez, Casablanca o Tánger.",
    it: "Sfoglia i nostri tour privati del deserto del Sahara, gite di un giorno e itinerari personalizzati in partenza da Marrakech, Fes, Casablanca o Tangeri.",
    ja: "マラケシュ、フェズ、カサブランカ、タンジール出发のプライベートサハラ砂漠ツアー、日帰りエクスカーション、カスタムプランをご覧ください。現地の専門家がご案内します。",
    zh: "浏览我们从马拉喀什、非斯、卡萨布兰卡或丹吉尔出发的私人撒哈拉沙漠游、一日游及定制行程。由本地专家导游。"
  }
};

export default function ToursPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  // Generate ItemList JSON-LD structured data for tours
  const tourListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": t('tours.title', 'Best Morocco Desert Tours & Excursions'),
    "description": t('tours.desc', 'Select from our pre-planned curated itineraries or contact us for a customized itinerary designed just for you.'),
    "url": `https://travellingthroughmorocco.com${getLocalizedPath('tours', locale)}`,
    "itemListElement": tours.map((tour, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": getTranslated(tour, 'title', locale),
        "description": getTranslated(tour, 'description', locale),
        "image": `https://travellingthroughmorocco.com/images/${tour.image}`,
        "url": `https://travellingthroughmorocco.com${getLocalizedPath('tours', locale, tour.slug)}`,
        "offers": {
          "@type": "Offer",
          "price": tour.pricePerPerson || 0,
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  return (
    <div id="tours-page">
      {/* Tour List JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourListSchema) }}
      />

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

      {/* Interactive Map Section */}
      <section className="section" id="custom-itinerary-section" style={{ background: 'var(--bg-dark-3)', borderBottom: '1px solid var(--border-glass)', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle" style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>
              {t('sections.mapSubtitle', 'Interactive Map')}
            </span>
            <h2>{t('sections.mapTitle', 'Build Your Trip')}</h2>
            <p>{t('sections.mapDesc', 'Click on cities to create your custom itinerary across Morocco')}</p>
          </div>
          
          <InteractiveMap locale={locale} />
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

          {/* Render interactive client component */}
          <TourList />
        </div>
      </section>
    </div>
  );
}
