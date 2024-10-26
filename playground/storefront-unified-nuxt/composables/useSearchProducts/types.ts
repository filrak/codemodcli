import type { Ref } from 'vue';
import type { SearchProducts, SearchProductsArgs } from '~/types';
import type { Maybe } from '~/types';

export type Sort = SearchProductsArgs['sortBy'];
type SearchProductsReturn = Awaited<ReturnType<SearchProducts>>;
type Query = {
  currentPage: number;
  sortBy: Sort;
  search?: string;
  category?: string;
  facets?: {
    [name: string]: string[];
  };
};

export interface UseSearchProductsState {
  data: Maybe<SearchProductsReturn>;
  loading: boolean;
  query: Query;
}

export type FetchProducts = () => Promise<Ref<Maybe<SearchProductsReturn>>>;
export type ClearFilters = () => void;
export type SetFiltersInQuery = (query: Partial<Query>) => void;
export type SetPageInQuery = (page: number) => void;
export type SetSortInQuery = (sort?: Sort) => void;
export type WatchQuery = () => void;

export interface UseSearchProducts {
  data: Readonly<Ref<UseSearchProductsState['data']>>;
  query: Readonly<Ref<UseSearchProductsState['query']>>;
  loading: Readonly<Ref<boolean>>;
  fetchProducts: FetchProducts;
  clearFilters: ClearFilters;
  setFiltersInQuery: SetFiltersInQuery;
  setPageInQuery: SetPageInQuery;
  setSortInQuery: SetSortInQuery;
  watchQuery: WatchQuery;
}

export type UseSearchProductsReturn = () => UseSearchProducts;
