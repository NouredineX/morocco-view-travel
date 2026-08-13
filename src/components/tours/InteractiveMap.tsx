'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { Locale } from '@/utils/i18n';

const InteractiveMapClient = dynamic(() => import('./InteractiveMapClient'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      height: '500px', 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--bg-dark-3)', 
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-glass)',
      color: 'var(--text-muted)' 
    }}>
      Loading Interactive Custom Map...
    </div>
  )
});

interface InteractiveMapProps {
  locale: Locale;
}

export default function InteractiveMap({ locale }: InteractiveMapProps) {
  return <InteractiveMapClient locale={locale} />;
}
