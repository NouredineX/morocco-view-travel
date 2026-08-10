'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Locale, getTranslations } from '@/utils/i18n';

interface ContactFormProps {
  locale: Locale;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const selectedTour = searchParams?.get('tour');
    const customRoute = searchParams?.get('route');
    if (selectedTour) {
      setFormData(prev => ({
        ...prev,
        message: `Hello Morocco View Travel, I would like to request more information or book the "${selectedTour.replace(/-/g, ' ')}" tour.`
      }));
    } else if (customRoute) {
      setFormData(prev => ({
        ...prev,
        message: `Hello Morocco View Travel, I have built a custom route on your website and would like a quote: ${customRoute}`
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending email/message
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
    }, 1500);
  };

  return (
    <div className="glass-card" style={{ padding: '2.5rem' }} id="contact-form-container">
      <h3 style={{ marginBottom: '1.5rem' }}>{t('contact.formTitle', 'Send Us a Message')}</h3>
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
        <div className="form-group">
          <label htmlFor="name-input">{t('contact.name', 'Full Name')} *</label>
          <input 
            type="text" 
            name="name" 
            id="name-input"
            value={formData.name} 
            onChange={handleChange} 
            required 
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone-input">{t('contact.phone', 'Phone Number')}</label>
          <input 
            type="tel" 
            name="phone" 
            id="phone-input"
            value={formData.phone} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="travelers-input">{t('contact.travelers', 'Number of Travelers')}</label>
          <select 
            name="travelers" 
            id="travelers-input"
            value={formData.travelers} 
            onChange={handleChange}
          >
            <option value="1">1 person</option>
            <option value="2">2 people</option>
            <option value="3">3 people</option>
            <option value="4">4 people</option>
            <option value="5">5+ people</option>
            <option value="10">10+ people (Group)</option>
          </select>
        </div>
        <div className="form-group full-width">
          <label htmlFor="date-input">{t('contact.date', 'Travel Date')}</label>
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
          />
        </div>
        <div className="form-group full-width" style={{ marginTop: '1rem' }}>
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
