// src/components/PriceTicker.tsx
'use client';

export default function PriceTicker() {
  const items = [
    { name: 'স্বর্ণালী চাল', price: '৪৮ টাকা/কেজি', pct: '২.১%', dir: 'up' },
    { name: 'মিনিকোট চাল', price: '৬৯ টাকা/কেজি', pct: '৩.১%', dir: 'down' },
    { name: 'নাজির চাল', price: '৭৪ টাকা/কেজি', pct: '০.০%', dir: 'same' },
    { name: 'বাশমতি চাল', price: '৬৬ টাকা/কেজি', pct: '৩.১%', dir: 'up' },
    { name: 'মসুর ডাল', price: '১৪২ টাকা/কেজি', pct: '২.১%', dir: 'up' },
    { name: 'সয়াবিন তেল', price: '১৯২ টাকা/লিটার', pct: '২.৫%', dir: 'up' },
    { name: 'দেশি পেঁয়াজ', price: '৫৪ টাকা/কেজি', pct: '১২.৫%', dir: 'up' },
  ];

  return (
    <div className="bg-slate-900 text-white text-xs py-2.5 border-b border-slate-800 overflow-hidden flex items-center">
      <div className="max-w-6xl mx-auto px-4 w-full flex items-center gap-3">
        <span className="font-bold text-emerald-400 bg-slate-800 px-2.5 py-1 rounded-md text-[11px] shrink-0 z-10 shadow-sm">
          আজকের টিকার
        </span>
        
        {/* Continuous Infinite Marquee Scroll */}
        <div className="overflow-hidden whitespace-nowrap w-full relative flex items-center">
          <div className="inline-flex gap-8 animate-marquee shrink-0 hover:[animation-play-state:paused]">
            {items.concat(items).map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-2 shrink-0">
                <span className="font-medium text-slate-300">{item.name}</span>
                <span className="font-bold text-white">{item.price}</span>
                <span
                  className={`font-bold text-[10px] px-1.5 py-0.5 rounded ${
                    item.dir === 'up'
                      ? 'text-rose-400 bg-rose-950/60'
                      : item.dir === 'down'
                      ? 'text-emerald-400 bg-emerald-950/60'
                      : 'text-gray-400 bg-slate-800'
                  }`}
                >
                  {item.dir === 'up' ? '▲' : item.dir === 'down' ? '▼' : '—'} {item.pct}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}