'use client';

import { getAllGifts, getFestivals, getOccasions, getRelationships, getVibes } from '@/lib/gifts';
import { GiftCard } from '@/components/GiftCard';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useMemo, useState } from 'react';
import './search.css';

// Price parsing helpers
function getMinPrice(priceRange: string): number {
  const match = priceRange.match(/[\d,]+/g);
  if (!match) return 0;
  return parseInt(match[0].replace(/,/g, ''), 10);
}

function getMaxPrice(priceRange: string): number {
  const match = priceRange.match(/[\d,]+/g);
  if (!match) return 0;
  const val = match[1] || match[0];
  return parseInt(val.replace(/,/g, ''), 10);
}

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get active filter keys from search parameters
  const query = searchParams.get('q') || '';
  const festival = searchParams.get('festival') || '';
  const occasion = searchParams.get('occasion') || '';
  const vibe = searchParams.get('vibe') || '';
  const relationship = searchParams.get('relationship') || '';
  const maxPriceParam = searchParams.get('maxPrice');
  const maxPrice = maxPriceParam ? parseInt(maxPriceParam, 10) : 10000;
  const sortBy = searchParams.get('sort') || 'recommended';

  // State to handle collapsible sidebar groups
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    festival: false,
    occasion: false,
    vibe: false,
    relationship: false,
    price: false,
  });

  // State to handle mobile filter drawer
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Toggle group collapse
  const toggleGroup = (group: string) => {
    setCollapsedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  // Sync route param change helper
  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/search?${params.toString()}`);
  };

  // Clear all active filters
  const handleClearAll = () => {
    router.push('/search');
  };

  // Dynamic filter logic
  const allGifts = useMemo(() => getAllGifts(), []);

  const results = useMemo(() => {
    let filtered = [...allGifts];

    // Search input query
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.categories.vibes?.some(v => v.toLowerCase().includes(q)) ||
        g.categories.occasions?.some(o => o.toLowerCase().includes(q)) ||
        g.categories.festivals?.some(f => f.toLowerCase().includes(q))
      );
    }

    // Category mappings
    if (festival) {
      // Handle valentines plural mapping
      const targetFest = festival === 'valentines' ? 'valentine' : festival;
      filtered = filtered.filter(g => g.categories.festivals?.includes(targetFest));
    }
    if (occasion) {
      filtered = filtered.filter(g => g.categories.occasions?.includes(occasion));
    }
    if (vibe) {
      filtered = filtered.filter(g => g.categories.vibes?.includes(vibe));
    }
    if (relationship) {
      filtered = filtered.filter(g => g.categories.relationships?.includes(relationship));
    }

    // Max Price
    if (maxPrice && maxPrice < 10000) {
      filtered = filtered.filter(g => {
        const minVal = getMinPrice(g.priceRange);
        return minVal <= maxPrice;
      });
    }

    // Sorting
    if (sortBy === 'low-to-high') {
      filtered.sort((a, b) => getMinPrice(a.priceRange) - getMinPrice(b.priceRange));
    } else if (sortBy === 'high-to-low') {
      filtered.sort((a, b) => getMaxPrice(b.priceRange) - getMaxPrice(a.priceRange));
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    }

    return filtered;
  }, [allGifts, query, festival, occasion, vibe, relationship, maxPrice, sortBy]);

  // Compute category item lists and overall database counts
  const festivals = getFestivals();
  const occasions = getOccasions();
  const relationships = getRelationships();
  const vibes = getVibes();

  // Mappings for pretty names
  const prettyName = (id: string) => {
    if (id === 'valentine') return "Valentine's";
    if (id === 'valentines') return "Valentine's";
    if (id === 'raksha-bandhan') return 'Raksha Bandhan';
    return id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const activeChips = useMemo(() => {
    const chips = [];
    if (festival) chips.push({ key: 'festival', label: `Festival: ${prettyName(festival)}` });
    if (occasion) chips.push({ key: 'occasion', label: `Occasion: ${prettyName(occasion)}` });
    if (vibe) chips.push({ key: 'vibe', label: `Vibe: ${prettyName(vibe)}` });
    if (relationship) chips.push({ key: 'relationship', label: `For: ${prettyName(relationship)}` });
    if (maxPrice < 10000) chips.push({ key: 'maxPrice', label: `Price: Under ₹${maxPrice.toLocaleString()}` });
    return chips;
  }, [festival, occasion, vibe, relationship, maxPrice]);

  return (
    <div>
      {/* Search Hero */}
      <section className="search-hero" data-od-id="search-hero">
        <div className="container">
          <span className="search-hero-eyebrow" data-od-id="search-eyebrow">Curated Gifts</span>
          <h1 className="search-hero-title">Find the Perfect Gift</h1>
          <p className="search-hero-desc">
            Search by name, browse by occasion, or filter by vibe — we&apos;ve curated the best so you don&apos;t have to scroll endlessly.
          </p>
          <div className="search-bar" data-od-id="search-bar">
            <svg className="search-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              className="search-input"
              placeholder="Search gifts..."
              aria-label="Search gifts"
              value={query}
              onChange={(e) => updateFilter('q', e.target.value || null)}
              data-od-id="search-input"
            />
          </div>
        </div>
      </section>

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="container">
          <div className="active-filters" id="activeFilters" data-od-id="active-filters">
            {activeChips.map(chip => (
              <button
                key={chip.key}
                onClick={() => updateFilter(chip.key, null)}
                className="filter-chip"
              >
                {chip.label}
                <span className="filter-chip-remove" aria-label="Remove filter">&times;</span>
              </button>
            ))}
            <button onClick={handleClearAll} className="clear-all" id="clearAllFilters">
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* Search Layout Grid */}
      <div className="container">
        {/* Mobile Filter Button */}
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="filter-mobile-trigger"
          id="filterTrigger"
          data-od-id="filter-trigger"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
          </svg>
          Filters
        </button>

        <div className="search-layout">
          {/* Sidebar Filter Panel (Desktop) */}
          <aside className="filter-sidebar" data-od-id="filter-sidebar">
            <div className="filter-panel">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-5)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--theme-border)' }}>
                <h2 className="filter-panel-title" style={{ margin: 0, padding: 0, border: 'none' }}>Filters</h2>
                <button onClick={handleClearAll} className="clear-all" id="filterResetBtn" data-od-id="filter-reset" style={{ font: '500 var(--text-xs) var(--font-body)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)' }}>
                  Reset
                </button>
              </div>

              {/* Occasion Accordion */}
              <div className={`filter-group ${collapsedGroups.occasion ? 'collapsed' : ''}`} data-od-id="filter-occasion">
                <div className="filter-group-header" onClick={() => toggleGroup('occasion')}>
                  <span className="filter-group-label">Occasion</span>
                  <svg className="filter-group-chevron" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
                <div className="filter-group-options">
                  {occasions.map(opt => {
                    const isSelected = occasion === opt;
                    const count = allGifts.filter(g => g.categories.occasions?.includes(opt)).length;
                    return (
                      <div
                        key={opt}
                        onClick={() => updateFilter('occasion', isSelected ? null : opt)}
                        className={`filter-option ${isSelected ? 'selected' : ''}`}
                      >
                        <span className="filter-checkbox"></span>
                        <span className="filter-option-label">{prettyName(opt)}</span>
                        <span className="filter-option-count">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Festival Accordion */}
              <div className={`filter-group ${collapsedGroups.festival ? 'collapsed' : ''}`} data-od-id="filter-festival">
                <div className="filter-group-header" onClick={() => toggleGroup('festival')}>
                  <span className="filter-group-label">Festival</span>
                  <svg className="filter-group-chevron" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
                <div className="filter-group-options">
                  {festivals.map(opt => {
                    // Map key plural for theme switcher matching
                    const mapKey = opt === 'valentine' ? 'valentines' : opt;
                    const isSelected = festival === mapKey;
                    const count = allGifts.filter(g => g.categories.festivals?.includes(opt)).length;
                    return (
                      <div
                        key={opt}
                        onClick={() => updateFilter('festival', isSelected ? null : mapKey)}
                        className={`filter-option ${isSelected ? 'selected' : ''}`}
                      >
                        <span className="filter-checkbox"></span>
                        <span className="filter-option-label">{prettyName(mapKey)}</span>
                        <span className="filter-option-count">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Vibe Accordion */}
              <div className={`filter-group ${collapsedGroups.vibe ? 'collapsed' : ''}`} data-od-id="filter-vibe">
                <div className="filter-group-header" onClick={() => toggleGroup('vibe')}>
                  <span className="filter-group-label">Vibe</span>
                  <svg className="filter-group-chevron" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
                <div className="filter-group-options">
                  {vibes.map(opt => {
                    const isSelected = vibe === opt;
                    const count = allGifts.filter(g => g.categories.vibes?.includes(opt)).length;
                    return (
                      <div
                        key={opt}
                        onClick={() => updateFilter('vibe', isSelected ? null : opt)}
                        className={`filter-option ${isSelected ? 'selected' : ''}`}
                      >
                        <span className="filter-checkbox"></span>
                        <span className="filter-option-label">{prettyName(opt)}</span>
                        <span className="filter-option-count">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Relationship Accordion */}
              <div className={`filter-group ${collapsedGroups.relationship ? 'collapsed' : ''}`} data-od-id="filter-relationship">
                <div className="filter-group-header" onClick={() => toggleGroup('relationship')}>
                  <span className="filter-group-label">Relationship</span>
                  <svg className="filter-group-chevron" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
                <div className="filter-group-options">
                  {relationships.map(opt => {
                    const isSelected = relationship === opt;
                    const count = allGifts.filter(g => g.categories.relationships?.includes(opt)).length;
                    return (
                      <div
                        key={opt}
                        onClick={() => updateFilter('relationship', isSelected ? null : opt)}
                        className={`filter-option ${isSelected ? 'selected' : ''}`}
                      >
                        <span className="filter-checkbox"></span>
                        <span className="filter-option-label">{prettyName(opt)}</span>
                        <span className="filter-option-count">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Group */}
              <div className="filter-group" data-od-id="filter-price">
                <div className="filter-group-header">
                  <span className="filter-group-label">Price Range</span>
                </div>
                <div className="filter-group-options">
                  <div className="price-range-display">
                    <span>Under ₹500</span>
                    <span>₹{maxPrice.toLocaleString()}</span>
                  </div>
                  <div className="price-slider-track">
                    <div
                      className="price-slider-fill"
                      style={{ width: `${((maxPrice - 500) / 9500) * 100}%` }}
                    />
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="500"
                      value={maxPrice}
                      onChange={(e) => updateFilter('maxPrice', e.target.value)}
                      className="price-slider-input"
                      aria-label="Maximum price"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <section className="results-area" data-od-id="results-area">
            <div className="results-header">
              <p className="results-count">
                Showing <strong>{results.length}</strong> Curated Gifts
              </p>
              <select
                value={sortBy}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="sort-select"
                aria-label="Sort results"
                data-od-id="sort-select"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {results.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </div>
                <h2 className="empty-state-title">No Gifts Found</h2>
                <p className="empty-state-desc">
                  We couldn&apos;t find any gifts matching your selection. Try clearing some filters or searching for something else.
                </p>
                <button onClick={handleClearAll} className="btn-primary">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="gift-grid" data-od-id="gift-grid">
                {results.map(gift => (
                  <GiftCard key={gift.slug} gift={gift} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Mobile filter bottom sheet drawer */}
      <div className={`filter-drawer-overlay ${mobileDrawerOpen ? 'open' : ''}`}>
        <div className="filter-drawer">
          <div className="filter-drawer-header">
            <h2 style={{ font: '600 var(--text-lg) var(--font-display)', color: 'var(--theme-text-primary)' }}>Filters</h2>
            <button onClick={() => setMobileDrawerOpen(false)} className="filter-drawer-close">
              &times;
            </button>
          </div>
          <div style={{ overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
            {/* Occasion Option list */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <h3 style={{ font: '600 var(--text-sm) var(--font-body)', marginBottom: 'var(--space-2)' }}>Occasion</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {occasions.map(opt => {
                  const isSelected = occasion === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => updateFilter('occasion', isSelected ? null : opt)}
                      className={`filter-chip ${isSelected ? 'active' : ''}`}
                      style={isSelected ? { background: 'var(--theme-primary)', color: 'white' } : {}}
                    >
                      {prettyName(opt)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Festival Option list */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <h3 style={{ font: '600 var(--text-sm) var(--font-body)', marginBottom: 'var(--space-2)' }}>Festival</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {festivals.map(opt => {
                  const mapKey = opt === 'valentine' ? 'valentines' : opt;
                  const isSelected = festival === mapKey;
                  return (
                    <button
                      key={opt}
                      onClick={() => updateFilter('festival', isSelected ? null : mapKey)}
                      className={`filter-chip ${isSelected ? 'active' : ''}`}
                      style={isSelected ? { background: 'var(--theme-primary)', color: 'white' } : {}}
                    >
                      {prettyName(mapKey)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vibe Option list */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <h3 style={{ font: '600 var(--text-sm) var(--font-body)', marginBottom: 'var(--space-2)' }}>Vibe</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {vibes.map(opt => {
                  const isSelected = vibe === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => updateFilter('vibe', isSelected ? null : opt)}
                      className={`filter-chip ${isSelected ? 'active' : ''}`}
                      style={isSelected ? { background: 'var(--theme-primary)', color: 'white' } : {}}
                    >
                      {prettyName(opt)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Max slider */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <h3 style={{ font: '600 var(--text-sm) var(--font-body)', marginBottom: 'var(--space-2)' }}>Max Price</h3>
              <div className="price-range-display">
                <span>Under ₹500</span>
                <span>₹{maxPrice.toLocaleString()}</span>
              </div>
              <div className="price-slider-track">
                <div
                  className="price-slider-fill"
                  style={{ width: `${((maxPrice - 500) / 9500) * 100}%` }}
                />
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => updateFilter('maxPrice', e.target.value)}
                  className="price-slider-input"
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => setMobileDrawerOpen(false)}
            className="btn-primary"
            style={{ width: '100%', marginTop: 'var(--space-4)' }}
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: 'var(--space-16) 0', textAlign: 'center', color: 'var(--theme-text-secondary)' }}>Loading Search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
