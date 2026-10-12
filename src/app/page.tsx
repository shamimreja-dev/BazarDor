// src/app/page.tsx
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/utils';

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products', { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  // Risers & Fallers
  const topRisers = products.filter((p) => p.change.dir === 'up').slice(0, 6);
  const topFallers = products.filter((p) => p.change.dir === 'down').slice(0, 6);

  return (
    <div className="bg-slate-50/50 min-h-screen pb-16 space-y-10">
      {/* Figma Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 pt-8">
        <div className="bg-[#EBF7F2] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-100">
          <div className="space-y-4 max-w-xl">
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full">
              সোমবার, ১২ অক্টোবর, ২০২৬
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <a
              href="#সব-পণ্য"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-sm text-sm"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          <div className="text-8xl p-6 bg-white rounded-3xl shadow-sm border border-emerald-50">
            🧺
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Section A — আজ দাম বেড়েছে ▲ */}
        {topRisers.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-rose-600 text-lg">▲</span>
              <h2 className="text-xl font-bold text-slate-800">আজ দাম বেড়েছে</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {topRisers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Section B — আজ দাম কমেছে ▼ */}
        {topFallers.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-emerald-600 text-lg">▼</span>
              <h2 className="text-xl font-bold text-slate-800">আজ দাম কমেছে</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {topFallers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Section C — সব পণ্য */}
        <section id="সব-পণ্য" className="pt-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800">সব পণ্য</h2>
            <p className="text-xs text-gray-400">আজকের বাজারের সকল পণ্যের তালিকা</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}