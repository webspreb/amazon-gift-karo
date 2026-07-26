import { getNewArrivals, getAllGifts, getFestivals, getOccasions, getVibes } from '@/lib/gifts';
import { GiftCard } from '@/components/GiftCard';
import { SeasonalHero } from '@/components/SeasonalHero';
import { CategoryGrid, CategoryItem } from '@/components/CategoryGrid';
import Link from 'next/link';

export default function HomePage() {
  const newArrivals = getNewArrivals(4);
  const allGifts = getAllGifts();

  // Category Icon & Name Mappings
  const festivalIcons: Record<string, string> = {
    diwali: '🪔',
    christmas: '🎄',
    valentines: '💝',
    valentine: '💝',
    holi: '🌈',
    eid: '🌙',
    'raksha-bandhan': '🧵',
    rakhi: '🧵',
  };

  const festivalNames: Record<string, string> = {
    diwali: 'Diwali',
    christmas: 'Christmas',
    valentines: "Valentine's",
    valentine: "Valentine's",
    holi: 'Holi',
    eid: 'Eid',
    'raksha-bandhan': 'Raksha Bandhan',
    rakhi: 'Raksha Bandhan',
  };

  const occasionIcons: Record<string, string> = {
    birthday: '🎂',
    anniversary: '💍',
    housewarming: '🏠',
    wedding: '💒',
    'baby-shower': '👶',
    graduation: '🎓',
    farewell: '👋',
    promotion: '📈',
  };

  const vibeIcons: Record<string, string> = {
    minimal: '✨',
    traditional: '🪔',
    luxury: '💎',
    quirky: '🦄',
    sentimental: '💌',
    practical: '🔧',
    'eco-friendly': '🌱',
    tech: '🤖',
    wellness: '🧘',
    gourmet: '🍫',
  };

  // Compile Festivals
  const festivalCategories: CategoryItem[] = getFestivals().map(id => {
    // Map valentine to valentines for theme compatibility
    const targetId = id === 'valentine' ? 'valentines' : id;
    const count = allGifts.filter(g => g.categories.festivals?.includes(id)).length;
    return {
      id: targetId,
      name: festivalNames[targetId] || targetId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      icon: festivalIcons[targetId] || '🎉',
      count,
      type: 'festival',
    };
  });

  // Compile Occasions
  const occasionCategories: CategoryItem[] = getOccasions().map(id => {
    const count = allGifts.filter(g => g.categories.occasions?.includes(id)).length;
    return {
      id,
      name: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      icon: occasionIcons[id] || '🎁',
      count,
      type: 'occasion',
    };
  });

  // Compile Vibes
  const vibeCategories: CategoryItem[] = getVibes().map(id => {
    const count = allGifts.filter(g => g.categories.vibes?.includes(id)).length;
    return {
      id,
      name: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      icon: vibeIcons[id] || '✨',
      count,
      type: 'vibe',
    };
  });

  return (
    <div>
      <SeasonalHero />

      {/* New This Week */}
      <section className="section" aria-labelledby="new-title" data-od-id="new-section">
        <div className="container">
          <header className="section-header">
            <span className="section-tag" data-od-id="new-tag">New This Week</span>
            <h2 id="new-title" className="section-title" data-od-id="new-title">Fresh Picks Just In</h2>
            <p className="section-desc" data-od-id="new-desc">
              Our editorial team&apos;s latest discoveries — from artisan crafts to clever gadgets.
            </p>
          </header>
          <div className="gift-grid" id="newGiftsGrid" role="list" data-od-id="new-grid">
            {newArrivals.map(gift => (
              <GiftCard key={gift.slug} gift={gift} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }} data-od-id="new-view-all">
            <Link href="/search?sort=newest" className="btn-ghost">
              View All New Arrivals →
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="section" style={{ background: 'var(--theme-bg-card)' }} aria-labelledby="cat-title" data-od-id="category-section">
        <div className="container">
          <header className="section-header">
            <span className="section-tag" data-od-id="cat-tag">Browse by Category</span>
            <h2 id="cat-title" className="section-title" data-od-id="cat-title">Find the Perfect Gift</h2>
            <p className="section-desc" data-od-id="cat-desc">
              Shop curated collections by festival, occasion, or the vibe you&apos;re going for.
            </p>
          </header>

          {/* Festivals */}
          {festivalCategories.length > 0 && (
            <CategoryGrid title="Festivals" categories={festivalCategories} />
          )}

          {/* Occasions */}
          {occasionCategories.length > 0 && (
            <CategoryGrid title="Occasions" categories={occasionCategories} />
          )}

          {/* Vibes */}
          {vibeCategories.length > 0 && (
            <CategoryGrid title="Vibes" categories={vibeCategories} />
          )}
        </div>
      </section>
    </div>
  );
}
