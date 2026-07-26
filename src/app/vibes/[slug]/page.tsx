import { CategoryPage } from '@/components/CategoryPage';

export function generateStaticParams() {
  return [
    { slug: 'romantic' },
    { slug: 'sentimental' },
    { slug: 'unique' },
    { slug: 'funny' },
    { slug: 'luxury' },
    { slug: 'budget-friendly' },
    { slug: 'traditional' },
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function VibePage({ params }: PageProps) {
  const { slug } = await params;
  return <CategoryPage categoryType="vibes" slug={slug} />;
}
