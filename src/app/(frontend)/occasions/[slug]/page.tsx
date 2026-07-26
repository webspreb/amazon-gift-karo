import { CategoryPage } from '@/components/CategoryPage';

export function generateStaticParams() {
  return [
    { slug: 'birthday' },
    { slug: 'anniversary' },
    { slug: 'wedding' },
    { slug: 'housewarming' },
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function OccasionPage({ params }: PageProps) {
  const { slug } = await params;
  return <CategoryPage categoryType="occasions" slug={slug} />;
}
