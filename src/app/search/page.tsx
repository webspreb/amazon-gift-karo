'use client';

import '@/content/gifts';
import { searchGifts, filterGifts, getAllGifts, GiftFilters, getFestivals, getOccasions, getVibes } from '@/lib/gifts';
import { GiftCard } from '@/components/GiftCard';
import { SearchBar } from '@/components/SearchBar';
import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const festival = searchParams.get('festival') || '';
  const occasion = searchParams.get('occasion') || '';
  const vibe = searchParams.get('vibe') || '';
  const maxPrice = parseInt(searchParams.get('maxPrice') || '');

  const results = useMemo(() => {
    let filtered = query ? searchGifts(query) : getAllGifts();
    if (festival || occasion || vibe || maxPrice) {
      const filters: GiftFilters = {};
      if (festival) filters.festival = festival;
      if (occasion) filters.occasion = occasion;
      if (vibe) filters.vibe = vibe;
      if (maxPrice) filters.maxPrice = maxPrice;
      filtered = filterGifts(filters);
    }
    return filtered;
  }, [query, festival, occasion, vibe, maxPrice]);

  const festivals = getFestivals();
  const occasions = getOccasions();
  const vibes = getVibes();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {query ? `Results for "${query}"` : 'All Gifts'}
        </h1>
        <SearchBar />
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={festival}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString());
            if (e.target.value) params.set('festival', e.target.value);
            else params.delete('festival');
            window.location.search = params.toString();
          }}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white"
        >
          <option value="">All Festivals</option>
          {festivals.map(f => (
            <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
          ))}
        </select>

        <select
          value={occasion}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString());
            if (e.target.value) params.set('occasion', e.target.value);
            else params.delete('occasion');
            window.location.search = params.toString();
          }}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white"
        >
          <option value="">All Occasions</option>
          {occasions.map(o => (
            <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>
          ))}
        </select>

        <select
          value={vibe}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString());
            if (e.target.value) params.set('vibe', e.target.value);
            else params.delete('vibe');
            window.location.search = params.toString();
          }}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white"
        >
          <option value="">All Vibes</option>
          {vibes.map(v => (
            <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>
          ))}
        </select>

        <select
          value={maxPrice?.toString() || ''}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString());
            if (e.target.value) params.set('maxPrice', e.target.value);
            else params.delete('maxPrice');
            window.location.search = params.toString();
          }}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white"
        >
          <option value="">Any Price</option>
          <option value="500">Under ₹500</option>
          <option value="1000">Under ₹1,000</option>
          <option value="2500">Under ₹2,500</option>
          <option value="5000">Under ₹5,000</option>
        </select>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No gifts found matching your criteria.</p>
          <a href="/search" className="mt-4 inline-block text-amber-600 hover:underline">Clear all filters</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map(gift => (
            <GiftCard key={gift.slug} gift={gift} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-16 text-gray-500">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
