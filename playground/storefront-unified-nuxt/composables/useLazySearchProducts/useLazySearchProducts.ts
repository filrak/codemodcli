import { toRefs } from '@vueuse/core';
import type { FetchProducts } from '~/composables/useSearchProducts';
import { SearchProductsArgs } from '~/types';
import type { UseLazySearchProductsState } from './types';

const defaultLazySearchFn = async (args: SearchProductsArgs) => {
  return await useSdk().unified.searchProducts({
    pageSize: args.pageSize,
    ...args,
  });
};

/**
 * @description
 * A composable function that provides lazy search functionality for products.
 * It uses the `unified.searchProducts` method from the SDK to fetch products based on the current query parameters.
 * It also provides methods to update the query parameters and watch for changes in the query parameters.
 * Lazy load function is used to fetch the products partially and merge them with the existing data client-side.
 *
 * @returns An object containing the following properties and methods:
 * - `data`: The fetched product data.
 * - `loading`: A boolean indicating whether the data is currently being fetched.
 * - `lazyLoading`: A boolean indicating whether the data is currently being partially fetched lazily.
 * - `fetchProducts`: A function that fetches the products based on the current query parameters.
 * - `clearFilters`: A function that clears all the filters and fetches the products again.
 * - `setFiltersInQuery`: A function that updates the query parameters with the given filters.
 * - `setPageInQuery`: A function that updates the query parameters with the given page number.
 * - `setSortInQuery`: A function that updates the query parameters with the given sort option.
 * - `watchQuery`: A function that watches for changes in the query parameters and fetches the products
 * again when there is a change.
 *
 * @example
 * const { data: products, loading, fetchProducts, watchQuery, lazyLoading } = useLazySearchProducts();
 * watchQuery();
 * await fetchProducts();
 */
export const useLazySearchProducts = (lazyLoadFn = defaultLazySearchFn) => {
  const parent = useSearchProducts();
  const state = useState<UseLazySearchProductsState>('lazy-search-products', () => ({
    data: parent.data.value,
    loading: parent.loading.value,
    lazyLoading: true,
    query: parent.query.value,
  }));

  const fetchProducts: FetchProducts = async () => {
    await parent.fetchProducts();
    if (process.server) {
      state.value.data = parent.data.value;
    }

    return ref(state.value.data);
  };

  watchEffect(() => {
    state.value.data = parent.data.value;
    state.value.loading = parent.loading.value;
    state.value.query = parent.query.value;
  });

  onMounted(async () => {
    state.value.lazyLoading = true;
    const lazyLoadedData = await lazyLoadFn({ pageSize: 24, ...state.value.query });
    if (!state.value.data) return;

    const mergedData = state.value.data.products.map((product) => {
      const match = lazyLoadedData.products.find((p) => p.id === product.id);
      if (!match) return product;

      return {
        ...product,
        ...match,
      };
    });

    state.value.data.products = mergedData;
    state.value.lazyLoading = false;
  });

  return {
    ...parent,
    fetchProducts,
    ...toRefs(state.value),
  };
};
