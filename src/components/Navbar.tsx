'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Product, toBengaliNumber } from '@/lib/utils';
import { useSession, signOut } from '@/lib/auth-client';
import { useState } from 'react';

interface NavbarProps {
  products: Product[];
}

export default function Navbar({ products }: NavbarProps) {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Unique Categories Extract
  const categories = Array.from(
    new Map(
      (products || []).map((p) => [
        p.category,
        { slug: p.category, nameBn: p.categoryNameBn, icon: p.categoryIcon },
      ])
    ).values()
  );

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      {/* 1. Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Bangla Date */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-sm">
            🛒
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 leading-tight">বাজার দর</h1>
            <p className="text-[11px] text-gray-500 font-medium">সোমবার, ১২ অক্টোবর, ২০২৬</p>
          </div>
        </Link>

        {/* Right Side Auth Condition (Figma Style) */}
        <div>
          {isPending ? (
            <div className="w-28 h-9 bg-gray-100 rounded-full animate-pulse"></div>
          ) : session ? (
            /* Logged In State: Profile Image + Name + Dropdown */
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-slate-50 border hover:bg-slate-100 px-3 py-1.5 rounded-full transition-all text-sm font-semibold text-slate-800"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="w-7 h-7 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    {session.user.name?.charAt(0) || 'U'}
                  </div>
                )}
                <span>{session.user.name || 'Rezwan'}</span>
                <span className="text-xs text-gray-400">▾</span>
              </button>

              {/* Profile Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-2xl shadow-lg py-2 z-50 text-sm">
                  <div className="px-4 py-2 border-b">
                    <p className="font-bold text-slate-800">{session.user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    মাই প্রোফাইল
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      signOut();
                    }}
                    className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 font-medium"
                  >
                    সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Not Logged In State: Sign In + Sign Up Buttons */
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-all shadow-sm"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 2. Category Nav Row */}
      <div className="border-t bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 overflow-x-auto py-2.5 text-xs sm:text-sm font-semibold text-gray-600">
          <Link
            href="/"
            className={`whitespace-nowrap px-3 py-1 rounded-full transition-all ${
              pathname === '/' ? 'bg-emerald-600 text-white font-bold' : 'hover:text-emerald-600'
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
                className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1 rounded-full transition-all ${
                  isActive ? 'bg-emerald-600 text-white font-bold' : 'hover:text-emerald-600'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
       
          {/* Marquee Ticker */}
          <div className="bg-slate-900 text-white overflow-hidden py-2 text-xs relative">
              <div className="animate-marquee flex gap-8 items-center">
                  {/* প্রথমবার পণ্যের তালিকা */}
                  {(products || []).concat(products || []).map((item, index) => {
                      const isUp = item.change?.dir === 'up';
                      const isDown = item.change?.dir === 'down';
                      return (
                          <div key={`${item.id}-${index}`} className="flex items-center gap-2 whitespace-nowrap">
                              <span>{item.image || item.categoryIcon}</span>
                              <span className="font-semibold">{item.nameBn}</span>
                              <span className="text-amber-400">{toBengaliNumber(item.today)} টাকা/{item.unit}</span>
                              <span className={`font-bold text-[10px] ${isUp ? 'text-green-400' : isDown ? 'text-red-400' : 'text-gray-400'}`}>
                                  {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNumber(Math.abs(item.change?.pct || 0))}%
                              </span>
                          </div>
                      );
                  })}
              </div>
          </div>
        
    </header>
  );
}