import { GiftEntry } from './types';

const giftRegistry: GiftEntry[] = [];

export function registerGift(gift: GiftEntry): void {
  giftRegistry.push(gift);
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
