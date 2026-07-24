# Amazon Affiliate Gift Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a gift recommendation website for Amazon India that looks like an ecommerce storefront but links out to Amazon.in via affiliate links — no checkout, no cart.

**Architecture:** Next.js 14 static site with App Router, content stored as markdown files in `/content/gifts/`, seasonal theming via config, deployed on Vercel free tier. Each gift entry is tagged by festival, occasion, relationship, and vibe for multi-category browsing.

**Tech Stack:** Next.js 14+ (App Router, TypeScript), Tailwind CSS, Vercel (deployment), markdown content files, date-fns (for seasonal date checks)

## Global Constraints

- All prices in INR (₹)
- No checkout, no cart, no payment processing
- Every "buy" button must link to Amazon.in with affiliate tag
- Affiliate disclosure ("As an Amazon Associate, I earn from qualifying purchases") required on every page
- Mobile-first responsive design (primary traffic from mobile in India)
- No hardcoded product prices — only price ranges (e.g., "Under ₹1,000", "₹1,000–₹2,500")
- Amazon affiliate tag must be configurable via environment variable

---

### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `.env.local.example`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`

**Interfaces:**
- Consumes: nothing (initial setup)
- Produces: runnable Next.js dev server with Tailwind, project structure

- [ ] **Step 1: Initialize Next.js project**

Run in project root:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

- [ ] **Step 2: Create `.env.local.example`**

```
NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=your-tag-21
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- [ ] **Step 3: Configure `next.config.js`**

Enable static exports if desired, and image domains for Amazon images:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images-eu.ssl-images-amazon.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
    ],
  },
};
module.exports = nextConfig;
```

- [ ] **Step 4: Set up folder structure**

Create directories:
```
src/
  components/
  lib/
  content/
    gifts/
  app/
    festivals/[slug]/
    occasions/[slug]/
    relationships/[slug]/
    vibes/[slug]/
    gift/[slug]/
```

- [ ] **Step 5: Create global CSS with Tailwind directives in `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 6: Create root layout (`src/app/layout.tsx`)**

Basic HTML shell with metadata for Indian market:
```tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GiftKaro — Unique Gift Ideas for Every Occasion',
  description: 'Discover thoughtful, unexpected gift ideas for Indian festivals, birthdays, anniversaries and more. Curated picks for every budget.',
};
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```
Expected: Server starts on localhost:3000 with blank Tailwind-styled page.

- [ ] **Step 8: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js project with Tailwind and App Router"
```

---

### Task 2: Content Schema & Gift Data Layer

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/gifts.ts`
- Create: `src/content/gifts/diwali-tea-set.md`
- Create: `src/content/gifts/anniversary-photo-frame.md`
- Create: `src/content/gifts/romantic-candle-set.md`

**Interfaces:**
- Consumes: Task 1 folder structure
- Produces: `GiftEntry` type, `getAllGifts()`, `getGiftsByCategory()`, `getGiftBySlug()`

- [ ] **Step 1: Define TypeScript types in `src/lib/types.ts`**

```ts
export type GiftCategory = 'festival' | 'occasion' | 'relationship' | 'vibe';

export interface GiftEntry {
  slug: string;
  title: string;
  description: string;
  priceRange: string;
  imageUrl: string;
  amazonLink: string;
  categories: {
    festivals?: string[];
    occasions?: string[];
    relationships?: string[];
    vibes?: string[];
  };
  publishedDate: string;
  seasonalFlag?: string;
  whyItsGreat: string[];
}
```

- [ ] **Step 2: Create utility functions in `src/lib/gifts.ts`**

```ts
import { GiftEntry } from './types';

const giftFiles = require.context('../content/gifts', false, /\.md$/);

export function getAllGifts(): GiftEntry[] { ... }
export function getGiftBySlug(slug: string): GiftEntry | undefined { ... }
export function getGiftsByFestival(festival: string): GiftEntry[] { ... }
export function getGiftsByOccasion(occasion: string): GiftEntry[] { ... }
export function getGiftsByRelationship(rel: string): GiftEntry[] { ... }
export function getGiftsByVibe(vibe: string): GiftEntry[] { ... }
export function getNewArrivals(count: number): GiftEntry[] { ... }
export function getTrendingGifts(count: number): GiftEntry[] { ... }
```

- [ ] **Step 3: Create sample gift markdown files**

`src/content/gifts/diwali-tea-set.md`:
```md
---
slug: terracotta-tea-set
title: "Terracotta Tea Set — Handcrafted in Jaipur"
description: "A beautiful handcrafted terracotta tea set that brings the warmth of Rajasthan to any home. Perfect for Diwali gatherings."
priceRange: "₹1,200 – ₹1,800"
imageUrl: "/images/tea-set.jpg"
amazonLink: "https://amazon.in/dp/XXXX?tag=PLACEHOLDER"
categories:
  festivals: [diwali]
  occasions: [housewarming]
  relationships: [for-parents, for-couple]
  vibes: [traditional, sentimental]
