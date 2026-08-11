import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Locale } from '@/utils/i18n';
import ToursPage, { toursMetadata } from '@/components/pages/ToursPage';
import { getLocalizedPath } from '@/utils/routes';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const allowedLocales = ['fr'];

export async function generateStaticParams() {
  return allowedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  if (!allowedLocales.includes(locale)) return {};

  return {
    title: toursMetadata.titles[locale] || toursMetadata.titles.en,
    description: toursMetadata.descriptions[locale] || toursMetadata.descriptions.en,
    alternates: { canonical: getLocalizedPath('tours', locale) }
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  if (!allowedLocales.includes(locale)) {
    notFound();
  }

  return <ToursPage locale={locale} />;
}
