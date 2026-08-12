'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from '@/utils/i18n-client';

interface StatConfig {
  target: number;
  suffix: string;
  labelKey: string;
}

const stats: StatConfig[] = [
  { target: 50, suffix: '+', labelKey: 'stats.tours' },
  { target: 200, suffix: '+', labelKey: 'stats.clients' },
  { target: 3, suffix: '+', labelKey: 'stats.years' },
  { target: 10, suffix: '+', labelKey: 'stats.destinations' }
];

export default function StatsCounter() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasRun, setHasRun] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun) {
          setHasRun(true);
          const duration = 2000; // 2 seconds animation
          const frameDuration = 1000 / 60; // 60 FPS
          const totalFrames = Math.round(duration / frameDuration);

          let frame = 0;
          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeProgress = progress * (2 - progress);

            setCounts(
              stats.map(stat => Math.floor(easeProgress * stat.target))
            );

            if (frame === totalFrames) {
              clearInterval(timer);
              setCounts(stats.map(stat => stat.target));
            }
          }, frameDuration);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasRun]);

  return (
    <div className="stats-bar" ref={containerRef} id="stats-counter-bar">
      {stats.map((stat, idx) => (
        <div className="stat-item glass-card" key={idx} id={`stat-item-${idx}`}>
          <div className="stat-number">
            {counts[idx]}
            {stat.suffix}
          </div>
          <div className="stat-label">{t(stat.labelKey, stat.labelKey.split('.')[1])}</div>
        </div>
      ))}
    </div>
  );
}
