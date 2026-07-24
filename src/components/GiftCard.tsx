import { GiftEntry } from '@/lib/types';
import Link from 'next/link';

interface GiftCardProps {
  gift: GiftEntry;
}

export function GiftCard({ gift }: GiftCardProps) {
  const categoryTags = [
    ...(gift.categories.vibes ?? []).slice(0, 2),
  ];

  return (
    <div className="group rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md overflow-hidden">
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
          {gift.title.charAt(0)}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {categoryTags.map(tag => (
            <span key={tag} className="inline-block rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 capitalize">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-amber-600 transition-colors">
          <Link href={`/gift/${gift.slug}`}>
            {gift.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">{gift.description}</p>
        <p className="text-sm font-medium text-gray-700">{gift.priceRange}</p>
        <a
          href={gift.amazonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600"
          onClick={(e) => e.stopPropagation()}
        >
          View on Amazon →
        </a>
      </div>
    </div>
  );
}
