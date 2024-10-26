import type { Ref } from 'vue';
import { SfProductCatalogItem } from '~/types';
import type { UseSearchProductsState, UseSearchProducts } from '../useSearchProducts';

export interface UseLazySearchProductsState extends UseSearchProductsState {
  lazyLoading: boolean;
}

export interface UseLazySearchProducts extends UseSearchProducts {
  lazyLoading: Readonly<Ref<boolean>>;
}

export type LazyLoadFnReturn = Partial<SfProductCatalogItem[]>;
export type LazyLoadFn = (args: unknown) => Promise<LazyLoadFnReturn>;
