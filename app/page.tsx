import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  const laws = [
    { href: '/constitution', label: '헌법', count: 136 },
    { href: '/civil', label: '민법', count: 1206 },
    { href: '/criminal', label: '형법', count: 400 },
    { href: '/commercial', label: '상법', count: 1196 },
  ];

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-800 mb-4">
          한국 법 공부 기록
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed">
          헌법, 민법, 형법, 상법을 하루 3조문씩 읽으며 기록하는 사이트입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
        {laws.map((law) => (
          <Link key={law.href} href={law.href}>
            <Button
              variant="outline"
              className="w-full h-24 text-lg flex flex-col items-center justify-center gap-2"
            >
              <span className="font-semibold">{law.label}</span>
              <span className="text-sm text-neutral-500">
                {law.count}개 조문
              </span>
            </Button>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/summary">
          <Button variant="ghost" className="text-neutral-600">
            오늘의 학습 요약 보기 →
          </Button>
        </Link>
      </div>
    </div>
  );
}

