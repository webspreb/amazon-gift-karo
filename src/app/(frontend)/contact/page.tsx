import React from 'react';
import { ContactForm } from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us — GiftKaro',
  description: 'Reach out to the GiftKaro team for curation suggestions, advertising, or general inquiries.',
};

export default function ContactPage() {
  return (
    <div>
      {/* Hero Header */}
      <section className="search-hero" data-od-id="contact-hero">
        <div className="container">
          <span className="search-hero-eyebrow">Get in touch</span>
          <h1 className="search-hero-title">Contact Our Team</h1>
          <p className="search-hero-desc">
            Have questions about our recommendations? Interested in partnering with us? Drop us a line below.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <main className="container" style={{ padding: 'var(--space-12) 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-8)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-8)' }}>
            
            {/* Left: Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div>
                <h2 style={{ font: '700 var(--text-2xl) var(--font-display)', color: 'var(--theme-text-primary)', marginBottom: 'var(--space-2)' }}>
                  How Can We Help?
                </h2>
                <p style={{ font: 'var(--text-sm)/var(--leading-relaxed) var(--font-body)', color: 'var(--theme-text-secondary)' }}>
                  We are always looking to improve our database of curated items. If you are an artisan, manufacturer, or shopkeeper with products listed on Amazon.in, let us know!
                </p>
              </div>

              {/* Info Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div style={{ padding: 'var(--space-4)', background: 'var(--theme-bg-card)', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-md)' }}>
                  <h3 style={{ font: '600 var(--text-sm) var(--font-display)', color: 'var(--theme-text-primary)', marginBottom: 'var(--space-1)' }}>📨 Email Inquiries</h3>
                  <p style={{ font: 'var(--text-sm) var(--font-mono)', color: 'var(--theme-primary)' }}>support@giftkaro.in</p>
                </div>
                <div style={{ padding: 'var(--space-4)', background: 'var(--theme-bg-card)', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-md)' }}>
                  <h3 style={{ font: '600 var(--text-sm) var(--font-display)', color: 'var(--theme-text-primary)', marginBottom: 'var(--space-1)' }}>🏢 Curation Office</h3>
                  <p style={{ font: 'var(--text-sm)/var(--leading-normal) var(--font-body)', color: 'var(--theme-text-secondary)' }}>New Delhi, Delhi NCR, India</p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div style={{ padding: 'var(--space-6)', background: 'var(--theme-bg-card)', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--elev-1)' }}>
              <ContactForm />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
