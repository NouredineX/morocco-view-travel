'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/utils/i18n-client';

export default function NotFound() {
  const { t, locale } = useTranslation();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '2rem',
      textAlign: 'center',
      background: 'var(--bg-dark)'
    }}>
      <div className="glass-card" style={{
        padding: '3.5rem 2rem',
        maxWidth: '500px',
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-glass)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ fontSize: '4.5rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 10px rgba(197, 168, 110, 0.3))' }}>
          🧭
        </div>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          color: 'var(--text-primary)',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          404 - {t('common.notFound', 'Page Not Found')}
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          lineHeight: '1.6',
          marginBottom: '2.5rem'
        }}>
          {locale === 'fr' && "Désolé, la page que vous recherchez n'existe pas ou a été déplacée."}
          {locale === 'es' && "Lo sentimos, la página que buscas no existe o ha sido movida."}
          {locale === 'it' && "Spiacenti, la pagina che stai cercando non esiste o è stata spostata."}
          {locale === 'ja' && "申し訳ありませんが、お探しのページは存在しないか、移動された可能性があります。"}
          {locale === 'zh' && "抱歉，您寻找的页面不存在或已被移动。"}
          {['en', 'fr', 'es', 'it', 'ja', 'zh'].indexOf(locale) === -1 || locale === 'en' ? "Oops! The page you are looking for doesn't exist or has been moved." : ""}
        </p>
        <Link 
          href={`/${locale}`}
          className="btn btn-primary"
          style={{ display: 'inline-block', width: '100%', padding: '0.8rem 1.5rem', textAlign: 'center' }}
        >
          {t('common.goHome', 'Go Home')}
        </Link>
      </div>
    </div>
  );
}
