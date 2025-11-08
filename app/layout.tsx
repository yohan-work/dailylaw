import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: '한국 법 공부 기록',
  description: '헌법, 민법, 형법, 상법을 하루 3조문씩 읽으며 기록하는 사이트입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen bg-white">
          {children}
        </main>
        <footer className="border-t border-neutral-200 bg-white py-6">
          <div className="max-w-[800px] mx-auto px-4 text-center text-neutral-500 text-sm">
            © 2025 햄
          </div>
        </footer>
      </body>
    </html>
  );
}

