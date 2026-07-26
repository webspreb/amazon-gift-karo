'use client';

import { GiftEntry } from '@/lib/types';
import Link from 'next/link';

interface GiftCardProps {
  gift: GiftEntry;
}

export function GiftCard({ gift }: GiftCardProps) {
  // Format subtitle from vibes or occasions
  const vibes = gift.categories.vibes || [];
  const occasions = gift.categories.occasions || [];
  const subtitle = vibes.length > 0
    ? vibes.map(v => v.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')).join(' · ')
    : occasions.map(o => o.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')).join(' · ');

  // Take the first reason in "Why It's Great" as the preview line
  const preview = gift.whyItsGreat?.[0] || gift.description;

  return (
    <Link
      href={`/gift/${gift.slug}`}
      className="gift-card"
      role="listitem"
      data-od-id={`gift-card-${gift.slug}`}
    >
      <img
        src={gift.imageUrl || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225"><rect fill="%23FAFAFA" width="400" height="225"/></svg>'}
        alt={gift.title}
        loading="lazy"
        className="gift-card-image"
        data-od-id={`gift-img-${gift.slug}`}
      />
      <div className="gift-card-content">
        <h3 className="gift-card-title" data-od-id={`gift-title-${gift.slug}`}>
          {gift.title}
        </h3>
        <p className="gift-card-subtitle" data-od-id={`gift-subtitle-${gift.slug}`}>
          {subtitle}
        </p>
        <p className="gift-card-preview" data-od-id={`gift-preview-${gift.slug}`}>
          {preview}
        </p>
        <div className="gift-card-footer">
          <span className="gift-card-price" data-od-id={`gift-price-${gift.slug}`}>
            {gift.priceRange}
          </span>
          <span className="gift-card-cta">View →</span>
        </div>
      </div>
    </Link>
  );
}
