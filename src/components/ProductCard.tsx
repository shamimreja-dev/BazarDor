// src/components/ProductCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

export interface Product {
  id?: string;
  name: string;
  nameBn?: string;
  slug?: string;
  category: string;
  categoryBn?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  image?: string;
  unit: string;
  today?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  price?: number;
  change?: {
    dir: 'up' | 'down' | 'same';
    pct: number;
  };
  dir?: 'up' | 'down' | 'same';
  pct?: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const price = product.today ?? product.price ?? 0;
  const changeDir = product.change?.dir || product.dir || 'same';
  const changePct = product.change?.pct ?? product.pct ?? 0;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      // Signin kora na thakle signup page-e pathabe
      router.push('/signup');
    } else {
      // Signin kora thakle product details page-e pathabe
      const productId = product.id || encodeURIComponent(product.name);
      router.push(`/product/${productId}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all flex flex-col justify-between space-y-4 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-50 border rounded-xl flex items-center justify-center text-xl shrink-0">
            {product.image || product.categoryIcon || '🍚'}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm leading-snug hover:text-emerald-600 transition-colors">
              {product.nameBn || product.name}
            </h3>
            <p className="text-[11px] text-gray-400 font-medium">
              {product.unit || 'প্রতি কেজি'}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-end justify-between">
        <div>
          <span className="text-[10px] text-gray-400 block font-semibold">আজকের দাম</span>
          <span className="text-base font-black text-slate-800">{price} টাকা</span>
        </div>

        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
            changeDir === 'up'
              ? 'text-rose-600 bg-rose-50 border border-rose-100'
              : changeDir === 'down'
              ? 'text-emerald-600 bg-emerald-50 border border-emerald-100'
              : 'text-gray-500 bg-slate-50 border border-slate-200'
          }`}
        >
          {changeDir === 'up' ? '▲' : changeDir === 'down' ? '▼' : '—'} {changePct}%
        </span>
      </div>
    </div>
  );
}