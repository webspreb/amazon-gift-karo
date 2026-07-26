'use client';

import Link from 'next/link';
import React, { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <>
      {/* Newsletter */}
      <section className="newsletter" aria-labelledby="newsletter-title" data-od-id="newsletter">
        <div className="container">
          <div className="newsletter-inner">
            <h2 id="newsletter-title" className="newsletter-title" data-od-id="newsletter-title">
              Get Gift Ideas Delivered
            </h2>
            <p className="newsletter-desc" data-od-id="newsletter-desc">
              Weekly curations, seasonal guides, and exclusive finds. No spam, just thoughtful gifting inspiration.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form" id="newsletterForm" data-od-id="newsletter-form">
              <label htmlFor="newsletterEmail" className="visually-hidden">Email address</label>
              <input
                type="email"
                id="newsletterEmail"
                className="newsletter-input"
                placeholder="Enter your email"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                suppressHydrationWarning
                data-od-id="newsletter-input"
              />
              <button
                type="submit"
                className="btn-primary newsletter-btn"
                style={subscribed ? { background: 'var(--theme-success)' } : undefined}
                data-od-id="newsletter-btn"
              >
                {subscribed ? 'Subscribed! 🎉' : 'Subscribe →'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" role="contentinfo" data-od-id="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand" data-od-id="footer-brand">
              <div className="footer-logo" data-od-id="footer-logo">🎁 GiftKaro</div>
              <p className="footer-desc" data-od-id="footer-desc">
                Curated gift discovery for every occasion. We help you find thoughtful, unique gifts — no cart, no checkout, just click through to Amazon.
              </p>
            </div>
            <nav aria-label="Festival gifts" data-od-id="footer-festivals">
              <h3 className="footer-heading" data-od-id="footer-festivals-title">Festivals</h3>
              <ul className="footer-links" data-od-id="footer-festivals-links">
                <li><Link href="/festivals/diwali" className="footer-link">Diwali</Link></li>
                <li><Link href="/festivals/christmas" className="footer-link">Christmas</Link></li>
                <li><Link href="/festivals/valentines" className="footer-link">Valentine&apos;s Day</Link></li>
                <li><Link href="/festivals/holi" className="footer-link">Holi</Link></li>
                <li><Link href="/festivals/eid" className="footer-link">Eid</Link></li>
                <li><Link href="/festivals/raksha-bandhan" className="footer-link">Raksha Bandhan</Link></li>
              </ul>
            </nav>
            <nav aria-label="Occasions" data-od-id="footer-occasions">
              <h3 className="footer-heading" data-od-id="footer-occasions-title">Occasions</h3>
              <ul className="footer-links" data-od-id="footer-occasions-links">
                <li><Link href="/occasions/birthday" className="footer-link">Birthday</Link></li>
                <li><Link href="/occasions/anniversary" className="footer-link">Anniversary</Link></li>
                <li><Link href="/occasions/housewarming" className="footer-link">Housewarming</Link></li>
                <li><Link href="/occasions/wedding" className="footer-link">Wedding</Link></li>
                <li><Link href="/occasions/baby-shower" className="footer-link">Baby Shower</Link></li>
                <li><Link href="/occasions/graduation" className="footer-link">Graduation</Link></li>
              </ul>
            </nav>
            <nav aria-label="Vibes" data-od-id="footer-vibes">
              <h3 className="footer-heading" data-od-id="footer-vibes-title">Information</h3>
              <ul className="footer-links" data-od-id="footer-vibes-links">
                <li><Link href="/about" className="footer-link">About Us</Link></li>
                <li><Link href="/how-it-works" className="footer-link">How It Works</Link></li>
                <li><Link href="/contact" className="footer-link">Contact Us</Link></li>
                <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
              </ul>
            </nav>
          </div>
          <div className="footer-bottom" data-od-id="footer-bottom">
            <p className="footer-disclosure" data-od-id="footer-disclosure">
              As an Amazon Associate, I earn from qualifying purchases
            </p>
            <p className="footer-copyright" data-od-id="footer-copyright">
              © 2026 GiftKaro. Not affiliated with Amazon.in. All product links are affiliate links.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
