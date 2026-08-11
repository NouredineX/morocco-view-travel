import React from 'react';
import { Locale, getTranslations } from '@/utils/i18n';
import BlogList from '@/components/blog/BlogList';

export const blogMetadata = {
  titles: {
    en: "Travelling Through Morocco Blog | Morocco Travel Tips & Guides",
    fr: "Blog Travelling Through Morocco | Conseils & Guides Voyage Maroc",
    es: "Blog Travelling Through Morocco | Consejos y Guías de Viaje Marruecos",
    it: "Blog Travelling Through Morocco | Consigli e Guide di Viaggio Marocco",
    ja: "モロッコ旅行ブログ＆お役立ちガイド | Travelling Through Morocco",
    zh: "Travelling Through Morocco 旅游博客 | 摩洛哥旅游建议与指南"
  },
  descriptions: {
    en: "Expert Morocco travel tips, Sahara desert camping guides, city itineraries, and cultural insights to help you plan your Travelling Through Morocco adventure.",
    fr: "Conseils de voyage d'experts au Maroc, guides de camping au Sahara et itinéraires pour planifier votre aventure avec Travelling Through Morocco.",
    es: "Consejos de viaje de expertos en Marruecos, guías de campamento en el Sahara e itinerarios para planificar tu viaje con Travelling Through Morocco.",
    it: "Consigli di viaggio degli esperti in Marocco, guide al campeggio nel Sahara e itinerari per pianificare il tuo viaggio con Travelling Through Morocco.",
    ja: "モロッコ旅行のヒント、サハラ砂漠でのキャンプガイド、都市巡りルートなど、Travelling Through Moroccoでの旅をサポートする情報をお届けします。",
    zh: "专业的摩洛哥旅行建议、撒哈拉沙漠露营指南、城市路线及文化洞察，助您轻松规划 Travelling Through Morocco 探索之旅。"
  }
};

export default function BlogPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <div id="blog-page">
      {/* Banner */}
      <section className="page-hero" style={{ background: 'linear-gradient(rgba(10, 15, 26, 0.75), rgba(10, 15, 26, 0.9)), url("/images/merzoga.webp") no-repeat center center/cover', paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
        <div className="page-hero-content">
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{t('nav.blog', 'Blog')}</h1>
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <a href={`/${locale}`} style={{ color: 'inherit' }}>{t('nav.home', 'Home')}</a>
            <span className="separator">/</span>
            <span style={{ color: 'var(--color-primary)' }}>{t('nav.blog', 'Blog')}</span>
          </div>
        </div>
      </section>

      {/* Blog Listing Section */}
      <section className="section" id="blog-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle" style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>{t('blog.subtitle', 'Expert Insights')}</span>
            <h2>{t('blog.title', 'Morocco Travel Blog & Guides')}</h2>
            <p>{t('blog.desc', 'Tips, guides, and stories to help you plan the perfect Morocco trip')}</p>
          </div>

          {/* Render client component */}
          <BlogList />
        </div>
      </section>
    </div>
  );
}
