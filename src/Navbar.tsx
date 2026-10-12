// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Product, toBengaliNumber, getUnitBn } from '@/lib/utils';
import { useSession, signOut } from '@/lib/auth-client'; // BetterAuth Client

interface NavbarProps {
  products: Product[];
}

export default function Navbar({ products }: NavbarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Unique Categories Extract
  const categories = Array.from(
    new Map(
      products.map((p) => [
        p.category,
        { slug: p.category, nameBn: p.categoryNameBn, icon: p.categoryIcon },
      ])
    ).values()
  );

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-sm border-b">
      {/* 1. Top Navbar */}
      <div className="navbar max-w-7xl mx-auto px-4 justify-between">
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-black text-emerald-600 flex items-center gap-1">
            🛒 বাজার দর
          </span>
          <span className="text-[11px] text-gray-500 font-medium">
            সোম, ১২ অক্টোবর ২০২৬
          </span>
        </Link>

        {/* Right Auth Buttons */}
        <div>
          {session ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                  {session.user.name?.charAt(0) || 'U'}
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-50">
                <li><Link href="/profile">মাই প্রোফাইল</Link></li>
                <li><button onClick={() => signOut()}>সাইন আউট</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/signin" className="btn btn-outline btn-emerald btn-sm sm:btn-md">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-emerald bg-emerald-600 hover:bg-emerald-700 text-white btn-sm sm:btn-md">সাইন আপ</Link>
            </div>
          )}
        </div>
      </div>

      {/* 2. Middle Category Navigation Bar */}
      <div className="bg-emerald-50 border-y border-emerald-100 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full font-medium transition-all ${
              pathname === '/' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-700 hover:bg-emerald-200'
            }`}
          >
            সব পণ্য
          </Link>
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`px-4 py-1.5 rounded-full font-medium transition-all flex items-center gap-1 ${
                  isActive ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-700 hover:bg-emerald-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. Infinite Scrolling Price Ticker (Marquee) */}
      <div className="bg-slate-900 text-white overflow-hidden py-2 text-xs sm:text-sm">
        <div className="flex whitespace-nowrap animate-marquee gap-8">
          {products.map((item) => {
            const isUp = item.change.dir === 'up';
            const isDown = item.change.dir === 'down';
            return (
              <div key={item.id} className="flex items-center gap-2">
                <span>{item.image || item.categoryIcon}</span>
                <span className="font-semibold">{item.nameBn}</span>
                <span className="text-amber-400">{toBengaliNumber(item.today)} টাকা/{item.unit}</span>
                <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                  isUp ? 'text-green-400 bg-green-950' : isDown ? 'text-red-400 bg-red-950' : 'text-gray-400'
                }`}>
                  {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNumber(Math.abs(item.change.pct))}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}