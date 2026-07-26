# GiftKaro — Missing Pages Plan

## Intent
Build the remaining pages referenced in navigation/footer but not yet created. All pages follow the existing GiftKaro design system (theme-tokens.css, seasonal theming, cartless/affiliate model, mobile-first).

## Pages to Build

### 1. Category Landing Page (`category.html`)
**Purpose:** Festival/occasion landing page (e.g., "Diwali Gifts", "Birthday Gifts"). Reusable template that adapts via query params.

| Section | Content | Notes |
|---------|---------|-------|
| **Hero** | Category name + seasonal illustration + description | e.g., "Diwali Gifts — Curated for the Festival of Lights" |
| **Featured Grid** | 8–12 gift cards (filtered by category) | Same card component as homepage/search |
| **Editorial Copy** | 2–3 paragraphs about the occasion/festival | SEO-rich, explains gifting traditions |
| **Related Categories** | 3–4 related category cards | Cross-links to other occasions |
| **CTA** | "Browse All [Category] Gifts →" | Links to search.html with filter |

**URL pattern:** `category.html?cat=diwali` (or `category.html?cat=birthday`, etc.)
**Data:** JS reads `cat` param, filters gift data, renders dynamically.

---

### 2. About Us (`about.html`)
**Purpose:** Explain GiftKaro's mission, curation process, and cartless model.

| Section | Content | Notes |
|---------|---------|-------|
| **Hero** | "Gift Discovery, Reimagined" headline | Editorial tone, seasonal background |
| **Mission** | 2 paragraphs: why GiftKaro exists | Problem: endless scrolling. Solution: curated picks. |
| **How It Works** | 3-step visual (Browse → Click → Amazon) | Icon + short text per step |
| **Curation Process** | "How We Pick Gifts" section | Editorial: research, test, curate |
| **Trust Signals** | Stats: "500+ Curated Gifts", "9 Categories", "Updated Weekly" | Honest placeholders |
| **CTA** | "Start Exploring →" | Links to homepage |

---

### 3. How It Works (`how-it-works.html`)
**Purpose:** Explain the cartless/checkout-free model clearly.

| Section | Content | Notes |
|---------|---------|-------|
| **Hero** | "No Cart. No Checkout. Just Great Gifts." | Bold headline |
| **3-Step Flow** | Browse → View on Amazon → Done | Large numbered steps with icons |
| **Why No Cart** | Explanation: we're curators, not sellers | Builds trust, sets expectations |
| **FAQ** | 4–5 common questions | "Is this affiliated with Amazon?", "How do you make money?", etc. |
| **CTA** | "Find Your Perfect Gift →" | Links to search.html |

---

### 4. Contact Us (`contact.html`)
**Purpose:** User inquiries, feedback, partnership requests.

| Section | Content | Notes |
|---------|---------|-------|
| **Hero** | "Get in Touch" | Simple, clean |
| **Contact Form** | Name, Email, Subject dropdown, Message | Subject options: General, Feedback, Partnership, Bug Report |
| **Response Time** | "We typically respond within 2–3 business days" | Sets expectations |
| **Alternative** | Email address, social links | If form doesn't work |
| **FAQ Link** | "Check our FAQ first" | Links to how-it-works.html#faq |

---

### 5. Privacy Policy (`privacy.html`)
**Purpose:** Legal requirement for affiliate sites. Covers data collection, cookies, affiliate disclosure.

| Section | Content | Notes |
|---------|---------|-------|
| **Last Updated** | Date stamp | "Last updated: July 2026" |
| **Data Collection** | What we collect (none directly — static site) | Email only via newsletter |
| **Cookies** | localStorage for theme preference only | Minimal |
| **Affiliate Disclosure** | Amazon Associates program details | Required by Amazon |
| **Third Parties** | Google Fonts, analytics (if any) | Standard |
| **Contact** | How to reach us for privacy concerns | Links to contact.html |

---

### 6. 404 Page (`404.html`)
**Purpose:** Friendly error page for broken links.

| Section | Content | Notes |
|---------|---------|-------|
| **Message** | "Oops! This gift doesn't exist." | On-brand, not technical |
| **Search Bar** | Quick search to redirect | Same component as search.html |
| **Popular Links** | 4–6 category cards | Helps users find their way |
| **CTA** | "Back to Homepage →" | Safety net |

---

## Shared Patterns

### Header/Footer
All pages reuse the same header (logo, nav, mobile menu) and footer (links, disclosure, copyright) from homepage.html.

### Theme System
All pages import `theme-tokens.css` and support seasonal auto-switching.

### Navigation Updates
After building these pages, update nav/footer links across all files:
- `category.html?cat=diwali` → replaces `/occasion/diwali`
- `about.html` → replaces `#` in footer
- `contact.html` → replaces `#` in footer
- `how-it-works.html` → replaces `#` in footer
- `privacy.html` → replaces `#` in footer

### Accessibility
- All pages: `prefers-reduced-motion`, 44px touch targets, `aria-label`, `data-od-id`
- Forms: proper `<label>`, error states, focus management
- Focus visible on all interactive elements

---

## Build Order

1. `category.html` — highest value (SEO, navigation completeness)
2. `about.html` — brand story, trust building
3. `how-it-works.html` — explains core value prop
4. `contact.html` — user support
5. `privacy.html` — legal compliance
6. `404.html` — error handling
7. Update nav/footer links across all existing pages

---

## Next Step

Review this plan, then confirm to proceed with building. Each page will be a standalone HTML file following the existing GiftKaro design system.
