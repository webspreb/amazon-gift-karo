import '@/content/gifts';
import { getGiftsByCategory } from '@/lib/gifts';
import { GiftCard } from '@/components/GiftCard';
import { SeasonalHero } from '@/components/SeasonalHero';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [
    { slug: 'diwali' },
    { slug: 'holi' },
    { slug: 'valentine' },
    { slug: 'christmas' },
    { slug: 'raksha-bandhan' },
    { slug: 'eid' },
  ];
}

export default async function FestivalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gifts = getGiftsByCategory('festivals', slug);
  if (gifts.length === 0) notFound();

  const label = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <SeasonalHero
        title={`${label} Gift Guide`}
        subtitle={`Discover the perfect ${slug} gifts for your loved ones.`}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gifts.map(gift => (
          <GiftCard key={gift.slug} gift={gift} />
        ))}
      </div>
    </div>
  );
}
