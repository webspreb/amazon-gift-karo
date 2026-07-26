import { MetadataRoute } from 'next';
import { getAllGifts, getFestivals, getOccasions, getRelationships, getVibes } from '@/lib/gifts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://giftkaro.vercel.app';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  const festivalPages = getFestivals().map(f => ({
    url: `${baseUrl}/festivals/${f}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const occasionPages = getOccasions().map(o => ({
    url: `${baseUrl}/occasions/${o}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const relationshipPages = getRelationships().map(r => ({
    url: `${baseUrl}/relationships/${r}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const vibePages = getVibes().map(v => ({
    url: `${baseUrl}/vibes/${v}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const giftPages = getAllGifts().map(g => ({
    url: `${baseUrl}/gift/${g.slug}`,
    lastModified: new Date(g.publishedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...festivalPages,
    ...occasionPages,
    ...relationshipPages,
    ...vibePages,
    ...giftPages,
  ];
}
