# GiftKaro Curated Gift Platform — Design Brief & Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a comprehensive PRD-style design brief for GiftKaro — an editorial-first, **cartless and checkout-free** gift discovery engine targeting Amazon India market with dynamic seasonal theming and affiliate-driven monetization.

**Architecture:** Multi-page responsive web application (Homepage, Gift Detail, Search/Filter) with dynamic theme switching based on calendar dates. **No cart, no checkout, no payment flow** — every CTA is an immediate redirect to Amazon.in via affiliate links. Built mobile-first for Indian market (80%+ mobile traffic from Instagram/Pinterest).

**Files Implemented:** `homepage.html`, `gift-detail.html`, `search.html`, `components.html`, `theme-tokens.css`, `category.html`, `about.html`, `how-it-works.html`, `contact.html`, `privacy.html`, `404.html`

**Tech Stack:** Vanilla HTML/CSS/JS (or React if SPA), CSS custom properties for theming, IntersectionObserver for lazy loading, localStorage for theme persistence, no backend required (static content + affiliate links).

---

## Global Constraints

| Constraint | Value |
|------------|-------|
| **Target Market** | India (Amazon.in affiliate program) |
| **Primary Traffic** | Mobile-first (80%+ from social: Instagram, Pinterest) |
| **Cart/Checkout** | **None** — this is a cartless, checkout-free platform. Every CTA redirects immediately to Amazon.in. |
| **Pricing Display** | Price ranges only (e.g., ₹1,000 – ₹2,500) |
| **Legal Disclosure** | "As an Amazon Associate, I earn from qualifying purchases" on every page |
| **Theme System** | 4 seasonal themes auto-switching by calendar date |
| **Touch Targets** | Minimum 44×44px (WCAG AAA) |
| **Breakpoints** | 375 / 600 / 768 / 960 / 1280 / 1920px |
| **Performance** | Fast loading, lazy images, minimal JS |

---

## 1. Page Structures & Component Requirements

### 1.1 Page A: Homepage (`/`)

**Purpose:** Establish editorial gift-guide feel, drive exploration via category entry points.

