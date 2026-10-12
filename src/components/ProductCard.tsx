// src/components/ProductCard.tsx
import Link from 'next/link';
import { Product, toBengaliNumber, getUnitBn } from '@/lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.change.dir === 'up';
  const isDown = product.change.dir === 'down';

  return (
    <Link
      href={`/product/${product.slug}`}
      className="bg-white border rounded-2xl p-4 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl p-2.5 bg-slate-50 rounded-xl flex-shrink-0">
          {product.image || product.categoryIcon}
        </span>
        <div>
          <h3 className="font-bold text-base text-slate-800">{product.nameBn}</h3>
          <p className="text-xs text-gray-400">{getUnitBn(product.unit)}</p>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t flex items-end justify-between">
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">আজকের দাম</span>
          <span className="text-lg font-black text-slate-900">
            {toBengaliNumber(product.today)} টাকা
          </span>
        </div>

        <span
          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg flex items-center gap-1 ${
            isUp
              ? 'bg-rose-50 text-rose-600'
              : isDown
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-gray-50 text-gray-500'
          }`}
        >
          {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNumber(Math.abs(product.change.pct))}%
        </span>
      </div>
    </Link>
  );
}