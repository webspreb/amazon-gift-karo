import React from 'react';

export const metadata = {
  title: 'About Us — GiftKaro',
  description: 'Learn about GiftKaro and our mission to simplify gift discovery through thoughtful, expert curation.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Header */}
      <section className="search-hero" data-od-id="about-hero">
        <div className="container">
          <span className="search-hero-eyebrow">Our Mission</span>
          <h1 className="search-hero-title">Thoughtful Gifting, Simplified</h1>
          <p className="search-hero-desc" style={{ maxWidth: '60ch' }}>
            We believe that finding the perfect gift shouldn&apos;t feel like a chore. GiftKaro was built to help you discover unique, memorable presents without the endless scrolling.
          </p>
        </div>
      </section>

      {/* Editorial Content */}
      <main className="container" style={{ padding: 'var(--space-12) 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-8)' }}>
          {/* Section 1: Intro */}
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <h2 style={{ font: '700 var(--text-3xl) var(--font-display)', color: 'var(--theme-text-primary)' }}>
              Why GiftKaro Exists
            </h2>
            <p style={{ font: 'var(--text-base)/var(--leading-relaxed) var(--font-body)', color: 'var(--theme-text-secondary)', lineHeight: '1.8' }}>
              The modern web is filled with millions of low-quality items, fake reviews, and overwhelming choices. When you want to celebrate a special milestone — be it a wedding, birthday, housewarming, or seasonal festival like Diwali — finding a meaningful token of appreciation can take hours of frustating searches.
            </p>
            <p style={{ font: 'var(--text-base)/var(--leading-relaxed) var(--font-body)', color: 'var(--theme-text-secondary)', lineHeight: '1.8' }}>
              GiftKaro cuts through the noise. We don&apos;t run warehouses, we don&apos;t handle shipping, and we don&apos;t manage checkouts. Instead, our team of dedicated curators researches, filters, and handpicks items that stand out for their craft, utility, and delight. When you find the perfect gift, we link you directly to Amazon to complete the purchase with ease.
            </p>
          </div>

          {/* Section 2: Cards Grid */}
          <div style={{ marginTop: 'var(--space-8)' }}>
            <h2 style={{ font: '700 var(--text-2xl) var(--font-display)', color: 'var(--theme-text-primary)', textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              Our Curatorial Principles
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
              {/* Card 1 */}
              <div style={{ padding: 'var(--space-6)', background: 'var(--theme-bg-card)', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '32px', marginBottom: 'var(--space-3)' }}>✨</div>
                <h3 style={{ font: '600 var(--text-lg) var(--font-display)', color: 'var(--theme-text-primary)', marginBottom: 'var(--space-2)' }}>Quality First</h3>
                <p style={{ font: 'var(--text-sm)/var(--leading-relaxed) var(--font-body)', color: 'var(--theme-text-secondary)' }}>
                  We look for authentic materials, reliable manufacturer guarantees, and high customer sentiment scores before listing any product.
                </p>
              </div>

              {/* Card 2 */}
              <div style={{ padding: 'var(--space-6)', background: 'var(--theme-bg-card)', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '32px', marginBottom: 'var(--space-3)' }}>🏺</div>
                <h3 style={{ font: '600 var(--text-lg) var(--font-display)', color: 'var(--theme-text-primary)', marginBottom: 'var(--space-2)' }}>Artisanal Support</h3>
                <p style={{ font: 'var(--text-sm)/var(--leading-relaxed) var(--font-body)', color: 'var(--theme-text-secondary)' }}>
                  We champion handmade Indian crafts, brasswares, handloom textiles, and premium local couverture chocolates over generic mass items.
                </p>
              </div>

              {/* Card 3 */}
              <div style={{ padding: 'var(--space-6)', background: 'var(--theme-bg-card)', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '32px', marginBottom: 'var(--space-3)' }}>🎯</div>
                <h3 style={{ font: '600 var(--text-lg) var(--font-display)', color: 'var(--theme-text-primary)', marginBottom: 'var(--space-2)' }}>Thoughtful Context</h3>
                <p style={{ font: 'var(--text-sm)/var(--leading-relaxed) var(--font-body)', color: 'var(--theme-text-secondary)' }}>
                  Every item listed includes a list of clear reasons explaining exactly why it makes a great gift for that specific occasion or recipient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
