import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'How It Works — GiftKaro',
  description: 'Understand how GiftKaro helps you discover the best gifts online in three simple steps.',
};

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero Header */}
      <section className="search-hero" data-od-id="how-it-works-hero">
        <div className="container">
          <span className="search-hero-eyebrow">Discover Gifting</span>
          <h1 className="search-hero-title">How GiftKaro Works</h1>
          <p className="search-hero-desc">
            We make finding thoughtful gifts incredibly fast and friction-free. Here is how our platform works.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <main className="container" style={{ padding: 'var(--space-12) 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-12)' }}>
          {/* Step 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)', alignItems: 'center' }}>
            <div>
              <span style={{ font: '600 var(--text-xs) var(--font-mono)', color: 'var(--theme-primary)', background: 'var(--theme-primary-light)', padding: 'var(--space-1) var(--space-3)', borderRadius: 'var(--radius-full)', textTransform: 'uppercase' }}>
                Step 01
              </span>
              <h2 style={{ font: '700 var(--text-2xl) var(--font-display)', color: 'var(--theme-text-primary)', margin: 'var(--space-3) 0 var(--space-4)' }}>
                Filter by Occasion, Vibe, or Budget
              </h2>
              <p style={{ font: 'var(--text-base)/var(--leading-relaxed) var(--font-body)', color: 'var(--theme-text-secondary)', lineHeight: '1.7' }}>
                Use our dynamic sidebar filters to target your search. Whether you need a <em>luxury</em> item for a <em>housewarming</em> party, a <em>sentimental</em> gift for your <em>parents</em>, or simply want to stay under a specific budget, our categorisation system helps you pinpoint options instantly.
              </p>
            </div>
            <div style={{ padding: 'var(--space-8)', background: 'var(--theme-bg-elevated)', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🔍</div>
              <p style={{ font: '500 var(--text-sm) var(--font-mono)', color: 'var(--theme-text-primary)' }}>Occasions • Festivals • Vibes • Price Caps</p>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)', alignItems: 'center' }}>
            <div style={{ order: 2 }}>
              <span style={{ font: '600 var(--text-xs) var(--font-mono)', color: 'var(--theme-primary)', background: 'var(--theme-primary-light)', padding: 'var(--space-1) var(--space-3)', borderRadius: 'var(--radius-full)', textTransform: 'uppercase' }}>
                Step 02
              </span>
              <h2 style={{ font: '700 var(--text-2xl) var(--font-display)', color: 'var(--theme-text-primary)', margin: 'var(--space-3) 0 var(--space-4)' }}>
                Read the &quot;Why It&apos;s Great&quot; Bullets
              </h2>
              <p style={{ font: 'var(--text-base)/var(--leading-relaxed) var(--font-body)', color: 'var(--theme-text-secondary)', lineHeight: '1.7' }}>
                Every single item in our catalog features handpicked highlights detailing the materials, target audience, and gifting appeal. You immediately learn what makes the product special, saving you from reading hundreds of generic comments or reviews.
              </p>
            </div>
            <div style={{ order: 1, padding: 'var(--space-8)', background: 'var(--theme-bg-elevated)', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ font: '600 var(--text-base) var(--font-display)', color: 'var(--theme-text-primary)', marginBottom: 'var(--space-3)' }}>✨ Highlight Summary</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <li style={{ fontSize: 'var(--text-sm)', color: 'var(--theme-text-secondary)', paddingLeft: 'var(--space-4)', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--theme-primary)' }}>✓</span> Full-grain leather craftsmanship.
                </li>
                <li style={{ fontSize: 'var(--text-sm)', color: 'var(--theme-text-secondary)', paddingLeft: 'var(--space-4)', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--theme-primary)' }}>✓</span> Handblown glass accents.
                </li>
                <li style={{ fontSize: 'var(--text-sm)', color: 'var(--theme-text-secondary)', paddingLeft: 'var(--space-4)', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--theme-primary)' }}>✓</span> Includes keepsake giftbox.
                </li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)', alignItems: 'center' }}>
            <div>
              <span style={{ font: '600 var(--text-xs) var(--font-mono)', color: 'var(--theme-primary)', background: 'var(--theme-primary-light)', padding: 'var(--space-1) var(--space-3)', borderRadius: 'var(--radius-full)', textTransform: 'uppercase' }}>
                Step 03
              </span>
              <h2 style={{ font: '700 var(--text-2xl) var(--font-display)', color: 'var(--theme-text-primary)', margin: 'var(--space-3) 0 var(--space-4)' }}>
                View & Complete on Amazon
              </h2>
              <p style={{ font: 'var(--text-base)/var(--leading-relaxed) var(--font-body)', color: 'var(--theme-text-secondary)', lineHeight: '1.7' }}>
                Once you find a gift you like, click the primary call to action. We redirect you directly to the product page on Amazon.in. You buy securely under Amazon&apos;s standard storefront using your existing delivery details, prime benefits, and payment credentials.
              </p>
            </div>
            <div style={{ padding: 'var(--space-8)', background: 'var(--theme-bg-elevated)', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>📦</div>
              <p style={{ font: '500 var(--text-sm) var(--font-mono)', color: 'var(--theme-text-primary)' }}>Direct Redirection • Amazon Prime Enabled</p>
            </div>
          </div>

          {/* Bottom Callout */}
          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link href="/search" className="btn-primary" style={{ padding: 'var(--space-3) var(--space-8)', fontSize: 'var(--text-base)' }}>
              Start Discovering Gifts
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
