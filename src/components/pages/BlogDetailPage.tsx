import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/utils/i18n';
import { blogPosts } from '@/data/blogPosts';
import { getTranslated } from '@/utils/translate';
import TableOfContents from '@/components/blog/TableOfContents';
import { getLocalizedPath } from '@/utils/routes';

export default function BlogDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const title = getTranslated(post, 'title', locale);
  const category = getTranslated(post, 'category', locale);
  const excerpt = getTranslated(post, 'excerpt', locale);
  const content = getTranslated(post, 'content', locale);

  const dateObj = new Date(post.date);
  const formattedDate = dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": excerpt,
    "image": `https://travellingthroughmorocco.com/images/${post.image}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": "Travelling Through Morocco",
      "url": "https://travellingthroughmorocco.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Travelling Through Morocco",
      "logo": {
        "@type": "ImageObject",
        "url": "https://travellingthroughmorocco.com/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://travellingthroughmorocco.com${getLocalizedPath('blog', locale, slug)}`
    }
  };

  return (
    <div id="blog-post-page">
      {/* Blog Posting JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Banner */}
      <section className="page-hero" style={{ background: `linear-gradient(rgba(10, 15, 26, 0.75), rgba(10, 15, 26, 0.9)), url("/images/${post.image}") no-repeat center center/cover`, paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
        <div className="page-hero-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          <span className="badge badge-new" style={{ marginBottom: '1rem' }}>{category}</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: '1.2', color: 'var(--text-primary)' }}>{title}</h1>
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
            <Link href={getLocalizedPath('home', locale)} style={{ color: 'inherit' }}>Home</Link>
            <span className="separator">/</span>
            <Link href={getLocalizedPath('blog', locale)} style={{ color: 'inherit' }}>Blog</Link>
            <span className="separator">/</span>
            <span style={{ color: 'var(--color-primary)' }}>{post.slug.substring(0, 20)}...</span>
          </div>
        </div>
      </section>

      {/* Main Post details */}
      <section className="section" id="blog-details-section">
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-glass)' }}>
            <span>📅 {formattedDate}</span>
            <span>⏱️ {post.readTime} min read</span>
          </div>

          {/* Table of Contents Widget */}
          <TableOfContents />

          {/* Article HTML Content */}
          <div 
            className="pro-article-content"
            style={{ color: 'var(--text-primary)', lineHeight: '1.8' }}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--bg-dark-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-glass)' }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Ready for your own Morocco Adventure?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Let Travelling Through Morocco design the perfect itinerary for your Sahara desert tour or private custom trip. Contact us today on WhatsApp or send a message for a free custom quote.
            </p>
            <a 
              href={`https://wa.me/212708228026?text=Hello%20Travelling%20Through%20Morocco%2C%20I%20read%20your%20article%20"${title}"%20and%20would%20like%20to%20plan%20a%20trip.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              💬 Inquire via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
