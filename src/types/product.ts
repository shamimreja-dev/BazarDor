// src/types/product.ts
export interface ProductChange {
  dir: 'up' | 'down' | 'same';
  pct: number;
}

export interface Product {
  id?: string;
  name: string;
  nameBn?: string;
  category: string;
  categoryBn?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  image?: string;
  unit: string;
  today?: number;
  price?: number;
  change?: ProductChange;
  dir?: 'up' | 'down' | 'same';
  pct?: number;
}