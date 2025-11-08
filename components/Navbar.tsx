import Link from 'next/link';

export default function Navbar() {
  const links = [
    { href: '/', label: '홈' },
    { href: '/constitution', label: '헌법' },
    { href: '/civil', label: '민법' },
    { href: '/criminal', label: '형법' },
    { href: '/commercial', label: '상법' },
    { href: '/summary', label: '요약' },
  ];

  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="max-w-[800px] mx-auto px-4 py-4">
        <ul className="flex flex-wrap justify-center gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-neutral-800 hover:text-neutral-600 transition-colors font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

