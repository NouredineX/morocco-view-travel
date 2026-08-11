import React from 'react';
import Image from 'next/image';
import { Locale, getTranslations } from '@/utils/i18n';
import { vehicles } from '@/data/vehicles';

export const fleetMetadata = {
  titles: {
    en: "Our Fleet | Premium Private Transport & Chauffeurs in Morocco",
    fr: "Notre Flotte | Transport Privé Premium & Chauffeurs au Maroc",
    es: "Nuestra Flota | Transporte Privado Premium y Choferes en Marruecos",
    it: "La Nostra Flotta | Trasporto Privato Premium e Autisti in Marocco",
    ja: "車両紹介 | モロッコのプレミアムプライベート輸送＆チャーター",
    zh: "我们的车队 | 摩洛哥优质私人包车与包车司机服务"
  },
  descriptions: {
    en: "Explore our fleet of premium vehicles including Mercedes V-Class, 4x4 Toyota Prado, and luxury minibuses. Book a private transport with professional drivers in Morocco.",
    fr: "Découvrez notre flotte de véhicules premium: Mercedes Classe V, 4x4 Toyota Prado, minibus de luxe. Transport privé avec chauffeur professionnel.",
    es: "Explora nuestra flota de vehículos de gama alta como Mercedes Clase V, Toyota Prado 4x4 y minibuses de lujo. Reserva transporte privado en Marruecos.",
    it: "Esplora la nostra flotta di veicoli premium tra cui Mercedes Classe V, 4x4 Toyota Prado e minibus di lusso. Prenota un trasporto privato in Marocco.",
    ja: "メルセデスVクラス、4x4トヨタプラド、高級ミニバスなど、プレミアム車両のラインナップをご覧ください。プロのドライバーによるモロッコ民間輸送をご予約いただけます。",
    zh: "探索我们的优质车队，包括奔驰V级、丰田普拉多4x4和豪华面包车。预订配有专业司机的摩洛哥私人包车服务。"
  }
};

export default function FleetPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  // Map locale to localized fields
  const getLocalizedData = (vehicle: typeof vehicles[0]) => {
    const isEn = locale === 'en';
    const isFr = locale === 'fr';
    const isEs = locale === 'es';
    const isIt = locale === 'it';
    const isJa = locale === 'ja';
    const isZh = locale === 'zh';

    let description = vehicle.description;
    let features = vehicle.features;

    if (isFr) {
      description = vehicle.descriptionFr;
      features = vehicle.featuresFr;
    } else if (isEs) {
      description = vehicle.descriptionEs;
      features = vehicle.featuresEs;
    } else if (isIt) {
      description = vehicle.descriptionIt;
      features = vehicle.featuresIt;
    } else if (isJa) {
      description = vehicle.descriptionJa;
      features = vehicle.featuresJa;
    } else if (isZh) {
      description = vehicle.descriptionZh;
      features = vehicle.featuresZh;
    }

    return { description, features };
  };

  const getFleetTitle = () => {
    const titles = {
      en: 'Our Collection Cars',
      fr: 'Notre Collection de Voitures',
      es: 'Nuestra Colección de Coches',
      it: 'La Nostra Collezione Auto',
      ja: '車両コレクション',
      zh: '我们的车队系列'
    };
    return titles[locale] || titles.en;
  };

  const getFleetSubtitle = () => {
    const subtitles = {
      en: 'Premium Private Transport',
      fr: 'Transport Privé Premium',
      es: 'Transporte Privado Premium',
      it: 'Trasporto Privato Premium',
      ja: 'プレミアムプライベート輸送',
      zh: '优质私人包车服务'
    };
    return subtitles[locale] || subtitles.en;
  };

  const getFleetDesc = () => {
    const descs = {
      en: 'Explore Morocco in complete comfort and safety. We offer a modern fleet of well-maintained private vehicles with professional English-speaking drivers.',
      fr: 'Explorez le Maroc en toute sécurité et confort. Nous proposons une flotte moderne de véhicules privés bien entretenus avec chauffeurs professionnels.',
      es: 'Explore Marruecos con total comodidad y seguridad. Ofrecemos una flota moderna de vehículos privados con conductores profesionales.',
      it: 'Esplora il Marocco in totale comfort e sicurezza. Offriamo una flotta moderna di veicoli privati con autisti professionisti.',
      ja: '完全な快適さと安全さでモロッコを旅しましょう。整備の行き届いたモダンなプライベート車両 and プロのドライバーを提供します。',
      zh: '在完全舒适和安全中探索摩洛哥。我们提供维护良好的现代私人包车车队，配有专业的司机。'
    };
    return descs[locale] || descs.en;
  };

  const getBookVehicleText = () => {
    const texts = {
      en: 'Inquire via WhatsApp',
      fr: 'S\'informer via WhatsApp',
      es: 'Consultar por WhatsApp',
      it: 'Richiedi su WhatsApp',
      ja: 'WhatsAppでお問い合わせ',
      zh: '通过 WhatsApp 咨询'
    };
    return texts[locale] || texts.en;
  };

  return (
    <div id="fleet-page">
      {/* Banner */}
      <section className="page-hero" style={{ background: 'linear-gradient(rgba(10, 15, 26, 0.75), rgba(10, 15, 26, 0.9)), url("/images/merzoga.webp") no-repeat center center/cover', paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
        <div className="page-hero-content">
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{getFleetTitle()}</h1>
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <a href={`/${locale}`} style={{ color: 'inherit' }}>{t('nav.home', 'Home')}</a>
            <span className="separator">/</span>
            <span style={{ color: 'var(--color-primary)' }}>{t('nav.fleet', 'Our Fleet')}</span>
          </div>
        </div>
      </section>

      {/* Fleet Listing Section */}
      <section className="section" id="fleet-listing-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle" style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>{getFleetSubtitle()}</span>
            <h2>{getFleetTitle()}</h2>
            <p>{getFleetDesc()}</p>
          </div>

          <div className="fleet-grid">
            {vehicles.map((vehicle) => {
              const { description, features } = getLocalizedData(vehicle);
              const waUrl = `https://wa.me/212708228026?text=${encodeURIComponent(`Hello Travelling Through Morocco, I would like to inquire about booking the ${vehicle.name} for a private transport/tour.`)}`;
              return (
                <div key={vehicle.id} className="fleet-card" id={`fleet-card-${vehicle.id}`}>
                  <div className="fleet-image-wrapper">
                    <Image 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      fill
                      className="fleet-image"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      priority
                    />
                  </div>
                  <div className="fleet-info">
                    <span className="fleet-type">{vehicle.type}</span>
                    <h3 className="fleet-name">{vehicle.name}</h3>
                    <div className="fleet-capacity">
                      <span>{vehicle.capacity}</span>
                    </div>
                    <p className="fleet-description">{description}</p>
                    
                    <div className="fleet-features">
                      {features.map((feature, idx) => (
                        <span key={idx} className="fleet-feature-item">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <a 
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ width: '100%', marginTop: 'auto', display: 'block', textAlign: 'center' }}
                      id={`btn-inquire-${vehicle.id}`}
                    >
                      <span style={{ marginRight: '6px' }}>💬</span>
                      {getBookVehicleText()}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
