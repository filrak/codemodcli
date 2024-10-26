import { toRefs } from '@vueuse/shared';
import type { FetchCategories, UseCategoriesReturn } from './types';

/**
 * @description Composition function for fetching categories data.
 *
 * @param id - The ID of the category to fetch.
 *
 * @returns An object with a `fetchCategories` function and reactive `data` and `loading` properties.
 *
 * @example
 * const { data: category, loading, fetchCategories } = useCategories('category-id');
 */
export const useCategories: UseCategoriesReturn = (id) => {
  const state = useState<UseCategoriesState>(`useCategories-${id}`, () => ({
    data: null,
    loading: false,
  }));

  /** Function for fetching categories data
   * @example
   * const categories = await fetchCategories({ ids: [], slugs: [] });
   */
  const fetchCategories: FetchCategories = async (params) => {
    state.value.loading = true;
    const { data, error, refresh } = await useAsyncData(() => useSdk().unified.getCategories(params), { lazy: true });
    useHandleError(error.value);
    state.value.data = data.value;
    state.value.loading = false;
    return refresh;
  };

  return {
    fetchCategories,
    ...toRefs(state.value),
  };
};
