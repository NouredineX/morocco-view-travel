'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/utils/i18n-client';

export default function Footer() {
  const { t, locale } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="main-footer">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Column 1: About */}
          <div className="footer-col" id="footer-col-about">
            <Link 
              href={`/${locale}`} 
              className="footer-logo" 
              id="footer-logo"
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: '1.5rem' }}
            >
              <div style={{ position: 'relative', width: '75px', height: '75px' }}>
                <Image 
                  src="/images/logo.png" 
                  alt="Morocco View Travel Logo" 
                  fill
                  sizes="75px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </Link>
            <p className="footer-about-text">
              {t('footer.aboutText', 'Morocco View Travel is your trusted partner for authentic Moroccan travel experiences. Based in Rissani, Merzouga, we offer premium tours and private transportation across the kingdom.')}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col" id="footer-col-links">
            <h4 className="footer-title">{t('footer.quickLinks', 'Quick Links')}</h4>
            <ul className="footer-links-list">
              <li><Link href={`/${locale}`} id="footer-link-home">{t('nav.home', 'Home')}</Link></li>
              <li><Link href={`/${locale}/tours`} id="footer-link-tours">{t('nav.tours', 'Tours')}</Link></li>
              <li><Link href={`/${locale}/our-fleet`} id="footer-link-fleet">{t('nav.fleet', 'Our Fleet')}</Link></li>
              <li><Link href={`/${locale}/about`} id="footer-link-about">{t('nav.about', 'About Us')}</Link></li>
              <li><Link href={`/${locale}/blog`} id="footer-link-blog">{t('nav.blog', 'Blog')}</Link></li>
              <li><Link href={`/${locale}/contact`} id="footer-link-contact">{t('nav.contact', 'Contact')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Top Destinations */}
          <div className="footer-col" id="footer-col-destinations">
            <h4 className="footer-title">{t('footer.topDestinations', 'Top Destinations')}</h4>
            <ul className="footer-links-list">
              <li><Link href={`/${locale}/destinations`} id="footer-dest-marrakech">Marrakech</Link></li>
              <li><Link href={`/${locale}/destinations`} id="footer-dest-fes">Fes</Link></li>
              <li><Link href={`/${locale}/destinations`} id="footer-dest-sahara">Sahara Desert</Link></li>
              <li><Link href={`/${locale}/destinations`} id="footer-dest-chefchaouen">Chefchaouen</Link></li>
              <li><Link href={`/${locale}/destinations`} id="footer-dest-essaouira">Essaouira</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-col" id="footer-col-contact">
            <h4 className="footer-title">{t('footer.contactInfo', 'Contact Info')}</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="contact-icon">📍</span>
                <a href="https://share.google/rSjknir5yG0U982kt" target="_blank" rel="noopener noreferrer" id="footer-contact-map-link">
                  Rissani, Merzouga 52022, Morocco
                </a>
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                <a href="mailto:moroccoviewtravel@gmail.com?subject=Inquiry%20-%20Morocco%20View%20Travel" id="footer-contact-email-link">
                  moroccoviewtravel@gmail.com
                </a>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <a href="https://wa.me/212638443209?text=Hello%20Morocco%20View%20Travel%2C%20I%20would%20like%20to%20inquire%20about%20your%20tours!" target="_blank" rel="noopener noreferrer" id="footer-contact-phone-link">
                  +212 638-443209
                </a>
              </li>
              <li>
                <span className="contact-icon">🕒</span>
                {t('contact.hours', 'Mon - Sat: 8am - 8pm')}
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {currentYear} moroccoviewtravel.com. {t('footer.rights', 'All rights reserved.')}
          </p>
          <div className="social-links" id="footer-socials">
            <a href="https://www.facebook.com/share/1Ukv32PNQY/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" id="social-fb">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.instagram.com/morocco_view_travel?igsh=bWsxeW5nN21jamw1" target="_blank" rel="noopener noreferrer" aria-label="Instagram" id="social-ig">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://wa.me/212638443209" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" id="social-wa">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
            <a href="https://www.tripadvisor.com/Attraction_Review-g293734-d23498363-Reviews-Morocco_View_Travel-Marrakech_Marrakech_Safi.html" target="_blank" rel="noopener noreferrer" aria-label="TripAdvisor" id="social-ta">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
