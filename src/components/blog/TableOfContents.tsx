'use client';

import React, { useEffect, useState } from 'react';

export default function TableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: string }[]>([]);

  useEffect(() => {
    // Wait a brief moment to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      const headingElements = Array.from(document.querySelectorAll('.pro-article-content h2, .pro-article-content h3'));
      const items = headingElements.map((el, index) => {
        const id = el.id || `heading-${index}`;
        el.id = id; // Ensure ID exists for anchor link
        return {
          id,
          text: el.textContent || '',
          level: el.tagName.toLowerCase(),
        };
      });
      setHeadings(items);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="toc-box glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px solid var(--border-glass)' }}>
      <h4 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Table of Contents</h4>
      <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {headings.map((h) => (
          <li 
            key={h.id} 
            style={{ 
              paddingLeft: h.level === 'h3' ? '1rem' : '0', 
              fontSize: '0.9rem' 
            }}
          >
            <a href={`#${h.id}`} style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} className="toc-link">
              {h.level === 'h3' ? '• ' : ''}{h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
