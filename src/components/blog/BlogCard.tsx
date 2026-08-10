'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/utils/i18n-client';
import type { BlogPost } from '@/types';
import { getTranslated } from '@/utils/translate';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { locale, t } = useTranslation();

  const title = getTranslated(post, 'title', locale);
  const excerpt = getTranslated(post, 'excerpt', locale);
  const category = getTranslated(post, 'category', locale);

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="blog-card glass-card" id={`blog-card-${post.id}`}>
      <div className="blog-card-image" style={{ position: 'relative', height: '200px', width: '100%' }}>
        <Link href={`/${locale}/blog/${post.slug}`}>
          <Image 
            src={`/images/${post.image}`} 
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            style={{ objectFit: 'cover' }}
            onError={(e) => {
              // Set unsplash fallback
            }}
          />
        </Link>
      </div>
      <div className="blog-card-body">
        <div className="blog-card-category" id={`blog-category-${post.id}`}>{category}</div>
        <h3 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>
          <Link href={`/${locale}/blog/${post.slug}`} id={`blog-title-link-${post.id}`} style={{ color: 'inherit' }}>
            {title}
          </Link>
        </h3>
        <p className="blog-card-excerpt" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', height: '3.6rem', overflow: 'hidden' }}>{excerpt}</p>
        <div className="blog-card-footer" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span id={`blog-date-${post.id}`}>📅 {formattedDate}</span>
          <span id={`blog-readtime-${post.id}`}>⏱️ {post.readTime} {t('blog.readTime', 'min read')}</span>
        </div>
      </div>
    </article>
  );
}
