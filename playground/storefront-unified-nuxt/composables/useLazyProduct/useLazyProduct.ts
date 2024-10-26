import { toRefs } from '@vueuse/shared';
import type { LazyLoadFn } from '~/composables/useLazyProduct/types';
import type { FetchProduct } from '~/composables/useProduct/types';
import type { UseLazyProductState } from './types';

/**
 * Default lazy load function for fetching additional product data.
 */
const defaultLazyLoadProductFn = async (id: string, sku?: string) => {
  const { product } = await useSdk().unified.getProductDetails({ id, sku });

  return product;
};

/**
 * @description
 * Composable function that provides methods and reactive state for fetching product data.
 * Lazy load function is used to fetch the products partially and merge them with the existing data client-side.
 *
 * @param id - The ID of the product to fetch.
 * @param sku - Optional SKU of the product to fetch.
 * @parm lazyLoadFn - function to fetch additional data for the product.
 *
 * @returns An object containing the following properties and methods:
 * - `data`: The fetched product data.
 * - `loading`: A boolean indicating whether the data is currently being fetched.
 * - `lazyLoading`: A boolean indicating whether the data is currently being partially fetched lazily.
 * - `fetchProduct`: A function that fetches the product data.
 *
 * @example
 * const { fetchProduct, data: product, loading } = useProduct('product-id');
 * await fetchProduct();
 * const productName = product.value?.name;
 */
export const useLazyProduct = (id: string, sku?: string, lazyLoadFn: LazyLoadFn = defaultLazyLoadProductFn) => {
  const parent = useProduct(id, sku);
  const state = useState<UseLazyProductState>(`useLazyProduct-${id}-${sku}`, () => ({
    data: parent.data.value,
    loading: parent.loading.value,
    lazyLoading: true,
  }));

  /** Function for fetching product data
   * @example
   * fetchProduct();
   */
  const fetchProduct: FetchProduct = async () => {
    const data = await parent.fetchProduct();
    if (process.server) {
      state.value.data = data.value;
    }

    return data;
  };

  /**
   * Merge lazy loaded data with existing data
   */
  onMounted(async () => {
    const data = await lazyLoadFn(id, sku);
    state.value.lazyLoading = true;

    if (!state.value.data) return;

    state.value.data = {
      ...state.value.data,
      ...data,
    };

    state.value.lazyLoading = false;
  });

  watchEffect(() => {
    state.value.data = parent.data.value;
    state.value.loading = parent.loading.value;
  });

  return {
    fetchProduct,
    ...toRefs(state.value),
  };
};
