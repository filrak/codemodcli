import type { SfOrderLineItem, SfProduct } from '~/types';

export type ProductCardHorizontalProduct = Pick<SfProduct, 'name' | 'gallery' | 'attributes'>;

export type ProductCardHorizontalOrderLineItem = Pick<SfOrderLineItem, 'productName' | 'attributes' | 'image'>;

export type ProductHorizontalProps = {
  product: ProductCardHorizontalProduct | ProductCardHorizontalOrderLineItem;
};
