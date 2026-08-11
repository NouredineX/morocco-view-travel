import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Locale } from '@/utils/i18n';
import DestinationsPage, { destinationsMetadata } from '@/components/pages/DestinationsPage';
import { getLocalizedPath } from '@/utils/routes';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const allowedLocales = ['es'];

export async function generateStaticParams() {
  return allowedLocales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  if (!allowedLocales.includes(locale)) return {};

  return {
    title: destinationsMetadata.titles[locale] || destinationsMetadata.titles.en,
    description: destinationsMetadata.descriptions[locale] || destinationsMetadata.descriptions.en,
    alternates: { canonical: getLocalizedPath('destinations', locale) }
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  if (!allowedLocales.includes(locale)) {
    notFound();
  }

  return <DestinationsPage locale={locale} />;
}
