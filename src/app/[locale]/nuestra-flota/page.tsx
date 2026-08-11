import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Locale } from '@/utils/i18n';
import FleetPage, { fleetMetadata } from '@/components/pages/FleetPage';
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
    title: fleetMetadata.titles[locale] || fleetMetadata.titles.en,
    description: fleetMetadata.descriptions[locale] || fleetMetadata.descriptions.en,
    alternates: { canonical: getLocalizedPath('our-fleet', locale) }
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  if (!allowedLocales.includes(locale)) {
    notFound();
  }

  return <FleetPage locale={locale} />;
}
