'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const categories = [
    { name: 'চাল', icon: '🍚', slug: 'চাল' },
    { name: 'ডাল', icon: '🫘', slug: 'ডাল' },
    { name: 'তেল', icon: '🛢️', slug: 'তেল' },
    { name: 'সবজি', icon: '🥬', slug: 'সবজি' },
    { name: 'মাছ', icon: '🐟', slug: 'মাছ' },
    { name: 'মাংস', icon: '🍗', slug: 'মাংস' },
    { name: 'ডিম-দুধ', icon: '🥛', slug: 'ডিম-দুধ' },
    { name: 'মসলা', icon: '🌶️', slug: 'মসলা' },
  ];

  // Sign out handler
  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      const { error } = await signOut();

      if (error) {
        toast.error(error.message || 'সাইন আউট করা যায়নি');
        return;
      }

      setIsMenuOpen(false);

      // Show success toast before redirect
      toast.success('সফলভাবে সাইন আউট হয়েছে!');

      // Give the toast time to appear
      window.setTimeout(() => {
        router.push('/signin');
      }, 800);
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('সাইন আউট করতে সমস্যা হয়েছে');
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      {/* Top Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-sm shrink-0">
            🛒
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-lg sm:text-xl font-black text-slate-800 leading-none">
              বাজার দর
            </span>
            <span className="text-[10px] text-gray-400 font-medium mt-1">
              বাজারের দর এক নজরে
            </span>
          </div>
        </Link>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            <div className="w-24 h-9 bg-slate-100 rounded-xl animate-pulse" />
          ) : session ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-all border border-slate-200"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    {session.user.name?.charAt(0) || 'U'}
                  </div>
                )}

                <span className="text-xs font-bold text-slate-700">
                  {session.user.name || 'আমার প্রোফাইল'}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 border border-rose-200 hover:bg-rose-50 transition-all disabled:opacity-50"
              >
                {isSigningOut ? 'সাইন আউট হচ্ছে...' : 'সাইন আউট'}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            aria-label={isMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none transition-all"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Floating Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-14 right-4 w-48 bg-white border border-slate-200 rounded-2xl p-2 shadow-xl z-50">
            {isPending ? (
              <div className="p-3 text-xs text-slate-500">
                লোড হচ্ছে...
              </div>
            ) : session ? (
              <div className="space-y-1">
                <div className="px-3 py-2 border-b">
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {session.user.name || 'ব্যবহারকারী'}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {session.user.email}
                  </p>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
                >
                  প্রোফাইল
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="block w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl disabled:opacity-50"
                >
                  {isSigningOut ? 'সাইন আউট হচ্ছে...' : 'সাইন আউট'}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 p-1">
                <Link
                  href="/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all border"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Category Navigation Bar */}
      <div className="border-t bg-slate-50/60">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-6 overflow-x-auto py-2.5 scrollbar-none">
          <Link
            href="/"
            className={`flex items-center gap-1.5 text-xs font-bold transition-all shrink-0 px-2.5 py-1 rounded-xl ${
              pathname === '/'
                ? 'text-emerald-700 bg-emerald-100/60'
                : 'text-slate-600 hover:text-emerald-600'
            }`}
          >
            <span>সব পণ্য</span>
          </Link>

          {categories.map((cat) => {
            const categoryPath = `/category/${encodeURIComponent(cat.slug)}`;
            const isActive = pathname === categoryPath;

            return (
              <Link
                key={cat.name}
                href={categoryPath}
                className={`flex items-center gap-1.5 text-xs font-bold transition-all shrink-0 px-2.5 py-1 rounded-xl ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-100/60'
                    : 'text-slate-700 hover:text-emerald-600'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}