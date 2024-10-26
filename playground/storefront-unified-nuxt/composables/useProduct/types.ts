import type { Ref } from 'vue';
import type { GetProductDetails, Maybe } from '~/types';

type GetProductDetailsReturn = Awaited<ReturnType<GetProductDetails>>;

export interface UseProductState {
  data: Maybe<GetProductDetailsReturn>;
  loading: boolean;
}

export type FetchProduct = () => Promise<Ref<Maybe<GetProductDetailsReturn>>>;

export interface UseProduct {
  data: Readonly<Ref<UseProductState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchProduct: FetchProduct;
}

export type UseProductReturn = (id: string, sku?: string) => UseProduct;
