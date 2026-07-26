import { GiftEntry } from './types';
import staticGifts from './gifts-data.json';

const giftRegistry: GiftEntry[] = [...(staticGifts as GiftEntry[])];

export function registerGift(gift: GiftEntry): void {
  if (!giftRegistry.some(g => g.slug === gift.slug)) {
    giftRegistry.push(gift);
  }
}

export function getAllGifts(): GiftEntry[] {
  return [...giftRegistry];
}

export function getGiftBySlug(slug: string): GiftEntry | undefined {
  return giftRegistry.find(g => g.slug === slug);
}

export function getGiftsByCategory(type: string, slug: string): GiftEntry[] {
  return giftRegistry.filter(g => g.categories[type as keyof typeof g.categories]?.includes(slug));
}

export function getNewArrivals(count: number = 6): GiftEntry[] {
  return [...giftRegistry]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, count);
}

export function getTrendingGifts(count: number = 8): GiftEntry[] {
  return [...giftRegistry].slice(0, count);
}

export function getFestivals(): string[] {
  const festivals = new Set<string>();
  giftRegistry.forEach(g => g.categories.festivals?.forEach(f => festivals.add(f)));
  return Array.from(festivals);
}

export function getOccasions(): string[] {
  const occasions = new Set<string>();
  giftRegistry.forEach(g => g.categories.occasions?.forEach(o => occasions.add(o)));
  return Array.from(occasions);
}

export function getRelationships(): string[] {
  const rels = new Set<string>();
  giftRegistry.forEach(g => g.categories.relationships?.forEach(r => rels.add(r)));
  return Array.from(rels);
}

export function getVibes(): string[] {
  const vibes = new Set<string>();
  giftRegistry.forEach(g => g.categories.vibes?.forEach(v => vibes.add(v)));
  return Array.from(vibes);
}

export function searchGifts(query: string): GiftEntry[] {
  const q = query.toLowerCase();
  return giftRegistry.filter(g =>
    g.title.toLowerCase().includes(q) ||
    g.description.toLowerCase().includes(q) ||
    g.categories.vibes?.some(v => v.includes(q)) ||
    g.categories.occasions?.some(o => o.includes(q)) ||
    g.categories.festivals?.some(f => f.includes(q))
  );
}

export interface GiftFilters {
  festival?: string;
  occasion?: string;
  relationship?: string;
  vibe?: string;
  minPrice?: number;
  maxPrice?: number;
}

function parsePriceRange(priceRange: string): { min: number; max: number } | null {
  const numbers = priceRange.match(/[\d,]+/g);
  if (!numbers) return null;
  const parsed = numbers.map(n => parseInt(n.replace(/,/g, '')));
  return { min: parsed[0] || 0, max: parsed[1] || parsed[0] || Infinity };
}

export function filterGifts(filters: GiftFilters): GiftEntry[] {
  return giftRegistry.filter(g => {
    if (filters.festival && !g.categories.festivals?.includes(filters.festival)) return false;
    if (filters.occasion && !g.categories.occasions?.includes(filters.occasion)) return false;
    if (filters.relationship && !g.categories.relationships?.includes(filters.relationship)) return false;
    if (filters.vibe && !g.categories.vibes?.includes(filters.vibe)) return false;
    if (filters.maxPrice) {
      const range = parsePriceRange(g.priceRange);
      if (range && range.min > filters.maxPrice) return false;
    }
    return true;
  });
}
