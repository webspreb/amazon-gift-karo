import React from 'react';

export const metadata = {
  title: 'Privacy Policy & Disclosures — GiftKaro',
  description: 'Read the privacy policy, cookie details, and Amazon Affiliate disclosure statement for GiftKaro.',
};

export default function PrivacyPage() {
  return (
    <div>
      {/* Hero Header */}
      <section className="search-hero" data-od-id="privacy-hero">
        <div className="container">
          <span className="search-hero-eyebrow">Legal & Disclosure</span>
          <h1 className="search-hero-title">Privacy Policy</h1>
          <p className="search-hero-desc">
            We value your trust. Learn how we handle information and explain our affiliate relationship with Amazon.
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <main className="container" style={{ padding: 'var(--space-12) 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <section>
            <h2 style={{ font: '600 var(--text-xl) var(--font-display)', color: 'var(--theme-text-primary)', marginBottom: 'var(--space-3)' }}>
              1. Amazon Affiliate Disclosure
            </h2>
            <p style={{ font: 'var(--text-sm)/var(--leading-relaxed) var(--font-body)', color: 'var(--theme-text-secondary)', marginBottom: 'var(--space-2)' }}>
              GiftKaro is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in.
            </p>
            <p style={{ font: 'var(--text-sm)/var(--leading-relaxed) var(--font-body)', color: 'var(--theme-text-secondary)' }}>
              This means that whenever you click on an outbound link pointing to a product on Amazon.in and make a purchase, we receive a small commission from Amazon at absolutely no extra cost to you. These earnings support the upkeep and curation research of the website.
            </p>
          </section>

          <section>
            <h2 style={{ font: '600 var(--text-xl) var(--font-display)', color: 'var(--theme-text-primary)', marginBottom: 'var(--space-3)' }}>
              2. Data We Collect
            </h2>
            <p style={{ font: 'var(--text-sm)/var(--leading-relaxed) var(--font-body)', color: 'var(--theme-text-secondary)', marginBottom: 'var(--space-2)' }}>
              <strong>We do not run transaction checkouts.</strong> We do not ask for, process, or store credit card details, billing addresses, or user accounts. All shipping logistics, payments, and account security are handled strictly on the Amazon.in platform.
            </p>
            <p style={{ font: 'var(--text-sm)/var(--leading-relaxed) var(--font-body)', color: 'var(--theme-text-secondary)' }}>
              We only collect standard anonymous web telemetry (e.g. page view counts, theme choice preferences, category clicks) to optimize performance, track referral metrics, and analyze user engagement.
            </p>
          </section>

          <section>
            <h2 style={{ font: '600 var(--text-xl) var(--font-display)', color: 'var(--theme-text-primary)', marginBottom: 'var(--space-3)' }}>
              3. Cookies Policy
            </h2>
            <p style={{ font: 'var(--text-sm)/var(--leading-relaxed) var(--font-body)', color: 'var(--theme-text-secondary)' }}>
              We use small browser cookies to store settings such as your active seasonal theme selection inside local storage, and standard Amazon affiliate cookies to track qualifying orders within their 24-hour cookie window. You can adjust your browser cookie settings at any time to block cookie generation.
            </p>
          </section>

          <section style={{ borderTop: '1px solid var(--theme-border)', paddingTop: 'var(--space-6)', marginTop: 'var(--space-4)' }}>
            <p style={{ font: 'var(--text-xs) var(--font-body)', color: 'var(--theme-text-muted)' }}>
              Last Updated: July 2026. For questions regarding our policies, please contact support@giftkaro.in.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
