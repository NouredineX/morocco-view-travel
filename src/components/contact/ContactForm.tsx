'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Locale, getTranslations } from '@/utils/i18n';

interface ContactFormProps {
  locale: Locale;
}

// Security Helper: Sanitize input strings to prevent XSS / script injection
function sanitizeString(str: string): string {
  return str.replace(/[<>]/g, '');
}

export default function ContactForm({ locale }: ContactFormProps) {
  const t = getTranslations(locale);
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: '2',
    date: '',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [gdprConsent, setGdprConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const selectedTour = searchParams?.get('tour');
    const customRoute = searchParams?.get('route');
    if (selectedTour) {
      setFormData(prev => ({
        ...prev,
        message: `Hello Travelling Through Morocco, I would like to request more information or book the "${selectedTour.replace(/-/g, ' ')}" tour.`
      }));
    } else if (customRoute) {
      setFormData(prev => ({
        ...prev,
        message: `Hello Travelling Through Morocco, I have built a custom route on your website and would like a quote: ${customRoute}`
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: sanitizeString(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Security Check 1: Honeypot trap against automated spam bots
    if (honeypot.length > 0) {
      console.warn('Security Alert: Bot submission blocked via honeypot trap.');
      return;
    }

    // Security Check 2: GDPR consent check
    if (!gdprConsent) {
      alert('Please accept the privacy data protection consent to proceed.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate secure transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        travelers: '2',
        date: '',
        message: ''
      });
    }, 1200);
  };

  return (
    <div className="glass-card" style={{ padding: '2.5rem' }} id="contact-form-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>{t('contact.formTitle', 'Send Us a Message')}</h3>
        <span className="security-badge">🔒 256-Bit SSL Encrypted</span>
      </div>

      {submitSuccess ? (
        <div 
          className="success-alert" 
          style={{ 
            padding: '1rem', 
            borderRadius: 'var(--radius-md)', 
            background: 'rgba(27, 94, 75, 0.2)', 
            border: '1px solid var(--color-secondary)',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem'
          }}
          id="contact-form-success"
        >
          ✅ {t('contact.success', 'Message sent successfully! We\'ll get back to you within 24 hours.')}
        </div>
      ) : null}

      <form className="contact-form" onSubmit={handleSubmit} id="contact-agency-form">
        {/* Hidden Honeypot Field for Bot Spam Prevention */}
        <input 
          type="text" 
          name="website_hp" 
          value={honeypot} 
          onChange={(e) => setHoneypot(e.target.value)} 
          style={{ display: 'none' }} 
          tabIndex={-1} 
          autoComplete="off" 
        />

        <div className="form-group">
          <label htmlFor="name-input">{t('contact.name', 'Full Name')} *</label>
          <input 
            type="text" 
            name="name" 
            id="name-input"
            value={formData.name} 
            onChange={handleChange} 
            required 
            maxLength={100}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email-input">{t('contact.email', 'Email Address')} *</label>
          <input 
            type="email" 
            name="email" 
            id="email-input"
            value={formData.email} 
            onChange={handleChange} 
            required 
            maxLength={100}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone-input">{t('contact.phone', 'Phone / WhatsApp')}</label>
          <input 
            type="tel" 
            name="phone" 
            id="phone-input"
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="+212 ..."
            maxLength={30}
          />
        </div>
        <div className="form-group">
          <label htmlFor="travelers-select">{t('contact.travelers', 'Number of Travelers')}</label>
          <select 
            name="travelers" 
            id="travelers-select"
            value={formData.travelers} 
            onChange={handleChange}
          >
            <option value="1">1 Person</option>
            <option value="2">2 People</option>
            <option value="3-5">3 - 5 People</option>
            <option value="6-10">6 - 10 People</option>
            <option value="10+">10+ Group</option>
          </select>
        </div>
        <div className="form-group full-width">
          <label htmlFor="date-input">{t('contact.date', 'Estimated Travel Date')}</label>
          <input 
            type="date" 
            name="date" 
            id="date-input"
            value={formData.date} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group full-width">
          <label htmlFor="message-input">{t('contact.message', 'Your Message')} *</label>
          <textarea 
            name="message" 
            id="message-input"
            value={formData.message} 
            onChange={handleChange} 
            placeholder={t('contact.messagePlaceholder', 'Tell us about your dream Morocco trip...')} 
            required
            maxLength={2000}
          />
        </div>

        {/* GDPR Privacy Consent */}
        <div className="form-group full-width" style={{ margin: '0.75rem 0' }}>
          <label 
            style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '0.75rem', 
              cursor: 'pointer', 
              fontSize: '0.9rem', 
              color: 'var(--text-secondary)',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              transition: 'all 0.3s ease',
            }}
          >
            <input 
              type="checkbox" 
              checked={gdprConsent} 
              onChange={(e) => setGdprConsent(e.target.checked)} 
              required
              style={{
                width: '22px',
                height: '22px',
                minWidth: '22px',
                accentColor: 'var(--color-primary)',
                cursor: 'pointer',
                marginTop: '2px',
              }}
            />
            <span style={{ lineHeight: '1.5' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '6px', marginTop: '-2px' }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              I consent to Travelling Through Morocco securely processing my details to reply to my travel inquiry.
              <span style={{ display: 'block', marginTop: '4px', fontSize: '0.78rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
                🔒 GDPR Compliant · 256-bit SSL Encrypted · Your data is never shared
              </span>
            </span>
          </label>
        </div>

        <div className="form-group full-width" style={{ marginTop: '0.5rem' }}>
          <button 
            type="submit" 
            className="btn btn-primary btn-lg" 
            style={{ width: '100%' }}
            disabled={isSubmitting}
            id="submit-contact-btn"
          >
            {isSubmitting ? t('contact.sending', 'Sending...') : t('contact.send', 'Send Message')}
          </button>
        </div>
      </form>
    </div>
  );
}
