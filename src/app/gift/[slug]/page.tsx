import '@/content/gifts';
import { getGiftBySlug, getAllGifts, getGiftsByCategory } from '@/lib/gifts';
import { GiftCard } from '@/components/GiftCard';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  const gifts = getAllGifts();
  return gifts.map(g => ({ slug: g.slug }));
}

export default async function GiftDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gift = getGiftBySlug(slug);
  if (!gift) notFound();

  const firstVibe = gift.categories.vibes?.[0];
  const relatedGifts = firstVibe
    ? getGiftsByCategory('vibes', firstVibe).filter(g => g.slug !== gift.slug).slice(0, 4)
    : [];

  const allTags = [
    ...(gift.categories.festivals?.map(f => ({ type: 'festivals' as const, value: f })) ?? []),
    ...(gift.categories.occasions?.map(o => ({ type: 'occasions' as const, value: o })) ?? []),
    ...(gift.categories.relationships?.map(r => ({ type: 'relationships' as const, value: r })) ?? []),
    ...(gift.categories.vibes?.map(v => ({ type: 'vibes' as const, value: v })) ?? []),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm text-gray-500 hover:text-amber-600 mb-4 inline-block">
        ← Back to Home
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspect-square rounded-xl bg-gray-100 flex items-center justify-center">
          <span className="text-6xl text-gray-300">🎁</span>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Link
                key={`${tag.type}-${tag.value}`}
                href={`/${tag.type}/${tag.value}`}
                className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 hover:bg-amber-100 capitalize"
              >
                {tag.value.replace('-', ' ')}
              </Link>
            ))}
          </div>

          <h1 className="text-3xl font-bold text-gray-900">{gift.title}</h1>
          <p className="text-xl font-medium text-gray-700">{gift.priceRange}</p>
          <p className="text-gray-600 leading-relaxed">{gift.description}</p>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Why It&apos;s Great</h2>
            <ul className="space-y-2">
              {gift.whyItsGreat.map((reason, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <span className="mt-0.5 text-amber-500">✦</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={gift.amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-lg bg-amber-500 px-8 py-4 text-lg font-semibold text-white shadow-sm transition-all hover:bg-amber-600 hover:shadow-md"
          >
            View on Amazon ₹ →
          </a>

          <AffiliateDisclosure />
        </div>
      </div>

      {relatedGifts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedGifts.map(g => (
              <GiftCard key={g.slug} gift={g} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
