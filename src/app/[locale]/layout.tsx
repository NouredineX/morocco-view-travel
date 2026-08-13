import type { Metadata } from 'next';
import { Playfair_Display, Inter, Kaushan_Script } from 'next/font/google';
import '../globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { Locale, locales } from '@/utils/i18n';
import Script from 'next/script';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const kaushan = Kaushan_Script({
  variable: '--font-kaushan',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  
  const titles = {
    en: "Travelling Through Morocco | Premium Desert Tours & Private Travel Agency",
    fr: "Travelling Through Morocco | Circuits Premium au Désert & Agence de Voyage Privée",
    es: "Travelling Through Morocco | Tours de Desierto Premium y Agencia de Viajes Privada",
    it: "Travelling Through Morocco | Tour del Deserto Premium e Agenzia di Viaggi Privata",
    ja: "Travelling Through Morocco | プレミアム砂漠ツアー＆プライベート旅行代理店",
    zh: "Travelling Through Morocco | 优质沙漠旅游与私人旅行社"
  };

  const descriptions = {
    en: "Explore Morocco with Travelling Through Morocco. We offer premium desert tours, custom itineraries, and high-quality private transport from Marrakech, Fes, Casablanca, and Tangier.",
    fr: "Explorez le Maroc avec Travelling Through Morocco. Circuits premium dans le désert, itinéraires sur mesure et transport privé haut de gamme depuis Marrakech, Fès, Casablanca et Tanger.",
    es: "Explora Marruecos con Travelling Through Morocco. Ofrecemos tours de desierto premium, itinerarios a medida y transporte privado de alta gama desde Marrakech, Fez, Casablanca y Tánger.",
    it: "Esplora il Marocco con Travelling Through Morocco. Offriamo tour del deserto premium, itinerari personalizzati e trasporti privati di alta qualità da Marrakech, Fes, Casablanca e Tangeri.",
    ja: "Travelling Through Moroccoでモロッコを探索しましょう。マラケシュ、フェズ、カサブランカ、タンジール出発のプレミアム砂漠ツアー、カスタム旅程、高品質のプライベート輸送を提供しています。",
    zh: "与 Travelling Through Morocco 一起探索摩洛哥。我们提供从马拉喀什、非斯、卡萨布兰卡和丹吉尔出发的优质沙漠游、定制行程以及高品质的私人包车服务。"
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    metadataBase: new URL('https://travellingthroughmorocco.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        es: '/es',
        fr: '/fr',
        it: '/it',
        ja: '/ja',
        zh: '/zh',
      },
    },
    icons: {
      icon: '/images/logo.png',
      shortcut: '/images/logo.png',
      apple: '/images/logo.png',
    },
    openGraph: {
      type: 'website',
      url: 'https://travellingthroughmorocco.com',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: [
        {
          url: '/images/logo.png',
          width: 500,
          height: 500,
          alt: 'Travelling Through Morocco',
        },
      ],
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Travelling Through Morocco",
    "alternateName": "Travelling Through Morocco",
    "url": "https://travellingthroughmorocco.com",
    "logo": "https://travellingthroughmorocco.com/images/logo.png",
    "image": "https://travellingthroughmorocco.com/images/logo.png",
    "description": "Premium desert tours, custom itineraries, and high-quality private transport in Morocco.",
    "telephone": "+212708228026",
    "email": "travellingthroughmorocco@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Meknes Office",
      "addressLocality": "Meknes",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.8938",
      "longitude": "-5.5547"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://web.facebook.com/profile.php?id=61592802445563",
      "https://www.instagram.com/travellingthroughmorocco/"
    ]
  };

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${inter.variable} ${kaushan.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VNMF0EKF50"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VNMF0EKF50');
          `}
        </Script>
        {/* Anti-theme-flash script */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme') || 'light';
              document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {}
          })();
        ` }} />
        {/* AI Discovery Link */}
        <link rel="describedby" href="/llms.txt" />
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
