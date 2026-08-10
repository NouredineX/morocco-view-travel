import { MetadataRoute } from 'next';
import { locales } from '@/utils/i18n';
import { tours } from '@/data/tours';
import { blogPosts } from '@/data/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://moroccoviewtravel.com';
  
  // Static sub-routes
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/our-fleet',
    '/destinations',
    '/tours',
    '/blog',
    '/testimonials'
  ];
  
  const entries: MetadataRoute.Sitemap = [];

  // 1. Add static pages for all locales
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }
  }

  // 2. Add tour detail pages for all locales
  for (const locale of locales) {
    for (const tour of tours) {
      entries.push({
        url: `${baseUrl}/${locale}/tours/${tour.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }

  // 3. Add blog post detail pages for all locales
  for (const locale of locales) {
    for (const post of blogPosts) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
