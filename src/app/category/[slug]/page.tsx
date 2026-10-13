// src/app/category/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard, { Product } from '@/components/ProductCard';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = decodeURIComponent((params?.slug as string) || '');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');

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

  const filtered = products.filter((item) => {
    const cat = (item.category || '').toLowerCase();
    const catBn = (item.categoryBn || item.categoryNameBn || '').toLowerCase();
    const target = categorySlug.toLowerCase();

    return (
      cat === target ||
      catBn === target ||
      cat.includes(target) ||
      catBn.includes(target)
    );
  });

  const sortedProducts = [...filtered].sort((a, b) => {
    const priceA = Number(a.today || a.price || 0);
    const priceB = Number(b.today || b.price || 0);

    if (sortBy === 'low-high') return priceA - priceB;
    if (sortBy === 'high-low') return priceB - priceA;
    return 0;
  });

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white border rounded-2xl p-6 shadow-sm animate-pulse flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
          <div className="space-y-2">
            <div className="w-32 h-6 bg-slate-100 rounded"></div>
            <div className="w-48 h-4 bg-slate-100 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border rounded-2xl p-4 space-y-3 animate-pulse h-32">
              <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
              <div className="w-3/4 h-4 bg-slate-100 rounded"></div>
              <div className="w-1/2 h-6 bg-slate-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <h1 className="text-6xl font-black text-emerald-600">404</h1>
        <h2 className="text-xl font-bold text-slate-800">কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-sm font-medium text-slate-500 max-w-sm">
          &quot;{categorySlug}&quot; ক্যাটাগরি বা ইউআরএলটি সঠিক নয় অথবা কোনো পণ্য উপলব্ধ নেই।
        </p>
        <Link
          href="/"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-sm"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 font-sans">
      <div className="bg-white border rounded-2xl p-6 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-50 border rounded-full flex items-center justify-center text-2xl shrink-0">
          {filtered[0]?.image || filtered[0]?.categoryIcon || '🛒'}
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-800">{categorySlug}</h1>
          <p className="text-xs text-gray-400 mt-0.5">প্রতি পণ্যের আজকের বাজার দর ও পরিবর্তন</p>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-4 shadow-sm flex justify-end items-center">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500">সাজান:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-700 cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">দাম: কম থেকে বেশি</option>
            <option value="high-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-400 mb-4 font-semibold px-1">
          মোট {sortedProducts.length} টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id || product.name} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}