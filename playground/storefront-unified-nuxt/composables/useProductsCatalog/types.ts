import type { Ref } from 'vue';
import type { AsyncDataExecuteOptions, GetProducts, GetProductsArgs, Maybe } from '~/types';

export interface UseProductsCatalogState {
  data: Maybe<Awaited<ReturnType<GetProducts>>>;
  loading: boolean;
}

export type FetchProductsCatalog = (
  params: GetProductsArgs,
) => Promise<(opts?: AsyncDataExecuteOptions) => Promise<void>>;

export interface UseProductsCatalog {
  data: Readonly<Ref<UseProductsCatalogState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchProductsCatalog: FetchProductsCatalog;
}

export type UseProductsCatalogReturn = (id: string) => UseProductsCatalog;
