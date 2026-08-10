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
  weight: ['400', '500', '600', '700', '800'],
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
    en: "Morocco View Travel — Premium Desert Tours & Private Travel Agency",
    fr: "Morocco View Travel — Circuits Premium au Désert & Agence de Voyage Privée",
    es: "Morocco View Travel — Tours de Desierto Premium y Agencia de Viajes Privada",
    it: "Morocco View Travel — Tour del Deserto Premium e Agenzia di Viaggi Privata",
    ja: "Morocco View Travel — プレミアム砂漠ツアー＆プライベート旅行代理店",
    zh: "Morocco View Travel — 优质沙漠旅游与私人旅行社"
  };

  const descriptions = {
    en: "Explore Morocco with Morocco View Travel. We offer premium desert tours, custom itineraries, and high-quality private transport from Marrakech, Fes, Casablanca, and Tangier.",
    fr: "Explorez le Maroc avec Morocco View Travel. Circuits premium dans le désert, itinéraires sur mesure et transport privé haut de gamme depuis Marrakech, Fès, Casablanca et Tanger.",
    es: "Explora Marruecos con Morocco View Travel. Ofrecemy tours de desierto premium, itinerarios a medida y transporte privado de alta gama desde Marrakech, Fez, Casablanca y Tánger.",
    it: "Esplora il Marocco con Morocco View Travel. Offriamo tour del deserto premium, itinerari personalizzati e trasporti privati di alta qualità da Marrakech, Fes, Casablanca e Tangeri.",
    ja: "Morocco View Travelでモロッコを探索しましょう。マラケシュ、フェズ、カサブランカ、タンジール出発のプレミアム砂漠ツアー、カスタム旅程、高品質のプライベート輸送を提供しています。",
    zh: "与 Morocco View Travel 一起探索摩洛哥。我们提供从马拉喀什、非斯、卡萨布兰卡和丹吉尔出发的优质沙漠游、定制行程以及高品质的私人包车服务。"
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    metadataBase: new URL('https://moroccoviewtravel.com'),
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
      icon: '/favicon.ico',
    },
    openGraph: {
      type: 'website',
      url: 'https://moroccoviewtravel.com',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: [
        {
          url: '/images/new update/marrakech.jpg',
          width: 1200,
          height: 630,
          alt: 'Morocco View Travel',
        },
      ],
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${inter.variable} ${kaushan.variable} h-full antialiased`}
    >
      <head>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VNMF0EKF50"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VNMF0EKF50');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#1A1A2E] font-sans">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