| Section | Components | Notes |
|---------|------------|-------|
| **Seasonal Hero** | Dynamic gradient background, H1 headline, subtitle, "Explore Gifts" CTA (ghost button on dark, primary on light) | Background gradient + hero illustration swap per theme; H1 uses clamp(32px, 5vw, 56px) |
| **New This Week** | Grid of GiftCard components (3–4 columns desktop, 1–2 mobile) | Editorial cards: image (16:9), title, subtitle, price range, "Why It's Great" preview (1 line) |
| **Browse by Category** | Three CategoryGrid sections: Festivals, Occasions, Vibes | Each grid: icon/pattern card + label (uppercase Body-Font), click navigates to filtered listing |
| **Footer** | Affiliate disclosure, newsletter signup (email input + amber CTA), navigation links | Dark surface (#303030); disclosure in text-xs muted |

**Component Inventory — Homepage:**
- `HeroSection` — seasonal background, headline, CTA
- `GiftCard` — image, title, subtitle, price range, preview bullets
- `CategoryGrid` — icon card + label, hover/tap states
- `NewsletterForm` — email input, submit button (theme accent)
- `Footer` — disclosure, links, newsletter

---

### 1.2 Page B: Gift Detail Page (`gift-detail.html`)

**Purpose:** Highest-converting page — present curated editorial content to drive Amazon click-through.

**Layout Structure (Desktop):**
```
+------------------------------------------------------------------+
| [Home / Category / Gift Name]  (standard breadcrumb)             |
|                                                                  |
|  [Product Image: 60%]     [Content Panel: 40%]                   |
|  - 4:5 aspect ratio         - Subtitle (uppercase)              |
|  - Full bleed, no radius    - Title (display, 3xl)              |
|                             - Price Range (theme accent pill)    |
|                             - Description paragraph              |
|                             - "Why It's Great" list (styled bullets)|
|                             - Primary CTA: "View on Amazon →"    |
|                             - Affiliate disclosure (text-xs)     |
|                                                                  |
|  Related Gifts Grid (4 cards)                                    |
+------------------------------------------------------------------+
```

**Layout Structure (Mobile):**
- Single column: Image → Content → CTA → Related Gifts
- CTA full-width

**Component Inventory — Gift Detail:**
- `Breadcrumb` — standard breadcrumb (Home / Category / Gift Name)
- `ProductImage` — 4:5 aspect, object-fit: cover (SVG placeholder; lazy-load when real images added)
- `GiftMeta` — subtitle, title, price range (styled pill)
- `DescriptionBlock` — editorial paragraph
- `WhyItsGreat` — styled list with theme-accent bullets (● or custom SVG)
- `AmazonCTA` — primary button, full-width, theme accent bg, white text, 2px radius
- `AffiliateDisclosure` — inline below CTA, text-xs, muted
- `RelatedGiftsGrid` — 4 GiftCard components (links TBD)

**Interaction Rules:**
- Amazon CTA opens in new tab (`target="_blank" rel="noopener noreferrer"`)
- Affiliate link format: `https://www.amazon.in/dp/[ASIN]?tag=giftkaro-21`
- ~~Image zoom on hover/tap (lightbox optional)~~ — Deferred; not critical for MVP
- ~~Smooth scroll to related gifts~~ — Browser native scroll behavior

---

### 1.3 Page C: Search & Filter (`/search`)

**Purpose:** Discovery interface for users with specific intent.

| Area | Components | Behavior |
|------|------------|----------|
| **Search Bar** | Centered input + magnifier icon, placeholder "Search gifts..." | Debounced 300ms, filters client-side or hits API |
| **Filter Panel** | Desktop: left sidebar (280px). Mobile: bottom sheet / drawer | Accordion sections: Occasion, Vibe, Relationship, Price Range |
| **Filter Pills** | Tag-select UI, multi-select per category, removable chips | Active pills show count, clear-all option |
| **Results Grid** | GiftCard grid, infinite scroll / load more | Empty state illustration + copy |
| **URL State** | Filters reflected in query params (?occasion=diwali&vibe=luxury&price=1000-5000) | Shareable, deep-linkable |

**Component Inventory — Search/Filter:**
- `SearchInput` — prominent, auto-focus on load
- `FilterDrawer` (mobile) / `FilterSidebar` (desktop)
- `FilterAccordion` — collapsible sections
- `FilterChip` — removable, keyboard accessible
- `PriceRangeSlider` — dual-handle, ₹ formatted
- `ResultsGrid` — responsive GiftCard grid
- `EmptyState` — illustration + "Try broader filters"

---

## 2. Seasonal Theme System Implementation

### 2.1 Theme Definitions (CSS Custom Properties)

Each theme defines a complete token set. Themes are applied via `[data-theme="diwali"]` on `<html>`.

```css
:root {
  /* Default Theme — Clean Minimal Amber/Orange */
  --theme-primary: #F59E0B;
  --theme-primary-hover: #D97706;
  --theme-secondary: #0F172A;
  --theme-bg-start: #FFF7ED;
  --theme-bg-end: #FEF3C7;
  --theme-text-primary: #0F172A;
  --theme-text-secondary: #6B7280;
  --theme-border: #FCD34D;
  --theme-cta-bg: #F59E0B;
  --theme-cta-hover: #D97706;
  --theme-cta-text: #FFFFFF;
  --theme-bullet: #F59E0B;
  --hero-illustration: url('/assets/hero-default.svg');
}

[data-theme="diwali"] {
  --theme-primary: #D97706;
  --theme-primary-hover: #EA580C;
  --theme-secondary: #1C1917;
  --theme-bg-start: #FFF7ED;
  --theme-bg-end: #FEF3C7;
  --theme-text-primary: #1C1917;
  --theme-text-secondary: #78716C;
  --theme-border: #FCD34D;
  --theme-cta-bg: #D97706;
  --theme-cta-hover: #EA580C;
  --theme-cta-text: #FFFFFF;
  --theme-bullet: #D97706;
  --hero-illustration: url('/assets/hero-diwali.svg');
}

[data-theme="christmas"] {
  --theme-primary: #DC2626;
  --theme-primary-hover: #B91C1C;
  --theme-secondary: #166534;
  --theme-bg-start: #FEF2F2;
  --theme-bg-end: #F0FDF4;
  --theme-text-primary: #1C1917;
  --theme-text-secondary: #78716C;
  --theme-border: #FCA5A5;
  --theme-cta-bg: #DC2626;
  --theme-cta-hover: #B91C1C;
  --theme-cta-text: #FFFFFF;
  --theme-bullet: #DC2626;
  --hero-illustration: url('/assets/hero-christmas.svg');
}

[data-theme="valentines"] {
  --theme-primary: #E11D48;
  --theme-primary-hover: #BE123C;
  --theme-secondary: #9D174D;
  --theme-bg-start: #FFF1F2;
  --theme-bg-end: #FDF2F8;
  --theme-text-primary: #1C1917;
  --theme-text-secondary: #78716C;
  --theme-border: #FDA4AF;
  --theme-cta-bg: #E11D48;
  --theme-cta-hover: #BE123C;
  --theme-cta-text: #FFFFFF;
  --theme-bullet: #E11D48;
  --hero-illustration: url('/assets/hero-valentines.svg');
}
```

### 2.2 Theme Switching Logic

```javascript
// theme-engine.js
const THEME_SCHEDULE = [
  { name: 'diwali', start: '10-15', end: '11-05' },
  { name: 'christmas', start: '12-01', end: '12-26' },
  { name: 'valentines', start: '02-01', end: '02-15' },
];

function getCurrentTheme() {
  const today = new Date();
  const mmdd = `${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  for (const theme of THEME_SCHEDULE) {
    if (mmdd >= theme.start && mmdd <= theme.end) return theme.name;
  }
  return 'default';
}

// Apply on load + persist user override in localStorage
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('giftkaro-theme', theme);
}

