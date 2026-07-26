'use client';

import Link from 'next/link';

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  count: number;
  type: string; // 'festival', 'occasion', 'vibe', etc.
}

interface CategoryGridProps {
  title: string;
  categories: CategoryItem[];
}

export function CategoryGrid({ title, categories }: CategoryGridProps) {
  return (
    <div style={{ marginBottom: 'var(--space-16)' }}>
      <h3 style={{
        font: '600 var(--text-2xl) var(--font-display)',
        color: 'var(--theme-text-primary)',
        marginBottom: 'var(--space-6)',
        textAlign: 'center'
      }}>
        {title}
      </h3>
      <div className="category-grid" role="list">
        {categories.map(cat => (
          <Link
            key={cat.id}
            href={
              cat.type === 'festival' ? `/festivals/${cat.id}` :
              cat.type === 'occasion' ? `/occasions/${cat.id}` :
              cat.type === 'vibe' ? `/vibes/${cat.id}` :
              `/search?${cat.type}=${cat.id}`
            }
            className="category-card"
            role="listitem"
            data-od-id={`cat-${cat.type}-${cat.id}`}
            aria-label={`${cat.name} (${cat.count} gifts)`}
          >
            <span className="category-icon" aria-hidden="true">{cat.icon}</span>
            <h4 className="category-name" data-od-id={`cat-name-${cat.type}-${cat.id}`}>
              {cat.name}
            </h4>
            <span className="category-type" data-od-id={`cat-count-${cat.type}-${cat.id}`}>
              {cat.count} {cat.count === 1 ? 'gift' : 'gifts'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
