import type { Maybe, SfDiscountablePrice } from '~/types';

export type ProductCardProps = {
  description?: string;
  disabled?: boolean;
  imageAlt?: string;
  imageUrl: string;
  lazy?: boolean;
  name: string;
  price: Maybe<SfDiscountablePrice>;
  priority?: boolean;
  productId: string;
  rating?: number;
  ratingCount?: number;
  sku?: Maybe<string>;
  slug?: string;
  showAddToCartButton?: boolean;
  isLazyLoadingData?: boolean;
};
