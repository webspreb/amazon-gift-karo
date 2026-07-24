# Amazon Affiliate Gift Recommendation Site — Design Doc

## Overview
A gift recommendation website focused on the Amazon India market. The site looks like a curated ecommerce storefront but has no checkout — every product links directly to Amazon.in via affiliate links. The focus is on **unexpected, outside-the-box gift ideas** for Indian festivals and occasions.

## Core Concept
- **Audience**: General consumers in India
- **Categories**: Indian festivals (Diwali, Holi, Raksha Bandhan, etc.), normal occasions (birthday, anniversary, wedding), romantic, sentimental, by relationship (for her, for him, for parents, for couple)
- **Pricing**: INR, any range
- **Style**: Ecommerce-like storefront without checkout — just gift suggestions with "Buy on Amazon" buttons
- **Traffic source**: Social media (Instagram, Pinterest, YouTube) initially

## Compliance (Amazon Associates Program)
- Must display **"As an Amazon Associate, I earn from qualifying purchases"** prominently
- Content must be **original** — significant commentary/analysis on each gift pick (not copy-pasted from Amazon)
- **No static pricing** — link directly to Amazon or use API; don't hardcode prices
- **3 qualifying sales within 180 days** of account creation required to maintain account
- **24-hour cookie window** — commission earned on any Amazon purchase within 24h of link click
- **Commission rates** (Amazon India): 1–10% depending on category (fashion up to 9%, luxury beauty up to 10%, home ~3%)
- **Minimum payout**: ₹2,500 bank deposit / ₹100 gift card

## Technical Approach: Custom Build (Next.js)
- **Framework**: Next.js (static export or SSR)
- **Styling**: Tailwind CSS
- **Hosting**: Vercel (free tier)
- **Content**: Markdown files or headless CMS (e.g., Strapi), tagged by occasion/festival/price/vibe
- **Deployment**: Auto-deploy from Git

## Site Architecture & Navigation
- **Homepage** — Seasonal hero banner (Diwali, Holi, Valentine's, etc.), trending gifts, "New This Week"
- **By Festival** — /diwali, /holi, /raksha-bandhan, /christmas, /eid
- **By Occasion** — /birthday, /anniversary, /wedding, /housewarming
- **By Relationship** — /for-her, /for-him, /for-couple, /for-parents
- **By Vibe** — /romantic, /sentimental, /unique, /funny
- **Individual gift page** — /gift/xyz with full description, why it's a great gift, and Amazon link
- **Navigation** adapts theme colors to the active season

## Content Model (Each Gift Entry)
| Field | Description |
|---|---|
| Title | Gift name (e.g., "Terracotta Tea Set — Handcrafted in Jaipur") |
| Description | 2-3 lines: why it's a great gift, who it's for, what makes it special |
| Price (INR) | Current price range |
| Image | Product photo |
| Amazon Affiliate Link | amazon.in/dp/XXXX?tag=your-tag |
| Categories | Multi-tag: festivals, occasions, relationships |
| Vibe Tags | romantic, sentimental, unique, budget-friendly, luxury |
| Published Date | For "New Arrivals" sorting |
| Seasonal Flag | active-diwali, active-valentine — shown only during relevant season |

## Key Features
- Seasonal headers/themes that change automatically for festivals
- "New Arrivals" and "Trending" sections
- Search and filter by occasion, festival, price range, relationship, vibe
- Mobile-first responsive design (critical for India market)
- Affiliate disclosure on every page
- No checkout, no cart — single "View on Amazon" CTA per item

## Earning Model
- Commission per sale: 1–10% of product price (Amazon India)
- Average order value: ~₹1,500–2,500
- Realistic early estimate: ₹5,000–15,000/month with ~500 visitors/day
- Scaling potential grows with traffic and content volume

## Future Expandability
- New festivals/occasions added by creating a new tag + page
- Blog section for SEO-driven gift guides
- Email newsletter for seasonal campaigns
- YouTube/Instagram integration for social traffic
