import Link from 'next/link';
import { Product, toBengaliNumber, getUnitBn } from '@/lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.change.dir === 'up';
  const isDown = product.change.dir === 'down';

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card bg-base-100 border hover:border-emerald-500 hover:shadow-lg transition-all duration-200 rounded-2xl overflow-hidden"
    >
      <div className="p-5 flex flex-col justify-between h-full">
        {/* Top Info */}
        <div className="flex items-start gap-4">
          <span className="text-4xl p-3 bg-slate-100 rounded-2xl flex-shrink-0">
            {product.image || product.categoryIcon}
          </span>
          <div>
            <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{product.nameBn}</h3>
            <span className="text-xs text-gray-500 font-medium">{getUnitBn(product.unit)}</span>
          </div>
        </div>

        {/* Bottom Price Row */}
        <div className="mt-6 pt-3 border-t flex items-end justify-between">
          <div>
            <span className="text-[11px] text-gray-400 font-medium block">আজকের দাম</span>
            <span className="text-xl font-extrabold text-slate-900">
              {toBengaliNumber(product.today)} টাকা
            </span>
          </div>

          {/* Price Change Badge */}
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 ${
              isUp
                ? 'bg-emerald-100 text-emerald-700'
                : isDown
                ? 'bg-rose-100 text-rose-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNumber(Math.abs(product.change.pct))}%
          </span>
        </div>
      </div>
    </Link>
  );
}