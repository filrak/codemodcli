import { toRefs } from '@vueuse/core';
import {
  ClearFilters,
  FetchProducts,
  WatchQuery,
  SetFiltersInQuery,
  UseSearchProductsReturn,
  UseSearchProductsState,
  SetPageInQuery,
  SetSortInQuery,
} from './types';

/**
 * @description
 * A composable function that provides search functionality for products.
 * It uses the `unified.searchProducts` method from the SDK to fetch products based on the current query parameters.
 * It also provides methods to update the query parameters and watch for changes in the query parameters.
 *
 * @returns An object containing the following properties and methods:
 * - `data`: The fetched product data.
 * - `loading`: A boolean indicating whether the data is currently being fetched.
 * - `fetchProducts`: A function that fetches the products based on the current query parameters.
 * - `clearFilters`: A function that clears all the filters and fetches the products again.
 * - `setFiltersInQuery`: A function that updates the query parameters with the given filters.
 * - `setPageInQuery`: A function that updates the query parameters with the given page number.
 * - `setSortInQuery`: A function that updates the query parameters with the given sort option.
 * - `watchQuery`: A function that watches for changes in the query parameters and fetches
 * the products again when there is a change.
 *
 * @example
 * const { data: products, loading, fetchProducts, watchQuery } = useSearchProducts();
 * watchQuery();
 * await fetchProducts();
 */
export const useSearchProducts: UseSearchProductsReturn = () => {
  const state = useState<UseSearchProductsState>('search-products', () => ({
    data: null,
    loading: false,
    query: {
      currentPage: 1,
      sortBy: 'relevant',
    },
  }));

  const router = useRouter();
  const { currency } = storeToRefs(useSfState());

  const parseRoute = () => {
    const query = router.currentRoute.value.query as Record<string, string | string[]>;
    const protectedNames = new Set(['sort', 'page', 'search']);

    state.value.query.category = router.currentRoute.value.params?.slugs?.at(-1);

    state.value.query.facets = Object.entries(query).reduce<Record<string, string[]>>(
      (acc, [facetName, facetValues]) => {
        if (protectedNames.has(facetName)) return acc;
        acc[facetName] = Array.isArray(facetValues) ? facetValues : [facetValues];
        return acc;
      },
      {},
    );

    state.value.query.currentPage = query.page ? Number(query.page) : 1;
    state.value.query.sortBy = query.sort ? (query.sort as string) : 'relevant';
    state.value.query.search = query.search as string;
  };

  const fetchProducts: FetchProducts = async () => {
    parseRoute();
    state.value.loading = true;
    const { data, error } = await useAsyncData(() => {
      return useSdk().unified.searchProducts({
        pageSize: 24,
        ...state.value.query,
      });
    });
    state.value.loading = false;
    useHandleError(error.value);
    state.value.data = data.value;
    return data;
  };

  const setFiltersInQuery: SetFiltersInQuery = (query) => {
    const facets: Record<string, string[]> = state.value.query.facets ?? {};
    const updatedFacets: Record<string, string[]> = Object.entries(query.facets ?? {}).reduce<Record<string, string[]>>(
      (acc, [facetName, facetValues]) => {
        acc[facetName] = facetValues;
        return acc;
      },
      {},
    );

    if (JSON.stringify(updatedFacets) !== JSON.stringify(facets)) {
      router.push({
        query: {
          ...router.currentRoute.value.query,
          page: state.value.query.currentPage,
          sort: query.sortBy ?? state.value.query.sortBy,
          search: query.search ?? state.value.query.search,
          ...updatedFacets,
        },
      });
    }
  };

  const setPageInQuery: SetPageInQuery = (page) => {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        page,
        sort: state.value.query.sortBy,
        search: state.value.query.search,
        ...state.value.query.facets,
      },
    });
  };

  const setSortInQuery: SetSortInQuery = (sort) => {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        page: 1,
        sort,
        search: state.value.query.search,
        ...state.value.query.facets,
      },
    });
  };

  const clearFilters: ClearFilters = () => {
    router.push({
      query: {
        page: 1,
        sort: state.value.query.sortBy,
        search: state.value.query.search,
      },
    });
    fetchProducts();
  };

  const watchQuery: WatchQuery = () => {
    watch(
      [router.currentRoute, currency],
      () => {
        if (['category', 'search'].some((value) => router.currentRoute.value.name?.toString().includes(value))) {
          fetchProducts();
        }
      },
      { deep: true },
    );
  };

  return {
    fetchProducts,
    clearFilters,
    setFiltersInQuery,
    setPageInQuery,
    setSortInQuery,
    watchQuery,
    ...toRefs(state.value),
  };
};
