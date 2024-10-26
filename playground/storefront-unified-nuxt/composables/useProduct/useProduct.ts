import { toRefs } from '@vueuse/shared';
import type { UseProductReturn, UseProductState, FetchProduct } from '~/composables/useProduct/types';

/**
 * @description Composable function that provides methods and reactive state for fetching product data.
 * @param id - The ID of the product to fetch.
 * @param sku - Optional SKU of the product to fetch.
 *
 * @returns An object with a `fetchProduct` function and reactive `data` and `loading` properties.
 *
 * @example
 * const { fetchProduct, data: product, loading } = useProduct('product-id');
 * await fetchProduct();
 * const productName = product.value?.name;
 */
export const useProduct: UseProductReturn = (id: string, sku?: string) => {
  const state = useState<UseProductState>(`useProduct-${id}-${sku}`, () => ({
    data: null,
    loading: false,
  }));

  /** Function for fetching product data
   * @example
   * fetchProduct();
   */
  const fetchProduct: FetchProduct = async () => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(() => useSdk().unified.getProductDetails({ id, sku }));
    useHandleError(error.value);
    state.value.data = data.value;
    state.value.loading = false;
    return data;
  };

  return {
    fetchProduct,
    ...toRefs(state.value),
  };
};
