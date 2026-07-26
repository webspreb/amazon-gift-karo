'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function SeasonalHero() {
  const [theme, setTheme] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.dataset.theme || 'default';
    }
    return 'default';
  });

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setTheme(customEvent.detail || 'default');
    };

    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  const badgeText: Record<string, string> = {
    diwali: 'Diwali Collection Live',
    christmas: 'Christmas Collection Live',
    valentines: "Valentine's Collection Live",
    default: 'New Seasonal Picks',
  };

  return (
    <section className="hero" aria-labelledby="hero-title" data-od-id="hero">
      <div className="container hero-content">
        <span className="hero-badge" data-od-id="hero-badge">
          <span aria-hidden="true">✨</span>
          <span id="heroSeasonText">{badgeText[theme] || badgeText.default}</span>
        </span>
        <h1 id="hero-title" className="hero-title" data-od-id="hero-title">
          Find Thoughtful Gifts They&apos;ll Actually Love
        </h1>
        <p className="hero-subtitle" data-od-id="hero-subtitle">
          Curated gift guides for every occasion, festival, and vibe. No endless scrolling — just handpicked picks that feel personal.
        </p>
        <div className="hero-cta">
          <Link href="/search" className="btn-primary" data-od-id="hero-cta">
            Explore Gifts →
          </Link>
        </div>
      </div>
    </section>
  );
}
