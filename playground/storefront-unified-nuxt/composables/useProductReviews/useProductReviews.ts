import { toRefs } from '@vueuse/shared';
import type {
  UseProductReviews,
  UseProductReviewsState,
  FetchProductReviews,
} from '~/composables/useProductReviews/types';

/**
 * @description A composable function for fetching product reviews data.
 *
 * @param productId - The ID of the product to fetch reviews for.
 *
 * @returns An object containing a function for fetching product reviews data and the current state of the data.
 *
 * @example
 * const { fetchProductReviews, data: productReviews, loading } = useProductReviews(productId);
 * await fetchProductReviews();
 * const firstReview = productReviews.value?.reviews[0];
 */
export const useProductReviews: UseProductReviews = (productId) => {
  const state = useState<UseProductReviewsState>(`useProductReviews-${productId}`, () => ({
    data: null,
    loading: false,
  }));

  /** Function for fetching product reviews data
   * @example
   * fetchProductReviews();
   */
  const fetchProductReviews: FetchProductReviews = async () => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(() => useSdk().unified.getProductReviews({ pageSize: 5, productId }));
    useHandleError(error.value);
    state.value.data = data.value;
    state.value.loading = false;
    return data;
  };

  return {
    fetchProductReviews,
    ...toRefs(state.value),
  };
};
