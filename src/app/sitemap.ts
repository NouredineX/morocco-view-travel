import { MetadataRoute } from 'next';
import { locales, Locale } from '@/utils/i18n';
import { tours } from '@/data/tours';
import { blogPosts } from '@/data/blogPosts';
import { getLocalizedPath } from '@/utils/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://travellingthroughmorocco.com';
  const entries: MetadataRoute.Sitemap = [];

  const pageTypes = [
    'about',
    'contact',
    'our-fleet',
    'destinations',
    'tours',
    'blog',
    'testimonials',
    'privacy-policy'
  ];

  // 1. Add Home page ('/') for all locales
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}${getLocalizedPath('home', locale)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    });
  }

  // 2. Add static pages for all locales with their localized permalinks
  for (const locale of locales) {
    for (const pageType of pageTypes) {
      entries.push({
        url: `${baseUrl}${getLocalizedPath(pageType, locale)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  // 3. Add tour detail pages for all locales with their localized slug and parent slug
  for (const locale of locales) {
    for (const tour of tours) {
      entries.push({
        url: `${baseUrl}${getLocalizedPath('tours', locale, tour.slug)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }

  // 4. Add blog post detail pages for all locales with their localized slug and parent slug
  for (const locale of locales) {
    for (const post of blogPosts) {
      entries.push({
        url: `${baseUrl}${getLocalizedPath('blog', locale, post.slug)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
