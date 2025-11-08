import { commercialArticles } from '@/data/commercial';
import LawCard from '@/components/LawCard';
import PaginationControls from '@/components/PaginationControls';

const ITEMS_PER_PAGE = 20;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function CommercialPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const totalPages = Math.ceil(commercialArticles.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentArticles = commercialArticles.slice(startIndex, endIndex);

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">
          상법 조문
        </h1>
        <p className="text-neutral-600">
          전체 {commercialArticles.length}개 조문 중 {startIndex + 1}-{Math.min(endIndex, commercialArticles.length)}번째
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
          baseUrl="/commercial"
        />
      )}
    </div>
  );
}

