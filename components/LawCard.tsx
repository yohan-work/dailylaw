import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LawArticle {
  id: string;
  articleNumber: string;
  title?: string;
  content: string;
  summary?: string;
  example?: string;
  importance?: number;
}

interface LawCardProps {
  article: LawArticle;
}

export default function LawCard({ article }: LawCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg text-neutral-800">
          {article.articleNumber}
          {article.title && ` ${article.title}`}
          {article.importance && (
            <span className="ml-2 text-sm text-neutral-500">
              (중요도: {article.importance}/5)
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
          {article.content}
        </p>
        
        {article.summary && (
          <div className="pt-2 border-t border-neutral-100">
            <p className="text-sm font-medium text-neutral-600 mb-1">
              쉬운 요약:
            </p>
            <p className="text-sm text-neutral-600">
              {article.summary}
            </p>
          </div>
        )}
        
        {article.example && (
          <div className="pt-2 border-t border-neutral-100">
            <p className="text-sm font-medium text-neutral-600 mb-1">
              사례:
            </p>
            <p className="text-sm text-neutral-600 italic">
              {article.example}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

