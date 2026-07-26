import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found — GiftKaro',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-12) var(--space-4)' }}>
      <div style={{ textAlign: 'center', maxWidth: '440px' }}>
        
        {/* Visual Vector Icon */}
        <div style={{
          width: '96px',
          height: '96px',
          margin: '0 auto var(--space-6)',
          background: 'var(--theme-primary-light)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--theme-primary)'
        }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>

        <h1 style={{ font: '700 var(--text-3xl) var(--font-display)', color: 'var(--theme-text-primary)', marginBottom: 'var(--space-2)' }}>
          Gifts Not Found
        </h1>
        <p style={{ font: 'var(--text-base)/var(--leading-relaxed) var(--font-body)', color: 'var(--theme-text-secondary)', marginBottom: 'var(--space-8)' }}>
          Sorry, we couldn&apos;t find the page you are looking for. It might have been moved, renamed, or no longer exists.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
          <Link href="/" className="btn-primary" style={{ padding: 'var(--space-3) var(--space-6)', fontSize: 'var(--text-sm)', textDecoration: 'none' }}>
            Go to Homepage
          </Link>
          <Link href="/search" className="clear-all" style={{ font: '600 var(--text-sm) var(--font-body)', border: '1px solid var(--theme-border)', padding: 'var(--space-3) var(--space-6)', borderRadius: 'var(--radius-md)' }}>
            Search Catalog
          </Link>
        </div>

      </div>
    </div>
  );
}
