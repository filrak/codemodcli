import { toRefs } from '@vueuse/shared';
import type { UseProductsCatalogState, UseProductsCatalogReturn, FetchProductsCatalog } from './types';

/**
 * @description A composable function for fetching product data from the storefront API.
 *
 * @returns An object containing the `fetchProductsCatalog` function for fetching
 * product data and the `data` and `loading` reactive properties.
 *
 * @example
 * const { fetchProductsCatalog, data: products, loading } = useProductsCatalog('default');
 * await fetchProductsCatalog({ ids: [], skus: [] });
 * const firstProduct = products.value?.products[0];
 */
export const useProductsCatalog: UseProductsCatalogReturn = (id) => {
  const state = useState<UseProductsCatalogState>(`useProductsCatalog_${id}`, () => ({
    data: null,
    loading: false,
  }));

  const fetchProductsCatalog: FetchProductsCatalog = async (params) => {
    state.value.loading = true;
    const { data, error, refresh } = await useAsyncData(id, () => useSdk().unified.getProducts(params));
    useHandleError(error.value);
    state.value.data = data.value;
    state.value.loading = false;
    return refresh;
  };

  return {
    fetchProductsCatalog,
    ...toRefs(state.value),
  };
};
