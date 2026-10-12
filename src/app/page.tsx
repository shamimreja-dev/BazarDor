// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProductCard, { Product } from '@/components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://openapi.programming-hero.com/api/bazardor/products')
      .then((res) => res.json())
      .then((data) => {
        const list: Product[] = Array.isArray(data) ? data : data.data || [];
        setProducts(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const priceIncreased = products.filter((item) => {
    const dir = item.change?.dir || item.dir;
    const pct = item.change?.pct || item.pct || 0;
    return dir === 'up' || pct > 0;
  });

  const priceDecreased = products.filter((item) => {
    const dir = item.change?.dir || item.dir;
    const pct = item.change?.pct || item.pct || 0;
    return dir === 'down' || pct < 0;
  });

  if (loading) {
    return (
      <div className="space-y-8 max-w-6xl mx-auto px-4 py-6 font-sans">
        <div className="bg-white border rounded-3xl p-8 shadow-sm animate-pulse flex justify-between items-center h-48">
          <div className="space-y-3 w-1/2">
            <div className="h-4 bg-slate-100 rounded w-1/3"></div>
            <div className="h-8 bg-slate-100 rounded w-3/4"></div>
            <div className="h-4 bg-slate-100 rounded w-full"></div>
          </div>
          <div className="w-32 h-32 bg-slate-100 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border rounded-2xl p-4 space-y-3 animate-pulse h-32">
              <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
              <div className="h-4 bg-slate-100 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-6xl mx-auto px-4 py-6 font-sans">
      {/* 1. Hero Banner */}
      <div className="bg-white border rounded-3xl p-5 sm:p-8 shadow-sm flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left max-w-xl">
          <span className="inline-block bg-emerald-50 text-emerald-700 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
            মঙ্গলবার, ১৩ অক্টোবর, ২০২৬
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম &mdash; বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm transition-all shadow-sm">
            সব পণ্য দেখুন
          </button>
        </div>

        <div className="shrink-0 relative w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52">
          <Image
            src="/images/basket.png"
            alt="Market Basket"
            fill
            sizes="(max-width: 768px) 128px, 208px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* 2. Section: আজ দাম বেড়েছে */}
      {priceIncreased.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-rose-100 text-rose-600 text-xs font-bold px-3 py-1 rounded-full border border-rose-200">
              ▲ আজ দাম বেড়েছে
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {priceIncreased.slice(0, 6).map((product) => (
              <ProductCard key={`up-${product.id || product.name}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 3. Section: আজ দাম কমেছে */}
      {priceDecreased.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              ▼ আজ দাম কমেছে
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {priceDecreased.slice(0, 6).map((product) => (
              <ProductCard key={`down-${product.id || product.name}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Section: সব পণ্য */}
      <section className="space-y-4 pt-2">
        <div>
          <h2 className="text-xl font-black text-slate-800">সব পণ্য</h2>
          <p className="text-xs text-gray-400 mt-1 font-semibold">
            মোট {products.length} টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={`all-${product.id || product.name}`} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}