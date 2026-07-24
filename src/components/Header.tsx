'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  theme?: {
    primary: string;
    secondary: string;
  };
}

export function Header({ theme }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const primaryColor = theme?.primary ?? 'amber-600';

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/festivals/diwali', label: 'Festivals' },
    { href: '/occasions/birthday', label: 'Occasions' },
    { href: '/vibes/romantic', label: 'Romantic' },
    { href: '/vibes/sentimental', label: 'Sentimental' },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className={`text-xl font-bold text-${primaryColor}`}>
          CuratedGift
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t md:hidden">
          <nav className="space-y-1 px-4 py-3">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-amber-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
