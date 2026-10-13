// src/app/product/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface MarketRow {
  marketName: string;
  division: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
}

interface ProductDetail {
  id: string | number;
  name: string;
  nameBn: string;
  category: string;
  categoryBn?: string;
  unit: string;
  image?: string;
  categoryIcon?: string;
  today?: number;
  price?: number;
  change?: {
    dir: 'up' | 'down' | 'same';
    pct: number;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const decodedSlug = decodeURIComponent(rawSlug || '');
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  // Protected Route Check with Toast
  useEffect(() => {
    if (!sessionLoading && !session) {
      toast.error('প্রোডাক্ট বিস্তারিত দেখতে অনুগ্রহ করে সাইন-ইন করুন');
      router.push('/signin');
    }
  }, [session, sessionLoading, router]);

  useEffect(() => {
    fetch('https://openapi.programming-hero.com/api/bazardor/products')
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data || [];
        const found = list.find((item: ProductDetail) => 
          String(item.id) === decodedSlug || 
          String(item.name).toLowerCase() === decodedSlug.toLowerCase() || 
          String(item.nameBn).toLowerCase() === decodedSlug.toLowerCase()
        );

        if (!found) {
          setNotFoundState(true);
        } else {
          setProduct(found);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setNotFoundState(true);
      });
  }, [decodedSlug]);

  if (sessionLoading || loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
        <p className="text-xs text-gray-500">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session) return null;

