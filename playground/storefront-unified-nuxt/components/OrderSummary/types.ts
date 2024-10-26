import type { SfCart } from '~/types';

export type OrderSummaryPropsType = {
  cart: SfCart;
};

export type OrderSummaryPromoCodeProps = {
  couponId?: string;
  totalDiscount: string;
  loading?: boolean;
};
