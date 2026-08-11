import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Locale, locales } from '@/utils/i18n';
import BlogPage, { blogMetadata } from '@/components/pages/BlogPage';
import { getLocalizedPath } from '@/utils/routes';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  if (!locales.includes(locale)) return {};

  return {
    title: blogMetadata.titles[locale] || blogMetadata.titles.en,
    description: blogMetadata.descriptions[locale] || blogMetadata.descriptions.en,
    alternates: { canonical: getLocalizedPath('blog', locale) }
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  return <BlogPage locale={locale} />;
}
