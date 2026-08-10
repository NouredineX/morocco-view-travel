import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Locale, locales } from '@/utils/i18n';
import { blogPosts } from '@/data/blogPosts';
import { getTranslated } from '@/utils/translate';
import TableOfContents from '@/components/blog/TableOfContents';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const post of blogPosts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const title = getTranslated(post, 'title', locale);
  const excerpt = getTranslated(post, 'excerpt', locale);
  const seoTitle = `${title} — Morocco View Travel`;

  return {
    title: seoTitle,
    description: excerpt,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        es: `/es/blog/${slug}`,
        fr: `/fr/blog/${slug}`,
        it: `/it/blog/${slug}`,
        ja: `/ja/blog/${slug}`,
        zh: `/zh/blog/${slug}`,
      },
    },
    openGraph: {
      title: seoTitle,
      description: excerpt,
      url: `https://moroccoviewtravel.com/${locale}/blog/${slug}`,
      images: [
        {
          url: `/images/${post.image}`,
          alt: title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  
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

  return (
    <div id="blog-post-page">
      {/* Hero Banner */}
      <section className="page-hero" style={{ background: `linear-gradient(rgba(10, 15, 26, 0.75), rgba(10, 15, 26, 0.9)), url("/images/${post.image}") no-repeat center center/cover`, paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
        <div className="page-hero-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          <span className="badge badge-new" style={{ marginBottom: '1rem' }}>{category}</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: '1.2', color: 'var(--text-primary)' }}>{title}</h1>
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
            <Link href={`/${locale}`} style={{ color: 'inherit' }}>Home</Link>
            <span className="separator">/</span>
            <Link href={`/${locale}/blog`} style={{ color: 'inherit' }}>Blog</Link>
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
              Let Morocco View Travel design the perfect itinerary for your Sahara desert tour or private custom trip. Contact us today on WhatsApp or send a message for a free custom quote.
            </p>
            <a 
              href={`https://wa.me/212638443209?text=Hello%20Morocco%20View%20Travel%2C%20I%20read%20your%20article%20"${title}"%20and%20would%20like%20to%20plan%20a%20trip.`}
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
