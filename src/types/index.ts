export interface Tour {
  id: string;
  slug: string;
  title: string;
  titleFr: string;
  titleEs: string;
  titleIt?: string;
  titleJa?: string;
  titleZh?: string;
  titlePt?: string;
  description: string;
  descriptionFr: string;
  descriptionEs: string;
  descriptionIt?: string;
  descriptionJa?: string;
  descriptionZh?: string;
  descriptionPt?: string;
  duration: number;
  durationUnit: 'days' | 'hours';
  departure: string;
  pricePerPerson: number;
  currency: string;
  image: string;
  category: TourCategory;
  highlights: string[];
  highlightsFr: string[];
  highlightsEs: string[];
  highlightsIt?: string[];
  highlightsJa?: string[];
  highlightsZh?: string[];
  highlightsPt?: string[];
  rating: number;
  reviewCount: number;
  badge?: 'popular' | 'discount' | 'new';
  cities: string[];
}

export type TourCategory = 'desert' | 'imperial' | 'day-trip' | 'private' | 'special';

export interface Destination {
  id: string;
  slug: string;
  name: string;
  nameFr: string;
  nameEs: string;
  nameIt?: string;
  nameJa?: string;
  nameZh?: string;
  namePt?: string;
  tagline: string;
  taglineFr: string;
  taglineEs: string;
  taglineIt?: string;
  taglineJa?: string;
  taglineZh?: string;
  taglinePt?: string;
  description: string;
  descriptionFr: string;
  descriptionEs: string;
  descriptionIt?: string;
  descriptionJa?: string;
  descriptionZh?: string;
  descriptionPt?: string;
  image: string;
  tourCount: number;
  coords: { lat: number; lng: number };
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  textFr: string;
  textEs: string;
  textIt?: string;
  textJa?: string;
  textZh?: string;
  textPt?: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleFr: string;
  titleEs: string;
  titleIt?: string;
  titleJa?: string;
  titleZh?: string;
  titlePt?: string;
  excerpt: string;
  excerptFr?: string;
  excerptEs?: string;
  excerptIt?: string;
  excerptJa?: string;
  excerptZh?: string;
  excerptPt?: string;
  content: string;
  contentFr?: string;
  contentEs?: string;
  contentIt?: string;
  contentJa?: string;
  contentZh?: string;
  contentPt?: string;
  image: string;
  date: string;
  author: string;
  category: string;
  categoryFr?: string;
  categoryEs?: string;
  categoryIt?: string;
  categoryJa?: string;
  categoryZh?: string;
  categoryPt?: string;
  readTime: number;
  focusKeyword: string;
}

export interface MapCity {
  id: string;
  name: string;
  coords: { lat: number; lng: number };
  pricePerDay: number;
  description: string;
  descriptionFr: string;
  descriptionEs: string;
  descriptionIt?: string;
  descriptionJa?: string;
  descriptionZh?: string;
  descriptionPt?: string;
}

export interface CustomItinerary {
  cities: MapCity[];
  totalDistance: number;
  estimatedDays: number;
  estimatedPrice: number;
}

export type Language = 'en' | 'fr' | 'es' | 'zh' | 'it' | 'ja';
