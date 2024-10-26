import { toRefs } from '@vueuse/shared';
import type { FetchCategory, UseCategoryReturn, UseCategoryState } from './types';

async function fetchCategoryData(params: { id?: string }) {
  if (!params.id) {
    return null;
  }
  return useSdk().unified.getCategory({ id: params.id });
}

/**
 * @description Composition function for fetching category data.
 *
 * @param id - The ID of the category to fetch.
 *
 * @returns An object with a `fetchCategory` function and reactive `data` and `loading` properties.
 *
 * @example
 * const { data: category, loading, fetchCategory } = useCategory('category-id');
 */
export const useCategory: UseCategoryReturn = (id) => {
  const key = `useCategory-${id}`;
  const state = useState<UseCategoryState>(key, () => ({
    data: null,
    loading: false,
  }));

  /** Function for fetching category data
   * @example
   * const categories = await fetchCategory({ id: 'category-id' });
   */
  const fetchCategory: FetchCategory = async (params, options) => {
    state.value.loading = true;
    const { data, error, refresh } = await useAsyncData(key, () => fetchCategoryData(params));
    const handleError = options?.handleError ?? useHandleError;
    if (error.value) {
      handleError(error.value);
    }
    state.value.data = data.value;
    state.value.loading = false;
    return refresh;
  };

  return {
    fetchCategory,
    ...toRefs(state.value),
  };
};
