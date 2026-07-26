import { CategoryPage } from '@/components/CategoryPage';

export function generateStaticParams() {
  return [
    { slug: 'for-her' },
    { slug: 'for-him' },
    { slug: 'for-parents' },
    { slug: 'for-couple' },
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RelationshipPage({ params }: PageProps) {
  const { slug } = await params;
  return <CategoryPage categoryType="relationships" slug={slug} />;
}
