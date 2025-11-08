"use client";

import { constitutionArticles } from "@/data/constitution";
import { civilArticles } from "@/data/civil";
import { criminalArticles } from "@/data/criminal";
import { commercialArticles } from "@/data/commercial";
import LawCard from "@/components/LawCard";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

function getRandomArticles<T>(articles: T[], count: number): T[] {
  const shuffled = [...articles].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function SummaryPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 클라이언트에서만 랜덤 조문 선택 (Hydration 문제 방지)
    setArticles([
      ...getRandomArticles(constitutionArticles, 2),
      ...getRandomArticles(civilArticles, 2),
      ...getRandomArticles(criminalArticles, 2),
      ...getRandomArticles(commercialArticles, 2),
    ]);
    setIsLoaded(true);
  }, []);

  const refreshArticles = () => {
    setArticles([
      ...getRandomArticles(constitutionArticles, 2),
      ...getRandomArticles(civilArticles, 2),
      ...getRandomArticles(criminalArticles, 2),
      ...getRandomArticles(commercialArticles, 2),
    ]);
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">
          오늘의 학습 요약
        </h1>
        <p className="text-neutral-600">
          각 법률에서 랜덤으로 선택된 조문입니다. 버튼을 클릭하면 다른 조문을 볼
          수 있습니다.
        </p>
      </div>

      {!isLoaded ? (
        <div className="space-y-6">
          <div className="text-center py-12 text-neutral-500">
            조문을 불러오는 중...
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {articles.map((article) => (
              <LawCard key={article.id} article={article} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button onClick={refreshArticles} size="lg">
              다른 조문 보기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