  // যদি অজানা বা ভুল প্রোডাক্ট হয়
  if (notFoundState || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <h1 className="text-6xl font-black text-emerald-600">404</h1>
        <h2 className="text-xl font-bold text-slate-800">পণ্যটি পাওয়া যায়নি</h2>
        <p className="text-sm font-medium text-slate-500 max-w-sm">
          &quot;{decodedSlug}&quot; নামের কোনো পণ্য আমাদের ডাটাবেজে পাওয়া যায়নি।
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

  const basePrice = Number(product?.today || product?.price || 66);

  // বাজারভিত্তিক টেবিল ডাটা
  const marketRows: MarketRow[] = [
    { marketName: 'হাট বাজার', division: 'ময়মনসিংহ', minPrice: basePrice - 5, maxPrice: basePrice + 6, avgPrice: basePrice - 4 },
    { marketName: 'সদর বাজার', division: 'রাজশাহী', minPrice: basePrice - 6, maxPrice: basePrice + 2, avgPrice: basePrice - 3 },
    { marketName: 'বাজারঘাট', division: 'খুলনা', minPrice: basePrice - 6, maxPrice: basePrice + 3, avgPrice: basePrice - 1.5 },
    { marketName: 'রূপসফট বাজার', division: 'রাজশাহী', minPrice: basePrice - 6, maxPrice: basePrice + 4, avgPrice: basePrice - 0 },
    { marketName: 'টাউন বাজার', division: 'ময়মনসিংহ', minPrice: basePrice - 6, maxPrice: basePrice + 5, avgPrice: basePrice - 1.5 },
    { marketName: 'আড়ংঘাটা বাজার', division: 'চট্টগ্রাম', minPrice: basePrice - 7, maxPrice: basePrice + 2, avgPrice: basePrice - 4 },
    { marketName: 'সোকলাহট বাজার', division: 'খুলনা', minPrice: basePrice - 4, maxPrice: basePrice + 5, avgPrice: basePrice - 0.5 },
    { marketName: 'চৌরাস্তা বাজার', division: 'সিলেট', minPrice: basePrice - 5, maxPrice: basePrice + 10, avgPrice: basePrice + 1 },
    { marketName: 'গ্রীন মার্কেট, মিরপুর', division: 'ঢাকা', minPrice: basePrice - 2, maxPrice: basePrice + 10, avgPrice: basePrice + 3.5 },
    { marketName: 'চৌধুরী বাজার', division: 'চট্টগ্রাম', minPrice: basePrice - 3, maxPrice: basePrice + 4, avgPrice: basePrice + 2 },
    { marketName: 'আজমবাজার', division: 'সিলেট', minPrice: basePrice - 18, maxPrice: basePrice + 10, avgPrice: basePrice + 2.5 },
    { marketName: 'তাড়াকান্দা বাজার', division: 'ঢাকা', minPrice: basePrice - 2, maxPrice: basePrice + 4, avgPrice: basePrice + 3 },
  ];

  const allMins = marketRows.map(m => m.minPrice);
  const allMaxs = marketRows.map(m => m.maxPrice);
  const lowestGlobalMin = Math.min(...allMins);
  const highestGlobalMax = Math.max(...allMaxs);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 font-sans">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:underline">হোম</Link>
        <span>›</span>
        <span>{product?.category || 'চাল'}</span>
        <span>›</span>
        <span className="text-slate-800 font-semibold">{product?.nameBn || product?.name}</span>
      </div>

      {/* Top Product Header Card */}
      <div className="bg-white border rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-slate-50 border rounded-2xl flex items-center justify-center text-3xl shadow-sm">
            {product?.image || product?.categoryIcon || '🍚'}
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">{product?.nameBn || product?.name}</h1>
            <p className="text-xs text-gray-400">প্রতি {product?.unit || 'কেজি'} আজকের বাজার দর</p>
            <p className="text-xs text-emerald-600 mt-1 font-medium">গতকালের তুলনায় আজ দাম বেড়েছে ২ টাকা</p>
          </div>
        </div>

        <div className="bg-slate-50 border rounded-2xl p-4 text-right min-w-[140px]">
          <p className="text-[10px] text-gray-400 font-semibold uppercase">আজকের দাম</p>
          <p className="text-xl font-black text-slate-800">{basePrice} <span className="text-xs font-normal">টাকা / {product?.unit || 'কেজি'}</span></p>
          <p className="text-xs text-rose-600 font-bold mt-0.5 flex items-center justify-end gap-0.5">
            <span>▲</span> {product?.change?.pct || '৩.১'}%
          </p>
        </div>
      </div>

      {/* Price Summary Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-700 px-1">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-1">
            <p className="text-xs font-semibold text-slate-400">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-black text-emerald-600">{lowestGlobalMin} টাকা</p>
            <p className="text-[11px] text-gray-400">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-1">
            <p className="text-xs font-semibold text-slate-400">সর্বোচ্চ দাম</p>
            <p className="text-2xl font-black text-rose-600">{highestGlobalMax} টাকা</p>
            <p className="text-[11px] text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-1">
            <p className="text-xs font-semibold text-slate-400">গড় দাম</p>
            <p className="text-2xl font-black text-slate-700">{basePrice} টাকা</p>
            <p className="text-[11px] text-gray-400">প্রতি কেজি-র গড় হিসাব</p>
          </div>
        </div>
      </div>

      {/* Bazar Wise Table */}
      <div className="bg-white border rounded-3xl shadow-sm overflow-hidden space-y-3">
        <div className="p-6 pb-2">
          <h3 className="text-sm font-bold text-slate-800">বাজারভিত্তিক আজকের দাম</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-slate-50/70 text-xs font-bold text-slate-500">
                <th className="py-3 px-6">বাজার</th>
                <th className="py-3 px-6">বিভাগ</th>
                <th className="py-3 px-6">সর্বনিম্ন</th>
                <th className="py-3 px-6">সর্বোচ্চ</th>
                <th className="py-3 px-6">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs text-slate-700">
              {marketRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-slate-800">{row.marketName}</td>
                  <td className="py-3.5 px-6 text-slate-500">{row.division}</td>
                  <td className="py-3.5 px-6 font-medium text-slate-700">{row.minPrice} টাকা</td>
                  <td className="py-3.5 px-6 font-medium text-slate-700">{row.maxPrice} টাকা</td>
                  <td className="py-3.5 px-6 font-bold text-emerald-600">{row.avgPrice} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}