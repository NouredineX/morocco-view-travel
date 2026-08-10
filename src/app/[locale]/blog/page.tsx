'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Locale, getTranslations } from '@/utils/i18n';
import BlogCard from '@/components/blog/BlogCard';
import { blogPosts } from '@/data/blogPosts';
import { getTranslated } from '@/utils/translate';

export default function BlogPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'en';
  const t = getTranslations(locale);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Categories helper mapping
  const categories = [
    { id: 'all', label: t('blog.allCategories', 'All') },
    { id: 'Travel Tips', label: getTranslated({ 'title': 'Travel Tips', 'titleFr': 'Conseils', 'titleEs': 'Consejos', 'titleIt': 'Consigli', 'titleJa': '旅行のヒント', 'titleZh': '旅行建议' }, 'title', locale) },
    { id: 'Desert Guide', label: getTranslated({ 'title': 'Desert Guide', 'titleFr': 'Guide Désert', 'titleEs': 'Guía Desierto', 'titleIt': 'Guida Deserto', 'titleJa': '砂漠ガイド', 'titleZh': '沙漠指南' }, 'title', locale) },
    { id: 'City Guides', label: getTranslated({ 'title': 'City Guides', 'titleFr': 'Guides Villes', 'titleEs': 'Guías Ciudades', 'titleIt': 'Guide Città', 'titleJa': '都市ガイド', 'titleZh': '都市指南' }, 'title', locale) },
    { id: 'Culture', label: getTranslated({ 'title': 'Culture', 'titleFr': 'Culture', 'titleEs': 'Cultura', 'titleIt': 'Cultura', 'titleJa': '文化', 'titleZh': '文化' }, 'title', locale) }
  ];

  // Filter posts based on category
  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

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

          {/* Filter tabs */}
          <div className="glass-card filter-bar" id="blog-filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', padding: '1.25rem', marginBottom: '3rem', borderRadius: 'var(--radius-md)' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                id={`blog-cat-btn-${cat.id.replace(/\s+/g, '-').toLowerCase()}`}
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-full)',
                  background: activeCategory === cat.id ? 'var(--color-primary)' : 'var(--bg-glass)',
                  color: activeCategory === cat.id ? 'var(--bg-dark)' : 'var(--text-primary)',
                  border: '1px solid var(--border-glass)',
                  transition: 'all var(--transition-fast)',
                  cursor: 'pointer'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid list of posts */}
          <div className="grid-3" id="blog-grid-posts">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
