'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Locale, getTranslations } from '@/utils/i18n';
import Hero from '@/components/home/Hero';
import StatsCounter from '@/components/home/StatsCounter';
import Testimonials from '@/components/home/Testimonials';
import TourCard from '@/components/tours/TourCard';
import { tours } from '@/data/tours';
import { getTranslated } from '@/utils/translate';

export default function HomePage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'en';
  const t = getTranslations(locale);

  // Filter 3 popular tours to showcase on the homepage
  const popularTours = tours.filter(tour => tour.badge === 'popular').slice(0, 3);

  // Categories metadata
  const categories = [
    {
      id: 'desert',
      title: 'Sahara Desert Tours',
      titleFr: 'Tours du Désert du Sahara',
      titleEs: 'Tours del Desierto del Sahara',
      titleIt: 'Tour del Deserto del Sahara',
      titleJa: 'サハラ砂漠ツアー',
      titleZh: '撒哈拉沙漠之旅',
      desc: 'Ride camels and sleep under the stars in private desert camps.',
      descFr: 'Montez à dos de chameau et dormez sous les étoiles dans des camps privés.',
      descEs: 'Monta en camello y duerme bajo las estrellas en campamentos privados.',
      descIt: 'Cavalca i cammelli e dormi sotto le stelle in accampamenti privati nel deserto.',
      descJa: 'プライベート砂漠キャンプでラクダに乗り、星空の下で眠りましょう。',
      descZh: '体验骑骆驼出游，在私人豪华沙漠营地的星空下夜宿。',
      image: '/images/merzoga.webp'
    },
    {
      id: 'imperial',
      title: 'Imperial Cities',
      titleFr: 'Villes Impériales',
      titleEs: 'Ciudades Imperiales',
      titleIt: 'Città Imperiali',
      titleJa: '帝国の都市探索',
      titleZh: '帝国城市探索',
      desc: 'Explore the rich history, ancient palaces, and souks of Fes, Marrakech, and Meknes.',
      descFr: 'Explorez la riche histoire, les palais anciens et les souks de Fès, Marrakech et Meknès.',
      descEs: 'Explora la rica historia, los palacios antiguos y los zocos de Fez, Marrakech y Meknes.',
      descIt: 'Esplora la ricca storia, i palazzi antichi e i souk di Fes, Marrakech e Meknes.',
      descJa: 'フェズ、マラケシュ、メクネスの豊かな歴史、古代の宮殿、スークを探索しましょう。',
      descZh: '探索非斯、马拉喀什及梅克内斯深厚的历史底蕴、古老皇宫和热闹集市。',
      image: '/images/new update/FES.jpg'
    },
    {
      id: 'day-trip',
      title: 'Day Excursions',
      titleFr: 'Excursions d\'une Journée',
      titleEs: 'Excursiones de un Día',
      titleIt: 'Escursioni Giornaliere',
      titleJa: '日帰り短途旅行',
      titleZh: '单日短途旅行',
      desc: 'Discover beautiful coastal towns, waterfalls, and valleys in single day trips.',
      descFr: 'Découvrez de belles villes côtières, des cascades et des vallées en une journée.',
      descEs: 'Descubre hermosas ciudades costeras, cascadas y valles en viajes de un día.',
      descIt: 'Scopri bellissime città costiere, cascate e valli in gite di un giorno.',
      descJa: '日帰り旅行で美しい沿岸の町、滝、渓谷を発見しましょう。',
      descZh: '在一日游行程中发现美丽的海滨小镇、壮丽瀑布与山谷幽境。',
      image: '/images/new update/essaouira.jpg'
    },
    {
      id: 'private',
      title: 'Private Custom Trips',
      titleFr: 'Voyages Privés Sur Mesure',
      titleEs: 'Viajes Privados a Medida',
      titleIt: 'Viaggi Privati Personalizzati',
      titleJa: 'プライベートカスタム旅行',
      titleZh: '私人定制旅行',
      desc: 'Completely customized itineraries with private drivers and luxury guides.',
      descFr: 'Itinéraires entièrement sur mesure avec chauffeurs privés et guides de luxe.',
      descEs: 'Itinerarios completamente a medida con conductores privados y guías de lujo.',
      descIt: 'Itinerari completamente personalizzati con autisti privati e guide di lusso.',
      descJa: '専属ドライバーと高級ガイド付きの完全にカスタマイズされた旅程。',
      descZh: '提供专属司机和豪华导游的完全个性化定制路线。',
      image: '/images/new update/ouarzazate.jpg'
    }
  ];

  return (
    <div id="home-page">
      {/* Parallax Hero */}
      <Hero />

      {/* Stats Counter Section */}
      <section className="section" style={{ padding: '3rem 0' }} id="stats-section">
        <div className="container">
          <StatsCounter />
        </div>
      </section>

      {/* Tour Categories Section */}
      <section className="section" id="categories-section" style={{ background: 'var(--bg-dark-2)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('sections.categoriesSubtitle')}</span>
            <h2>{t('sections.categoriesTitle')}</h2>
            <p>{t('sections.categoriesDesc')}</p>
          </div>

          <div className="grid-4" id="categories-grid">
            {categories.map((cat) => {
              const catTitle = getTranslated(cat, 'title', locale);
              const catDesc = getTranslated(cat, 'desc', locale);

              return (
                <div key={cat.id} className="glass-card" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }} id={`cat-card-${cat.id}`}>
                  <div style={{ height: '180px', position: 'relative' }}>
                    <Image 
                      src={cat.image} 
                      alt={catTitle} 
                      fill
                      loading="lazy"
                      style={{ objectFit: 'cover' }} 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{catTitle}</h3>
                    <p style={{ fontSize: '0.85rem', marginBottom: '1.5rem', flex: 1, lineHeight: '1.6' }}>{catDesc}</p>
                    <Link href={`/${locale}/tours`} className="btn btn-secondary btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                      {t('tour.allTours', 'All Tours')}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Tours Section */}
      <section className="section" id="popular-tours-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('sections.popularSubtitle')}</span>
            <h2>{t('sections.popularTitle')}</h2>
            <p>{t('sections.popularDesc')}</p>
          </div>

          <div className="grid-3" id="popular-tours-grid">
            {popularTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link href={`/${locale}/tours`} className="btn btn-primary btn-lg" id="view-all-tours-btn">
              {t('sections.viewAllTours', 'View All Tours')}
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section" id="testimonials-section" style={{ background: 'var(--bg-dark-2)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('sections.testimonialsSubtitle', 'Happy Travelers')}</span>
            <h2>{t('sections.testimonialsTitle', 'What Our Travelers Say')}</h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section" id="cta-section" style={{ background: 'linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-dark-2) 100%)' }}>
        <div className="container">
          <div className="cta-content" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>{t('sections.ctaTitle')}</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>{t('sections.ctaDesc')}</p>
            <Link href={`/${locale}/contact`} className="btn btn-primary btn-lg" id="cta-contact-btn">
              🗺️ {t('sections.ctaButton', 'Plan Your Trip')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
