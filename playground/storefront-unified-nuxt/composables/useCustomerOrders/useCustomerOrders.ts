import { toRefs } from '@vueuse/shared';
import type {
  UseCustomerOrdersReturn,
  UseCustomerOrdersState,
  FetchCustomerOrders,
  InvalidateCustomerOrders,
} from '~/composables/useCustomerOrders/types';

/**
 * @description A composable function that provides methods for fetching and invalidating customer orders data.
 *
 * @returns
 * An object containing the `fetchCustomerOrders` and `invalidateCustomerOrders` methods,
 * as well as the `data`, `pagination`, and `loading` reactive properties.
 *
 * @example
 * const { data: customerOrders, loading, fetchCustomerOrders } = useCustomerOrders();
 * await fetchCustomerOrders();
 * const firstOrder = customerOrders.value?.orders[0];
 */
export const useCustomerOrders: UseCustomerOrdersReturn = () => {
  const state = useState<UseCustomerOrdersState>('useCustomerOrders', () => ({
    data: null,
    pagination: null,
    loading: false,
  }));

  const fetchCustomerOrders: FetchCustomerOrders = async () => {
    state.value.loading = true;
    const { data, error } = await useAsyncData('getOrders', () => useSdk().unified.getOrders(), {
      server: false,
    });
    useHandleError(error.value);
    state.value.data = data.value?.orders ?? null;
    state.value.pagination = data.value?.pagination ?? null;
    state.value.loading = false;
    return data;
  };

  const invalidateCustomerOrders: InvalidateCustomerOrders = () => {
    state.value.data = null;
    state.value.pagination = null;
  };

  return {
    fetchCustomerOrders,
    invalidateCustomerOrders,
    ...toRefs(state.value),
  };
};
