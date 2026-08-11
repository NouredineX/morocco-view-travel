import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Locale } from '@/utils/i18n';
import { tours } from '@/data/tours';
import { getDetailedItinerary } from '@/data/tourItineraries';
import { getTranslated } from '@/utils/translate';
import { getLocalizedPath } from '@/utils/routes';
import TourDetailPage from '@/components/pages/TourDetailPage';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const allowedLocales = ['fr'];

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of allowedLocales) {
    for (const tour of tours) {
      params.push({ locale, slug: tour.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  if (!allowedLocales.includes(locale)) return {};

  const tour = tours.find((t) => t.slug === slug);
  if (!tour) return {};

  const detailedItinerary = getDetailedItinerary(tour.id, tour);
  const focusKeyword = detailedItinerary
    ? getTranslated(detailedItinerary, 'focusKeyword', locale)
    : 'Morocco desert tour';

  const seoDescriptionText = detailedItinerary
    ? getTranslated(detailedItinerary, 'seoDescription', locale)
    : 'Morocco desert tour details';

  const tourTitle = getTranslated(tour, 'title', locale);
  const seoTitle = `${focusKeyword}: ${tour.duration} Days ${tourTitle} 2026`;

  return {
    title: seoTitle,
    description: seoDescriptionText,
    alternates: {
      canonical: getLocalizedPath('tours', locale, slug),
      languages: {
        en: getLocalizedPath('tours', 'en', slug),
        es: getLocalizedPath('tours', 'es', slug),
        fr: getLocalizedPath('tours', 'fr', slug),
        it: getLocalizedPath('tours', 'it', slug),
        ja: getLocalizedPath('tours', 'ja', slug),
        zh: getLocalizedPath('tours', 'zh', slug),
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDescriptionText,
      url: `https://travellingthroughmorocco.com${getLocalizedPath('tours', locale, slug)}`,
      images: [
        {
          url: `/images/${tour.image}`,
          alt: tourTitle,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  if (!allowedLocales.includes(locale)) {
    notFound();
  }

  const tour = tours.find((t) => t.slug === slug);
  if (!tour) {
    notFound();
  }

  return <TourDetailPage locale={locale} slug={slug} />;
}
