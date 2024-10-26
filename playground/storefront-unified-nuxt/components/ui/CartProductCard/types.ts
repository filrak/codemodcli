import type { SfAttribute } from '~/types';

export interface Attribute {
  label: string;
  name: string;
  value: string;
}

export type CartProductCardProps = {
  attributes: SfAttribute[];
  id: string;
  productId: string;
  sku: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
  maxValue: number;
  minValue: number;
  name: string;
  price: string;
  totalPrice: string;
  specialPrice?: string;
  value: number;
  slug: string;
  desiredQuantity?: number;
  outOfStock?: boolean;
  skuFirst?: boolean;
  disabled?: boolean;
};
