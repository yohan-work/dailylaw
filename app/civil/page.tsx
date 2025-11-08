import { civilArticles } from '@/data/civil';
import LawCard from '@/components/LawCard';
import PaginationControls from '@/components/PaginationControls';

const ITEMS_PER_PAGE = 20;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function CivilPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const totalPages = Math.ceil(civilArticles.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentArticles = civilArticles.slice(startIndex, endIndex);

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">
          민법 조문
        </h1>
        <p className="text-neutral-600">
          전체 {civilArticles.length}개 조문 중 {startIndex + 1}-{Math.min(endIndex, civilArticles.length)}번째
        </p>
      </div>

      <div className="space-y-6">
        {currentArticles.map((article) => (
          <LawCard key={article.id} article={article} />
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/civil"
        />
      )}
    </div>
  );
}