// User can override via theme selector in footer (optional)
```

### 2.3 Theme Asset Requirements

| Asset | Format | Specs |
|-------|--------|-------|
| Hero illustrations (4) | SVG preferred | 1920×1080 safe area, transparent bg, single-color (theme primary) |
| Category icons (12–15) | SVG | 48×48px, stroke-based, themeable via `currentColor` |
| "Why It's Great" bullets | CSS `::marker` or custom SVG | 8×8px, theme primary color |

---

## 3. Mobile-First Responsive Behavior

### 3.1 Breakpoint Strategy

| Breakpoint | Width | Container Gutter | Grid Columns | Key Adjustments |
|------------|-------|------------------|--------------|-----------------|
| Mobile Small | ≤375px | 16px | 1 | Full-width CTA, 18px H1, stacked nav |
| Mobile | 376–600px | 16px | 1–2 | GiftCard 2-col, hamburger menu |
| Tablet Small | 601–768px | 24px | 2 | 2-col editorial, filter drawer |
| Tablet | 769–960px | 32px | 3 | Sidebar filters, 3-col grid |
| Desktop | 961–1280px | 40px | 4 | Full layout, sticky CTA on detail |
| Large Desktop | 1281–1920px | 48px | 4–5 | Max-width 1240px, generous whitespace |

### 3.2 Component Responsive Rules

| Component | Mobile (≤600px) | Tablet (601–960px) | Desktop (>960px) |
|-----------|-----------------|-------------------|------------------|
| **Hero** | H1: clamp(28px, 7vw, 40px), CTA full-width | H1: clamp(36px, 5vw, 56px), CTA auto-width | H1: 56px, centered, generous padding |
| **GiftCard Grid** | 1 col (375px), 2 col (≥400px) | 2–3 col | 3–4 col |
| **Category Grid** | 2 col, icon + label stacked | 3–4 col | 4–5 col |
| **Gift Detail** | Single column, image 100% width | 2-col (50/50), image 4:5 | 2-col (60/40), image 4:5 |
| **Amazon CTA** | Full-width, sticky bottom (optional) | Auto-width, min 280px | Auto-width, min 320px |
| **Filter Panel** | Bottom sheet (90vh), drag handle | Left sidebar (280px), sticky | Left sidebar (300px), sticky |
| **Footer** | Single column, accordion sections | 2-col | 4-col |

### 3.3 Touch & Accessibility

- All interactive elements: `min-height: 44px; min-width: 44px;`
- Focus visible: `outline: 3px solid var(--theme-primary); outline-offset: 2px;`
- Reduced motion: `@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }`
- Color contrast: WCAG AA minimum (4.5:1 text, 3:1 UI) verified per theme
- ARIA labels on icon-only buttons, filter pills, drawer triggers

---

## 4. Affiliate Compliance Requirements

### 4.1 Mandatory Disclosure Text

> **"As an Amazon Associate, I earn from qualifying purchases"**

### 4.2 Placement Rules

| Page | Placement | Style |
|------|-----------|-------|
| **All Pages** | Footer, bottom center | `font-size: 0.75rem (12px)`, `color: var(--theme-text-secondary)`, `text-align: center` |
| **Gift Detail** | Directly below Amazon CTA | Same as footer + `margin-top: 8px`, `display: block` |
| **Search Results** | Footer only | As above |

### 4.3 Affiliate Link Format

```html
<a href="https://www.amazon.in/dp/B09XYZ1234?tag=giftkaro-21"
   target="_blank"
   rel="noopener noreferrer"
   class="amazon-cta"
   data-od-id="amazon-cta-gift-123">
  View on Amazon →
