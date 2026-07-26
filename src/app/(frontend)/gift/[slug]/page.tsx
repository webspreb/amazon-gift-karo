import { getGiftBySlug, getAllGifts, getGiftsByCategory } from '@/lib/gifts';
import { GiftCard } from '@/components/GiftCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import './gift-detail.css';

// Pre-generate dynamic paths at build time
export function generateStaticParams() {
  const gifts = getAllGifts();
  return gifts.map(g => ({ slug: g.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GiftDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const gift = getGiftBySlug(slug);
  if (!gift) notFound();

  // Load related gifts
  const firstVibe = gift.categories.vibes?.[0];
  const relatedGifts = firstVibe
    ? getGiftsByCategory('vibes', firstVibe).filter(g => g.slug !== gift.slug).slice(0, 4)
    : [];

  // Compute breadcrumb details
  const breadcrumbCategory = gift.categories.festivals?.[0]
    ? { type: 'festivals', value: gift.categories.festivals[0] }
    : gift.categories.occasions?.[0]
      ? { type: 'occasions', value: gift.categories.occasions[0] }
      : { type: 'vibes', value: gift.categories.vibes?.[0] || 'minimal' };

  const prettyCategoryLabel = breadcrumbCategory.value
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // Compute subtitle (e.g. "Diwali Essentials" or "Anniversary Favorites")
  const primaryCat = gift.categories.festivals?.[0] || gift.categories.occasions?.[0] || 'Gifts';
  const subtitle = `${primaryCat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Pick`;

  return (
    <div className="container">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb" aria-label="Breadcrumb" data-od-id="breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <Link href={`/${breadcrumbCategory.type}/${breadcrumbCategory.value}`}>
          {prettyCategoryLabel}
        </Link>
        <span className="breadcrumb-sep">/</span>
        <span style={{ color: 'var(--theme-text-primary)', fontWeight: 500 }}>
          {gift.title}
        </span>
      </nav>

      {/* Gift Detail Section */}
      <main className="gift-detail">
        <div className="gift-detail-grid">
          {/* Left: Product Image Wrap */}
          <div className="product-image-wrap" data-od-id="product-image">
            <div style={{
              width: '100%',
              aspectRatio: '4/5',
              background: 'linear-gradient(135deg, var(--theme-bg-start), var(--theme-bg-end))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {gift.imageUrl ? (
                <img
                  src={gift.imageUrl}
                  alt={gift.title}
                  className="product-image"
                />
              ) : (
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60 20 L65 50 L60 45 L55 50 Z" fill="var(--theme-primary)" opacity="0.3"/>
                  <ellipse cx="60" cy="65" rx="25" ry="8" fill="var(--theme-primary)" opacity="0.15"/>
                  <path d="M35 65 L60 30 L85 65 L75 65 L60 42 L45 65 Z" fill="var(--theme-primary)" opacity="0.2"/>
                  <circle cx="60" cy="30" r="4" fill="var(--theme-primary)" opacity="0.4"/>
                  <path d="M42 70 Q60 85 78 70" stroke="var(--theme-primary)" stroke-width="1.5" fill="none" opacity="0.2"/>
                  <rect x="30" y="72" width="60" height="4" rx="2" fill="var(--theme-primary)" opacity="0.1"/>
                </svg>
              )}
              {gift.seasonalFlag && (
                <span className="product-tag">{gift.seasonalFlag}</span>
              )}
            </div>
          </div>

          {/* Right: Content Panel */}
          <div className="content-panel">
            <div className="gift-meta" data-od-id="gift-meta">
              <span className="gift-subtitle">{subtitle}</span>
              <h1 className="gift-title">{gift.title}</h1>
              <div className="price-range">
                <span className="price-range-label" style={{ marginRight: '8px' }}>Price Range</span>
                {gift.priceRange}
              </div>
            </div>

            <p className="gift-description" data-od-id="gift-description">
              {gift.description}
            </p>

            {/* Why It's Great Section */}
            {gift.whyItsGreat && gift.whyItsGreat.length > 0 && (
              <div className="why-section" data-od-id="why-its-great">
                <h2 className="why-heading">Why It&apos;s Great</h2>
                <ul className="why-list">
                  {gift.whyItsGreat.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Amazon Affiliate CTA */}
            <div className="amazon-cta-wrap" data-od-id="amazon-cta">
              <a
                href={gift.amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="amazon-cta"
              >
                <span>View on Amazon</span>
                <span className="amazon-cta-icon">→</span>
              </a>
              <p className="affiliate-disclosure-inline">
                As an Amazon Associate, I earn from qualifying purchases
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Related Gifts */}
      {relatedGifts.length > 0 && (
        <section className="related-section" data-od-id="related-gifts">
          <div className="section-header">
            <span className="section-tag">You Might Also Like</span>
            <h2 className="section-title">Related Gifts</h2>
          </div>
          <div className="gift-grid">
            {relatedGifts.map(rg => (
              <GiftCard key={rg.slug} gift={rg} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
