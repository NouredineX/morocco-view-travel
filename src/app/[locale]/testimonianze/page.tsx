import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Locale } from '@/utils/i18n';
import TestimonialsPage, { testimonialsMetadata } from '@/components/pages/TestimonialsPage';
import { getLocalizedPath } from '@/utils/routes';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const allowedLocales = ['it'];

export async function generateStaticParams() {
  return allowedLocales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  if (!allowedLocales.includes(locale)) return {};

  return {
    title: testimonialsMetadata.titles[locale] || testimonialsMetadata.titles.en,
    description: testimonialsMetadata.descriptions[locale] || testimonialsMetadata.descriptions.en,
    alternates: { canonical: getLocalizedPath('testimonials', locale) }
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  if (!allowedLocales.includes(locale)) {
    notFound();
  }

  return <TestimonialsPage locale={locale} />;
}
