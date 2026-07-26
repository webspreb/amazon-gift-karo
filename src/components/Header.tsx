'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('giftkaro-theme') || 'default';
    }
    return 'default';
  });
  const pathname = usePathname();

  // Close mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }

  // Handle Escape key to close mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  // Handle theme cycle
  const handleThemeToggle = () => {
    const themes = ['default', 'diwali', 'christmas', 'valentines'];
    const nextIndex = (themes.indexOf(activeTheme) + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    setActiveTheme(nextTheme);
    localStorage.setItem('giftkaro-theme', nextTheme);

    if (nextTheme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.dataset.theme = nextTheme;
    }

    // Trigger custom event or sync layout variables if needed
    const event = new CustomEvent('themechange', { detail: nextTheme });
    window.dispatchEvent(event);
  };

  const navLinks = [
    { href: '/festivals/diwali', label: 'Diwali' },
    { href: '/festivals/christmas', label: 'Christmas' },
    { href: '/festivals/valentines', label: "Valentine's" },
    { href: '/search', label: 'Browse All' },
  ];

  return (
    <>
      <header className="header" role="banner" data-od-id="header">
        <div className="container header-inner">
          <Link href="/" className="logo" aria-label="GiftKaro Home" data-od-id="logo">
            <span className="logo-mark" aria-hidden="true">🎁</span>
            <span>GiftKaro</span>
          </Link>

          <nav className="nav" role="navigation" aria-label="Main navigation" data-od-id="nav">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button
              onClick={handleThemeToggle}
              className="theme-toggle-btn"
              id="themeToggle"
              aria-label="Switch theme"
              data-od-id="theme-toggle"
            >
              <span aria-hidden="true">🎨</span>
              <span className="capitalize">{activeTheme === 'default' ? 'Theme' : activeTheme}</span>
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="mobile-menu-btn"
              id="mobileMenuBtn"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobileMenu"
              data-od-id="menu-btn"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`mobile-menu ${mobileOpen ? 'open' : ''}`}
        id="mobileMenu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        data-od-id="mobile-menu"
      >
        <div
          className="mobile-menu-backdrop"
          id="mobileMenuBackdrop"
          onClick={() => setMobileOpen(false)}
          data-od-id="mobile-menu-backdrop"
        />
        <div className="mobile-menu-panel">
          <div className="mobile-menu-header">
            <span className="logo" style={{ fontSize: 'var(--text-lg)' }}>
              🎁 GiftKaro
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="mobile-menu-close"
              id="mobileMenuClose"
              aria-label="Close menu"
              data-od-id="mobile-menu-close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="mobile-nav" role="navigation" aria-label="Mobile navigation" data-od-id="mobile-nav">
            <Link href="/festivals/diwali" className="mobile-nav-link">
              Diwali Gifts
            </Link>
            <Link href="/festivals/christmas" className="mobile-nav-link">
              Christmas Gifts
            </Link>
            <Link href="/festivals/valentines" className="mobile-nav-link">
              Valentine&apos;s Gifts
            </Link>
            <Link href="/search" className="mobile-nav-link">
              Browse All Gifts
            </Link>
            <Link href="/search?vibe=minimal" className="mobile-nav-link">
              Minimal Vibes
            </Link>
            <Link href="/search?vibe=luxury" className="mobile-nav-link">
              Luxury Picks
            </Link>
            <Link href="/search?relationship=for-parents" className="mobile-nav-link">
              For Parents
            </Link>
            <Link href="/search?relationship=for-couple" className="mobile-nav-link">
              For Couple
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
