import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale, getTranslations } from '@/utils/i18n';
import { destinations } from '@/data/destinations';
import { getTranslated } from '@/utils/translate';
import { getLocalizedPath } from '@/utils/routes';

export const destinationsMetadata = {
  titles: {
    en: "Morocco Destinations | Top Places to Visit in Morocco",
    fr: "Destinations au Maroc | Meilleurs Endroits à Visiter",
    es: "Destinos en Marruecos | Mejores Lugares para Visitar",
    it: "Destinazioni in Marocco | I Migliori Posti da Visitare",
    ja: "モロッコの目的地 | おすすめの観光地・都市紹介",
    zh: "摩洛哥旅游目的地 | 摩洛哥最热门的游览胜地"
  },
  descriptions: {
    en: "Explore the best destinations in Morocco. From the golden dunes of the Sahara Desert to Fes, Marrakech, Chefchaouen, and Essaouira.",
    fr: "Explorez les meilleures destinations du Maroc. Des dunes dorées du Sahara à Fès, Marrakech, Chefchaouen et Essaouira.",
    es: "Explora los mejores destinos en Marruecos. Desde las dunas del desierto del Sahara hasta Fez, Marrakech, Chefchaouen y Essaouira.",
    it: "Esplora le migliori destinazioni in Marocco. Dalle dune dorate del deserto del Sahara a Fes, Marrakech, Chefchaouen ed Essaouira.",
    ja: "モロッコの人気観光地をご紹介。サハラ砂漠の黄金の砂丘から、フェズ、マラケシュ、シャウエン、エッサウィラまで魅力的な都市をご案内します。",
    zh: "探索摩洛哥的最佳旅游目的地。从撒哈拉沙漠的金色沙丘到非斯、马拉喀什、舍夫沙万和索维拉。"
  }
};

export default function DestinationsPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <div id="destinations-page">
      {/* Banner */}
      <section className="page-hero" style={{ background: 'linear-gradient(rgba(10, 15, 26, 0.75), rgba(10, 15, 26, 0.9)), url("/images/merzoga.webp") no-repeat center center/cover', paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
        <div className="page-hero-content">
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{t('nav.destinations', 'Destinations')}</h1>
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <a href={`/${locale}`} style={{ color: 'inherit' }}>{t('nav.home', 'Home')}</a>
            <span className="separator">/</span>
            <span style={{ color: 'var(--color-primary)' }}>{t('nav.destinations', 'Destinations')}</span>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="section" id="destinations-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle" style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>{t('destinations.subtitle', 'Amazing Places')}</span>
            <h2>{t('destinations.title', 'Explore Morocco\'s Best Destinations')}</h2>
            <p>{t('destinations.desc', 'From imperial cities to coastal towns, discover the diverse beauty of Morocco')}</p>
          </div>

          <div className="grid-3" id="destinations-grid">
            {destinations.map((dest) => {
              const name = getTranslated(dest, 'name', locale);
              const tagline = getTranslated(dest, 'tagline', locale);
              
              return (
                <Link 
                  href={getLocalizedPath('tours', locale)}
                  key={dest.id}
                  className="dest-card"
                  style={{ display: 'block', position: 'relative', overflow: 'hidden', height: '300px', cursor: 'pointer' }}
                  id={`dest-card-${dest.id}`}
                >
                  <div className="dest-card-image" style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <Image 
                      src={`/images/${dest.image}`} 
                      alt={name} 
                      fill
                      loading="lazy"
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="dest-card-overlay">
                    <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.4rem' }}>{name}</h3>
                    <p className="dest-tagline" style={{ margin: '0.25rem 0 0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{tagline}</p>
                    <div className="dest-tours" style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                      📁 {dest.tourCount} {t('destinations.tours', 'tours available')}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
