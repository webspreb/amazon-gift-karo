import { CategoryPage } from '@/components/CategoryPage';

export function generateStaticParams() {
  return [
    { slug: 'diwali' },
    { slug: 'holi' },
    { slug: 'valentines' },
    { slug: 'christmas' },
    { slug: 'raksha-bandhan' },
    { slug: 'eid' },
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function FestivalPage({ params }: PageProps) {
  const { slug } = await params;
  return <CategoryPage categoryType="festivals" slug={slug} />;
}
