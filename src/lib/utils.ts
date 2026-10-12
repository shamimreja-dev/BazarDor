export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
  markets: Market[];
}


export function toBengaliNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '০';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}


export function getUnitBn(unit: string): string {
  const units: Record<string, string> = {
    kg: 'প্রতি কেজি',
    liter: 'প্রতি লিটার',
    l: 'প্রতি লিটার',
    dozen: 'প্রতি ডজন',
    piece: 'প্রতি পিস',
    pcs: 'প্রতি পিস'
  };
  return units[unit.toLowerCase()] || `প্রতি ${unit}`;
}