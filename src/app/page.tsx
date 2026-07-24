import '@/content/gifts';
import { getNewArrivals, getTrendingGifts, getFestivals, getVibes } from '@/lib/gifts';
import { GiftCard } from '@/components/GiftCard';
import { SeasonalHero } from '@/components/SeasonalHero';
import { CategoryGrid } from '@/components/CategoryGrid';
import { getActiveSeason } from '@/lib/themes';

export default function HomePage() {
  const season = getActiveSeason();
  const newArrivals = getNewArrivals(6);
  const trendingGifts = getTrendingGifts(8);
  const festivals = getFestivals();
  const vibes = getVibes();

  const festivalCategories = festivals.map(f => ({
    href: `/festivals/${f}`,
    label: f.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    icon: '🎉',
  }));

  const vibeCategories = vibes.map(v => ({
    href: `/vibes/${v}`,
    label: v.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    icon: '✨',
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      <SeasonalHero
        title={season.hero.title}
        subtitle={season.hero.subtitle}
        bgClass={season.hero.bgClass}
        ctaText="Explore Gifts"
        ctaHref="/search"
      />

      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">New This Week</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newArrivals.map(gift => (
            <GiftCard key={gift.slug} gift={gift} />
          ))}
        </div>
      </section>

      <CategoryGrid
        title="Shop by Festival"
        categories={festivalCategories}
      />

      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Trending Gifts</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trendingGifts.map(gift => (
            <GiftCard key={gift.slug} gift={gift} />
          ))}
        </div>
      </section>

      <CategoryGrid
        title="Browse by Vibe"
        categories={vibeCategories}
      />
    </div>
  );
}
