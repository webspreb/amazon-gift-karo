'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGiftsByCategory } from '@/lib/gifts';
import { GiftCard } from '@/components/GiftCard';
import { getCategoryMeta, CategoryMeta } from '@/lib/categories';

interface CategoryPageProps {
  categoryType: 'festivals' | 'occasions' | 'relationships' | 'vibes';
  slug: string;
}

export function CategoryPage({ categoryType, slug }: CategoryPageProps) {
  // Map valentines plural key to internal valentine key if querying database
  const querySlug = slug === 'valentines' ? 'valentine' : slug;
  
  // Load gifts
  const gifts = getGiftsByCategory(categoryType, querySlug);
  if (gifts.length === 0) {
    notFound();
  }

  // Load category meta
  const meta: CategoryMeta = getCategoryMeta(slug);

  return (
    <div>
      {/* Search/Category Hero */}
      <section className="search-hero" data-od-id="category-hero">
        <div className="container">
          <span className="search-hero-eyebrow" data-od-id="hero-eyebrow">
            Curated Gifts {meta.icon}
          </span>
          <h1 className="search-hero-title" id="heroTitle">
            {meta.name}
          </h1>
          <p className="search-hero-desc" id="heroSubtitle">
            {meta.desc}
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container" style={{ marginTop: 'var(--space-4)' }}>
        <nav className="breadcrumb" aria-label="Breadcrumb" data-od-id="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="capitalize" style={{ color: 'var(--theme-text-primary)', fontWeight: 500 }}>
            {meta.name}
          </span>
        </nav>
      </div>

      {/* Featured Gifts Grid */}
      <section className="section" style={{ background: 'var(--theme-bg-elevated)' }} data-od-id="grid-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" id="gridTitle">
              Featured {meta.name}
            </h2>
            <p className="section-desc" id="gridDesc">
              Handpicked for {meta.name.toLowerCase()}.
            </p>
          </div>
          <div className="gift-grid" id="giftGrid" role="list" data-od-id="gift-grid">
            {gifts.map(gift => (
              <GiftCard key={gift.slug} gift={gift} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="editorial" data-od-id="editorial">
        <div className="container editorial-inner" id="editorialContent" data-od-id="editorial-inner">
          <h2>{meta.name} — A Curated Experience</h2>
          <p>{meta.editorial}</p>
        </div>
      </section>

      {/* Related Categories */}
      {meta.related && meta.related.length > 0 && (
        <section className="section" data-od-id="related-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title" data-od-id="related-title">Related Categories</h2>
              <p className="section-desc" data-od-id="related-desc">More occasions to explore.</p>
            </div>
            <div className="related-grid" id="relatedGrid" role="list" data-od-id="related-grid">
              {meta.related.map(relatedKey => {
                const relatedMeta = getCategoryMeta(relatedKey);
                // Determine appropriate route path
                const routePath = 
                  categoryType === 'festivals' ? `/festivals/${relatedKey}` :
                  categoryType === 'occasions' ? `/occasions/${relatedKey}` :
                  categoryType === 'vibes' ? `/vibes/${relatedKey}` :
                  `/search?${categoryType}=${relatedKey}`;

                return (
                  <Link
                    key={relatedKey}
                    href={routePath}
                    className="related-card"
                    data-od-id={`related-cat-${relatedKey}`}
                  >
                    <span className="related-icon" aria-hidden="true">
                      {relatedMeta.icon}
                    </span>
                    <span className="related-name">{relatedMeta.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Final Browse All CTA */}
      <section className="cta-section" data-od-id="cta-section">
        <div className="container">
          <Link href="/search" className="cta-btn" data-od-id="cta-btn">
            Browse All Gifts →
          </Link>
        </div>
      </section>
    </div>
  );
}