publishedDate: "2026-07-01"
whyItsGreat:
  - "Handcrafted by artisans from Jaipur"
  - "Eco-friendly and unique"
  - "Comes in a beautiful gift box"
```

- [ ] **Step 4: Repeat for 2 more sample files** (anniversary-photo-frame.md, romantic-candle-set.md) covering different categories.

- [ ] **Step 5: Write tests for gift loading functions**

```ts
import { getAllGifts, getGiftsByFestival } from '@/lib/gifts';

test('loads all gifts', () => {
  const gifts = getAllGifts();
  expect(gifts.length).toBeGreaterThan(0);
});
```

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add gift content model, data layer, and sample entries"
```

---

### Task 3: Core UI Components

**Files:**
- Create: `src/components/GiftCard.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/CategoryGrid.tsx`
- Create: `src/components/SeasonalHero.tsx`

**Interfaces:**
- Consumes: `GiftEntry` type from Task 2
- Produces: Reusable UI components used by all pages

- [ ] **Step 1: Build `GiftCard` component**

```tsx
interface GiftCardProps {
  gift: GiftEntry;
}
```
Displays: image, title, price range, category badges, "View on Amazon" button (opens in new tab). Responsive — 1 column mobile, 2-3 columns desktop.

- [ ] **Step 2: Build `Header` component**

Navigation bar with: site logo/name, links to major festival/occasion categories, mobile hamburger menu. Accepts `theme` prop for seasonal color changes.

- [ ] **Step 3: Build `Footer` component**

Contains: site description, "As an Amazon Associate, I earn from qualifying purchases" disclosure, links to about/privacy/contact pages (placeholder).

- [ ] **Step 4: Build `CategoryGrid` component**

Grid of category cards linking to /festivals/[slug], /occasions/[slug], etc. Each card has an icon/image and label.

- [ ] **Step 5: Build `SeasonalHero` component**

Full-width hero banner with seasonal background, title, subtitle, and CTA button. Accepts `season` prop to switch visuals.

- [ ] **Step 6: Wire into root layout**

Update `src/app/layout.tsx` to include Header and Footer around `{children}`.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add core UI components — GiftCard, Header, Footer, CategoryGrid, SeasonalHero"
```

---

### Task 4: Homepage

**Files:**
- Create: `src/app/page.tsx`

**Interfaces:**
- Consumes: `getAllGifts()`, `getNewArrivals()`, `getTrendingGifts()`, `SeasonalHero`, `GiftCard`, `CategoryGrid`
- Produces: Public homepage at `/`

- [ ] **Step 1: Design homepage sections**

```
[Seasonal Hero Banner — e.g., "Diwali Gift Guide 2026"]
[New This Week — horizontal scroll of GiftCards]
[Shop by Festival — CategoryGrid]
[Trending Gifts — grid of GiftCards]
[Browse by Vibe — CategoryGrid for vibes]
```

- [ ] **Step 2: Implement data loading**

```ts
const newArrivals = getNewArrivals(6);
const trendingGifts = getTrendingGifts(8);
const festivals = ['diwali', 'holi', 'raksha-bandhan', 'christmas', 'eid'];
const vibes = ['romantic', 'sentimental', 'unique', 'funny', 'luxury', 'budget-friendly'];
```

- [ ] **Step 3: Render all sections responsively**

- [ ] **Step 4: Check homepage renders correctly**

```bash
npm run dev
```
Visit `http://localhost:3000/` — verify all sections visible, links work.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: build homepage with seasonal hero, new arrivals, categories, trending"
```

---

### Task 5: Category & Festival Pages

**Files:**
- Create: `src/app/festivals/[slug]/page.tsx`
- Create: `src/app/occasions/[slug]/page.tsx`
- Create: `src/app/relationships/[slug]/page.tsx`
- Create: `src/app/vibes/[slug]/page.tsx`
- Modify: `src/lib/gifts.ts` (add any missing filter functions)

**Interfaces:**
- Consumes: `getGiftsByFestival()`, `getGiftsByOccasion()`, etc.
- Produces: Dynamic category pages like `/festivals/diwali`, `/occasions/birthday`

- [ ] **Step 1: Create festivals dynamic route**

```tsx
// src/app/festivals/[slug]/page.tsx
export async function generateStaticParams() {
  return [
    { slug: 'diwali' },
    { slug: 'holi' },
    { slug: 'raksha-bandhan' },
    { slug: 'christmas' },
    { slug: 'eid' },
  ];
}
```

Page shows: festival-specific hero banner, gift grid filtered by `categories.festivals` array.

- [ ] **Step 2: Create occasions dynamic route**

Same pattern for `/occasions/birthday`, `/occasions/anniversary`, `/occasions/wedding`, `/occasions/housewarming`.

- [ ] **Step 3: Create relationships dynamic route**

Same pattern for `/relationships/for-her`, `/relationships/for-him`, `/relationships/for-parents`, `/relationships/for-couple`.

- [ ] **Step 4: Create vibes dynamic route**

Same pattern for `/vibes/romantic`, `/vibes/sentimental`, `/vibes/unique`, `/vibes/funny`, `/vibes/luxury`, `/vibes/budget-friendly`.

- [ ] **Step 5: Verify all category pages render**

```bash
npm run dev
```
Visit several category pages, confirm correct gift filtering.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add dynamic category pages for festivals, occasions, relationships, vibes"
```

