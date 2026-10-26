export type PisangVariantId =
  | 'pisang_mini'
  | 'pisang_kecil'
  | 'pisang_sedang'
  | 'pisang_besar'
  | 'pisang_jumbo'
  | 'pisang_baby_super'
  | 'pisang_baby_premium';

export type OrderItemKey = 'croissant' | PisangVariantId;

export type TrayQuantities = Record<OrderItemKey, number>;

export interface PisangVariantSpec {
  id: PisangVariantId;
  name: string;
  shortLabel: string;
  priceK: number;
  priceDisplay: string;
}

export const PISANG_VARIANTS: PisangVariantSpec[] = [
  {
    id: 'pisang_mini',
    name: 'Paket Mini (M)',
    shortLabel: 'Mini (M)',
    priceK: 50,
    priceDisplay: 'Rp50.000',
  },
  {
    id: 'pisang_kecil',
    name: 'Paket Kecil (K)',
    shortLabel: 'Kecil (K)',
    priceK: 40,
    priceDisplay: 'Rp40.000',
  },
  {
    id: 'pisang_sedang',
    name: 'Paket Sedang (S)',
    shortLabel: 'Sedang (S)',
    priceK: 45,
    priceDisplay: 'Rp45.000',
  },
  {
    id: 'pisang_besar',
    name: 'Paket Besar (B)',
    shortLabel: 'Besar (B)',
    priceK: 50,
    priceDisplay: 'Rp50.000',
  },
  {
    id: 'pisang_jumbo',
    name: 'Paket Jumbo (J)',
    shortLabel: 'Jumbo (J)',
    priceK: 60,
    priceDisplay: 'Rp60.000',
  },
  {
    id: 'pisang_baby_super',
    name: 'Baby Banana/Irisan - Super',
    shortLabel: 'Baby Super',
    priceK: 40,
    priceDisplay: 'Rp40.000',
  },
  {
    id: 'pisang_baby_premium',
    name: 'Baby Banana/Irisan - Premium',
    shortLabel: 'Baby Premium',
    priceK: 75,
    priceDisplay: 'Rp75.000',
  },
];

