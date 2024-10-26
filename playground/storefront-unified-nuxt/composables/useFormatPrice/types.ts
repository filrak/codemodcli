import type { SfMoney } from '~/types';

type PriceLike = Omit<SfMoney, 'precisionAmount'>;

export type FormatPrice = (price: PriceLike) => string;

export interface UseFormatPrice {
  formatPrice: FormatPrice;
}

export type UseFormatPriceReturn = () => UseFormatPrice;