---

### Task 6: Individual Gift Detail Page

**Files:**
- Create: `src/app/gift/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getGiftBySlug()`, `getGiftsByVibe()` (for related gifts)
- Produces: Gift detail page at `/gift/terracotta-tea-set`

- [ ] **Step 1: Generate static params**

```ts
export async function generateStaticParams() {
  const gifts = getAllGifts();
  return gifts.map(g => ({ slug: g.slug }));
}
```

- [ ] **Step 2: Build the page layout**

```
[Back to category link]
[Large product image]
[Title]
[Price range]
[Description — 2-3 lines]
[Why It's Great — bullet list]
[Category tags as links]
["View on Amazon ₹ →" button — prominent, opens in new tab]
[Affiliate disclosure]
[Related Gifts — same vibe/occasion]
```

- [ ] **Step 3: Render "View on Amazon" button**

Button links to `gift.amazonLink` with `target="_blank" rel="noopener noreferrer"`. Styled as a primary CTA (e.g., orange/amber to match Amazon brand).

- [ ] **Step 4: Add related gifts section**

Show 3-4 gifts with same vibe tag below the main gift.

- [ ] **Step 5: Verify gift pages render**

```bash
npm run dev
```
Visit `/gift/terracotta-tea-set` — verify layout, content, and Amazon link formatting.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add gift detail page with Amazon CTA and related gifts"
```

---

### Task 7: Seasonal Theme System

**Files:**
- Create: `src/lib/themes.ts`
- Create: `src/config/seasons.ts`
- Modify: `src/components/Header.tsx` (accept `theme` colors)
- Modify: `src/components/SeasonalHero.tsx` (use theme data)
- Modify: `src/app/layout.tsx` (compute active season)

**Interfaces:**
- Consumes: date-fns, `getAllGifts()` seasonal flags
- Produces: Auto-switching theme based on current date

- [ ] **Step 1: Create season configuration**

```ts
export interface SeasonTheme {
  key: string;
  label: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  colors: {
    primary: string;    // e.g., 'orange-600'
    secondary: string;  // e.g., 'amber-400'
    bg: string;         // e.g., 'from-orange-50 to-amber-50'
    text: string;       // e.g., 'text-orange-900'
  };
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
}

export const seasons: SeasonTheme[] = [
  {
    key: 'diwali',
    label: 'Diwali',
    startMonth: 10, startDay: 15,
    endMonth: 11, endDay: 5,
    colors: { primary: 'orange-600', secondary: 'amber-400', bg: 'from-orange-50 to-amber-50', text: 'text-orange-900' },
    heroTitle: 'Diwali Gift Guide 2026',
    heroSubtitle: 'Find the perfect diya, sweets, and gifts for your loved ones',
    heroImage: '/heroes/diwali.jpg',
  },
  // ... valentine, christmas, etc.
];
```

- [ ] **Step 2: Build theme detection function**

```ts
export function getActiveSeason(): SeasonTheme | null {
  const now = new Date();
  return seasons.find(s => {
    const start = new Date(now.getFullYear(), s.startMonth - 1, s.startDay);
    const end = new Date(now.getFullYear(), s.endMonth - 1, s.endDay);
    return now >= start && now <= end;
  }) ?? null;
}
```

- [ ] **Step 3: Wire theme into Header and SeasonalHero**

In `layout.tsx`, call `getActiveSeason()` and pass theme to Header (for nav colors) and SeasonalHero (for banner content).

- [ ] **Step 4: Test date-based switching**

Temporarily adjust system dates or mock dates to verify Diwali, Valentine's, etc. themes activate correctly.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add seasonal theme system with auto-activation by date"
```