</a>
```

- `tag` parameter: Your Amazon Associates ID (placeholder: `giftkaro-21`)
- `rel="noopener noreferrer"`: Security best practice for external links
- `target="_blank"`: Keeps user on GiftKaro after click

### 4.4 Amazon Brand Guidelines Compliance

- Button text: **"View on Amazon"** (not "Buy Now", "Shop Now", "Purchase")
- Amazon logo: Not required on CTA; if used, follow [Amazon Associates logo guidelines](https://affiliate-program.amazon.in/help/operating-policies)
- No Amazon branding in hero/navigation — GiftKaro is the brand
- Price ranges only — never exact prices (avoids stale data liability)

---

## 5. Content Model & Data Structure

### 5.1 Gift Object Schema

```json
{
  "id": "gift-001",
  "title": "Handcrafted Brass Diya Set",
  "subtitle": "Set of 4 traditional oil lamps",
  "description": "Elevate your festive decor with these artisan-crafted brass diyas...",
  "whyItsGreat": [
    "Handmade by artisans in Moradabad using traditional techniques",
    "Solid brass construction — no hollow bases that tip over",
    "Perfect size for rangoli centerpieces or doorway placement",
    "Comes in a reusable gift box with velvet lining"
  ],
  "priceRange": { "min": 899, "max": 1499 },
  "currency": "INR",
  "image": "/assets/gifts/brass-diya-set.jpg",
  "imageAlt": "Four brass diyas arranged on a marble surface",
  "asin": "B09XYZ1234",
  "categories": {
    "occasion": ["diwali", "housewarming"],
    "vibe": ["traditional", "spiritual"],
    "relationship": ["parents", "friends"],
    "festival": ["diwali"]
  },
  "tags": ["bestseller", "handmade"],
  "isNew": true,
  "sortOrder": 1
}
```

### 5.2 Category Taxonomy

| Dimension | Values |
|-----------|--------|
| **Festival** | diwali, holi, christmas, valentines, eid, rakhi, navratri, onam, pongal |
| **Occasion** | birthday, anniversary, housewarming, wedding, baby-shower, farewell, graduation, promotion |
| **Vibe** | luxury, minimal, quirky, sentimental, practical, eco-friendly, tech, wellness, gourmet |
| **Relationship** | parents, partner, siblings, friends, colleagues, kids, grandparents, in-laws |

---

## 6. Implementation Phases & Acceptance Criteria

### Phase 1: Foundation & Theme Engine
- [ ] HTML structure for all 3 pages (semantic, accessible)
- [ ] CSS custom properties for 4 themes + default
- [ ] Theme switching JS (auto + manual override)
- [ ] Hero illustrations (4 SVGs) + category icons
- [ ] **Acceptance:** Theme changes correctly on date boundaries; manual override persists

### Phase 2: Homepage
- [ ] Hero section with dynamic gradient + illustration
- [ ] New This Week grid (responsive)
- [ ] Category grids (Festivals, Occasions, Vibes)
- [ ] Footer with newsletter + disclosure
- [ ] **Acceptance:** No horizontal scroll at any breakpoint; CTAs meet 44×44px

### Phase 3: Gift Detail Page
- [x] Breadcrumb + product image (4:5 aspect)
- [x] Content panel: title, subtitle, price range, description, Why It's Great
- [x] Amazon CTA (primary, theme accent) + affiliate disclosure
- [x] Related gifts grid (4 cards)
- [ ] **Acceptance:** CTA opens Amazon.in with correct affiliate tag in new tab — PASS (link format correct, tag placeholder `giftkaro-21`)

### Phase 4: Search & Filter
- [ ] Search input with debounce
- [ ] Filter drawer (mobile) / sidebar (desktop)
- [ ] Multi-select filter chips with counts
- [ ] Price range slider
- [ ] Results grid with URL state sync
- [ ] **Acceptance:** Filters update URL; shareable links restore state

### Phase 5: Polish & Compliance
- [ ] Affiliate disclosure on every page (footer + detail CTA)
- [ ] Focus states, reduced motion, color contrast audit
- [ ] Performance: lazy images, minimal JS, cached assets
- [ ] Cross-browser test (Chrome, Safari, Firefox, Edge)
- [ ] **Acceptance:** Lighthouse >90 Performance/Accessibility/Best Practices/SEO

---

## 7. Open Questions / TODO

- [ ] **Asset sourcing:** Who provides product photography? (Need 16:9 hero + 4:5 detail per gift) — Currently using SVG placeholders
- [ ] **CMS/Content:** Static JSON files or headless CMS (Contentful, Sanity, Notion)?
- [ ] **Affiliate ID:** Confirm Amazon Associates tracking ID for production (currently using `giftkaro-21` placeholder)
- [ ] **Analytics:** Event tracking for CTA clicks (GA4 / Plausible / custom)?
- [ ] **SEO:** Meta tags per gift (title, description, og:image, structured data)?
- [ ] **Internationalization:** Hindi/Hinglish support for tier-2/3 cities?
- [ ] **PWA:** Offline caching for repeat visitors?
- [ ] **A/B Testing:** CTA copy variations ("View on Amazon" vs "Check Price on Amazon")?
- [x] **Gift Detail Layout:** 60/40 desktop split, single column mobile — IMPLEMENTED
- [x] **Theme System:** 4 seasonal themes with auto-switching — IMPLEMENTED
- [x] **Breadcrumb Style:** Standard breadcrumb (Home / Category / Name) instead of "← Back to" — IMPLEMENTED
- [x] **Related Gifts:** 4-card grid — IMPLEMENTED

---

## Next Step

**Review this document**, edit any section directly in the file, then confirm approval. Once approved, I'll generate the design artifacts:

1. **Homepage prototype** (`homepage.html`)
2. **Gift Detail prototype** (`gift-detail.html`)
3. **Search/Filter prototype** (`search.html`)
4. **Component library / Style guide** (`components.html`)
5. **Theme tokens CSS** (`theme-tokens.css`)

---

*Plan created: 2026-07-25 | GiftKaro PRD v1.0*