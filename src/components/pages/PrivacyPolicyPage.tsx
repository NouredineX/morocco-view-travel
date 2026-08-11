import React from 'react';
import { Locale, getTranslations } from '@/utils/i18n';

export const privacyMetadata = {
  titles: {
    en: "Privacy Policy | Travelling Through Morocco Data Protection",
    fr: "Politique de Confidentialité | Protection des Données Travelling Through Morocco",
    es: "Política de Privacidad | Protección de Datos de Travelling Through Morocco",
    it: "Informativa sulla Privacy | Protezione dei Dati di Travelling Through Morocco",
    ja: "プライバシーポリシー | Travelling Through Morocco 個人情報保護",
    zh: "隐私政策 | Travelling Through Morocco 数据保护"
  },
  descriptions: {
    en: "Read our privacy policy regarding data collection, encryption, cybersecurity, and refund terms at Travelling Through Morocco.",
    fr: "Consultez notre politique de confidentialité concernant la collecte de données, le cryptage et les conditions de remboursement chez Travelling Through Morocco.",
    es: "Consulta nuestra política de privacidad sobre la recopilación de datos, el cifrado y los reembolsos de Travelling Through Morocco.",
    it: "Leggi la nostra informativa sulla privacy in merito a raccolta dati, crittografia e rimborsi per Travelling Through Morocco.",
    ja: "Travelling Through Moroccoのデータ収集、暗号化、セキュリティ、および返金規約に関するプライバシーポリシーはこちらをご覧ください。",
    zh: "阅读关于 Travelling Through Morocco 的数据收集、加密、网络安全和退款条款的隐私政策。"
  }
};

export default function PrivacyPolicyPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <div id="privacy-policy-page">
      {/* Banner */}
      <section className="page-hero" style={{ background: 'linear-gradient(rgba(10, 15, 26, 0.85), rgba(10, 15, 26, 0.95)), url("/images/merzoga.webp") no-repeat center center/cover', paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
        <div className="page-hero-content">
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Privacy Policy & Data Security</h1>
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <a href={`/${locale}`} style={{ color: 'inherit' }}>{t('nav.home', 'Home')}</a>
            <span className="separator">/</span>
            <span style={{ color: 'var(--color-primary)' }}>Privacy Policy</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container container-narrow" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div className="glass-card" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '2rem' }}>🛡️</span>
              <div>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0 }}>Data Protection Commitment</h2>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-primary)' }}>Last Updated: August 2026 | Enterprise Cybersecurity Protocol</p>
              </div>
            </div>

            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>1. Overview & Scope</h3>
              <p style={{ marginBottom: '1rem' }}>
                At <strong>Travelling Through Morocco</strong>, we take personal privacy and cybersecurity with the highest degree of seriousness. 
                This Privacy Policy explains how our agency collects, uses, and safeguards personal data provided when browsing our website or booking private tours across Morocco.
              </p>

              <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>2. Personal Data We Collect</h3>
              <p style={{ marginBottom: '0.5rem' }}>We only collect personal information voluntarily submitted through our inquiry forms or direct communication:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                <li>Full Name</li>
                <li>Email Address & Phone Number / WhatsApp contact</li>
                <li>Estimated travel dates, party size, and itinerary preferences</li>
              </ul>

              <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>3. Cybersecurity & Encryption Standards</h3>
              <p style={{ marginBottom: '1rem' }}>
                All data transmitted between your web browser and our servers is secured using <strong>256-bit SSL (Transport Layer Security) encryption</strong>. 
                We enforce Strict Transport Security (HSTS), XSS mitigation headers, Content Security Policies, and anti-bot honeypots to ensure safe, uncompromised interaction.
              </p>

              <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>4. Zero Commercial Data Selling</h3>
              <p style={{ marginBottom: '1rem' }}>
                <strong>We never sell, rent, lease, or trade your personal data</strong> to third-party marketing brokers or advertisers. 
                Your information is used strictly to communicate regarding your Morocco itinerary, hotel reservations, and private transport logistics.
              </p>

              <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>5. GDPR & Data Subject Rights</h3>
              <p style={{ marginBottom: '0.5rem' }}>Under international regulations including the EU General Data Protection Regulation (GDPR), you possess the right to:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                <li>Request access to your stored personal records.</li>
                <li>Request immediate deletion or correction of your personal information (Right to be Forgotten).</li>
                <li>Withdraw consent for inquiry follow-ups at any time.</li>
              </ul>

              <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>6. Booking Terms & Refund Conditions</h3>
              <p style={{ marginBottom: '0.5rem' }}>The following refund and cancellation policy applies to all bookings made with Travelling Through Morocco:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyle: 'none' }}>
                <li style={{ marginBottom: '0.75rem' }}><strong>More than 30 days before departure:</strong> 100% refund of the deposit (minus credit card/transaction fees).</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Between 15 and 30 days before departure:</strong> 50% refund of the total booking cost.</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Less than 15 days before departure:</strong> No refund is provided.</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Custom bookings:</strong> Special activities or custom luxury desert camps are subject to their own cancellation terms. We will notify you of any exceptions during booking.</li>
              </ul>

              <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>7. Contacting Our Data Security Officer</h3>
              <p style={{ marginBottom: '1rem' }}>
                If you have questions regarding data privacy, security compliance, refund requests, or wish to exercise your data rights, please contact our team directly at:
              </p>
              <div style={{ background: 'var(--bg-glass)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--text-primary)' }}>Travelling Through Morocco Security Team</p>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>📍 Meknes, Morocco</p>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>✉️ travellingthroughmorocco@gmail.com</p>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>📞 +212 708-228026</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
