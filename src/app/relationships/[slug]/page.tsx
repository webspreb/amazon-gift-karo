import '@/content/gifts';
import { getGiftsByCategory } from '@/lib/gifts';
import { GiftCard } from '@/components/GiftCard';
import { SeasonalHero } from '@/components/SeasonalHero';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [
    { slug: 'for-her' },
    { slug: 'for-him' },
    { slug: 'for-parents' },
    { slug: 'for-couple' },
  ];
}

export default async function RelationshipPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gifts = getGiftsByCategory('relationships', slug);
  if (gifts.length === 0) notFound();

  const label = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <SeasonalHero
        title={`Gifts for ${label}`}
        subtitle={`Curated gift ideas for ${slug.replace('-', ' ')}.`}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gifts.map(gift => (
          <GiftCard key={gift.slug} gift={gift} />
        ))}
      </div>
    </div>
  );
}
