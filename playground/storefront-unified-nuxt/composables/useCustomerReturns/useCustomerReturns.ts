import { toRefs } from '@vueuse/shared';
import type {
  UseCustomerReturnsReturn,
  UseCustomerReturnsState,
  FetchCustomerReturns,
} from '~/composables/useCustomerReturns/types';

/**
 * @description
 * This is a mock of the customer's returns feature. Composable return empty array as a result.
 * If your commerce backend supports customer's returns feature, you can use this composable as
 * a starting point for your implementation.
 *
 * @returns An object containing the `fetchCustomerReturns` function and the `data` and `loading` reactive properties.
 *
 * @example
 * const { data: customerReturns, loading, fetchCustomerReturns } = useCustomerReturns();
 * await fetchCustomerReturns();
 * const firstReturn = customerReturns.value?.returns[0];
 */
export const useCustomerReturns: UseCustomerReturnsReturn = () => {
  const state = useState<UseCustomerReturnsState>(`useCustomerReturns`, () => ({
    data: [],
    loading: false,
  }));

  const fetchCustomerReturns: FetchCustomerReturns = async () => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(() => Promise.resolve([]));
    useHandleError(error.value);
    state.value.data = data.value;
    state.value.loading = false;
    return data;
  };

  return {
    fetchCustomerReturns,
    ...toRefs(state.value),
  };
};
