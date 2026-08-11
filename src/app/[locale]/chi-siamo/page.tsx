import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Locale } from '@/utils/i18n';
import AboutPage, { aboutMetadata } from '@/components/pages/AboutPage';
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
    title: aboutMetadata.titles[locale] || aboutMetadata.titles.en,
    description: aboutMetadata.descriptions[locale] || aboutMetadata.descriptions.en,
    alternates: { canonical: getLocalizedPath('about', locale) }
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  if (!allowedLocales.includes(locale)) {
    notFound();
  }

  return <AboutPage locale={locale} />;
}
