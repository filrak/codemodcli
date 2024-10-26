import type { Ref } from 'vue';
import type { GetProductDetails, Maybe, SfProduct } from '~/types';

type GetProductDetailsReturn = Awaited<ReturnType<GetProductDetails>>;

export interface UseLazyProductState {
  data: Maybe<GetProductDetailsReturn>;
  loading: boolean;
  lazyLoading: boolean;
}

export interface UseLazyLoadProduct {
  data: Readonly<Ref<UseLazyProductState['data']>>;
  loading: Readonly<Ref<boolean>>;
  lazyLoading: Readonly<Ref<boolean>>;
  fetchProduct: FetchProduct;
}

export type LazyLoadFnReturn = Partial<SfProduct>;
export type LazyLoadFn = (id: string, sku?: string) => Promise<LazyLoadFnReturn>;
