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

export type CategoryType = 'festivals' | 'occasions' | 'relationships' | 'vibes';