---

### Task 8: Search & Filtering

**Files:**
- Create: `src/app/search/page.tsx`
- Create: `src/components/SearchBar.tsx`
- Create: `src/components/FilterPanel.tsx`
- Modify: `src/lib/gifts.ts` (add search/filter functions)

**Interfaces:**
- Consumes: `getAllGifts()`
- Produces: Search page at `/search?q=keyword&occasion=birthday&vibe=romantic`

- [ ] **Step 1: Build search utility**

```ts
export function searchGifts(query: string): GiftEntry[] { ... }
export function filterGifts(filters: { festival?: string; occasion?: string; vibe?: string; maxPrice?: number }): GiftEntry[] { ... }
```

- [ ] **Step 2: Build SearchBar component**

Text input with search icon. On submit, navigates to `/search?q=...`.

- [ ] **Step 3: Build FilterPanel component**

Sidebar/flyout with: occasion dropdown, vibe tags, price range selector ("Under ₹500", "₹500–₹1,000", "₹1,000–₹2,500", etc.). Each filter updates URL search params.

- [ ] **Step 4: Build search results page**

Reads `searchParams` from URL, calls search/filter functions, renders gift grid or "No results found" message.

- [ ] **Step 5: Add SearchBar to Header**

Insert SearchBar in the navigation bar.

- [ ] **Step 6: Verify search and filters work**

```bash
npm run dev
```
Test: `/search?q=tea`, `/search?occasion=birthday&vibe=sentimental`.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add search and multi-filter system"
```

---

### Task 9: Affiliate Compliance & SEO

**Files:**
- Create: `src/components/AffiliateDisclosure.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: `src/app/layout.tsx` (add disclosure, meta)
- Modify: `src/components/Footer.tsx` (add disclosure)

**Interfaces:**
- Consumes: site metadata config, `getAllGifts()`
- Produces: Compliant affiliate site with SEO foundation

- [ ] **Step 1: Build affiliate disclosure component**

```tsx
export function AffiliateDisclosure() {
  return (
    <p className="text-xs text-gray-500 mt-8">
      As an Amazon Associate, I earn from qualifying purchases.
    </p>
  );
}
```
Add to: Footer, gift detail page, bottom of homepage.

- [ ] **Step 2: Add disclosure to layout**

Ensure disclosure appears on every page via layout or Footer.

- [ ] **Step 3: Configure affiliate tag**

In `.env.local`:
```
NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=your-tag-21
```
In `src/lib/affiliate.ts`:
```ts
export function buildAmazonLink(baseUrl: string): string {
  const tag = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG;
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}tag=${tag}`;
}
```

- [ ] **Step 4: Generate sitemap**

`src/app/sitemap.ts`: Include all static category pages and all gift detail pages.

- [ ] **Step 5: Create robots.ts**

Allow all crawlers, point to sitemap.

- [ ] **Step 6: Add meta tags for social sharing**

Open Graph and Twitter Card tags in layout metadata for each page.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add affiliate compliance, disclosure, sitemap, and SEO meta tags"
```

---

### Task 10: Deployment to Vercel

**Files:**
- Create: `vercel.json` (if needed)
- Modify: `.env.local.example` (update for production)

**Interfaces:**
- Consumes: entire codebase
- Produces: Live production site on Vercel

- [ ] **Step 1: Push to GitHub**

Create a GitHub repository and push:
```bash
git remote add origin https://github.com/yourusername/amazon-gift-site.git
git push -u origin main
```

- [ ] **Step 2: Import to Vercel**

Go to vercel.com, import the GitHub repo, set environment variables:
- `NEXT_PUBLIC_AMAZON_AFFILIATE_TAG` = your actual Amazon India affiliate tag
- `NEXT_PUBLIC_SITE_URL` = your production URL

- [ ] **Step 3: Configure custom domain (optional)**

Point domain to Vercel nameservers, add domain in Vercel dashboard.

- [ ] **Step 4: Verify production build**

```bash
npm run build
```
Ensure no errors, static pages generated correctly.

- [ ] **Step 5: Test live site**

Visit the production URL. Verify all pages render, affiliate links work, disclosure visible, mobile responsive.

- [ ] **Step 6: Commit any final config**

```bash
git add vercel.json
git commit -m "chore: configure Vercel deployment"
git push
```
