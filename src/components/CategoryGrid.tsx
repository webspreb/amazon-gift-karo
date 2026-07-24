import Link from 'next/link';

interface CategoryItem {
  href: string;
  label: string;
  icon: string;
}

interface CategoryGridProps {
  title: string;
  categories: CategoryItem[];
}

export function CategoryGrid({ title, categories }: CategoryGridProps) {
  return (
    <section className="py-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map(cat => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md hover:border-amber-200"
          >
            <span className="text-3xl mb-2">{cat.icon}</span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-amber-600">{cat.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
