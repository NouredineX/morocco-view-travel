import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Locale, locales } from '@/utils/i18n';
import { blogPosts } from '@/data/blogPosts';
import { getTranslated } from '@/utils/translate';
import { getLocalizedPath } from '@/utils/routes';
import BlogDetailPage from '@/components/pages/BlogDetailPage';

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
  if (!locales.includes(locale)) return {};

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const title = getTranslated(post, 'title', locale);
  const excerpt = getTranslated(post, 'excerpt', locale);
  const seoTitle = `${title} | Travelling Through Morocco`;

  return {
    title: seoTitle,
    description: excerpt,
    alternates: {
      canonical: getLocalizedPath('blog', locale, slug),
      languages: {
        en: getLocalizedPath('blog', 'en', slug),
        es: getLocalizedPath('blog', 'es', slug),
        fr: getLocalizedPath('blog', 'fr', slug),
        it: getLocalizedPath('blog', 'it', slug),
        ja: getLocalizedPath('blog', 'ja', slug),
        zh: getLocalizedPath('blog', 'zh', slug),
      },
    },
    openGraph: {
      title: seoTitle,
      description: excerpt,
      url: `https://travellingthroughmorocco.com${getLocalizedPath('blog', locale, slug)}`,
      images: [
        {
          url: `/images/${post.image}`,
          alt: title,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  return <BlogDetailPage locale={locale} slug={slug} />;
}
