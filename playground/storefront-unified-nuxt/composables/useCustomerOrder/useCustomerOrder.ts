import { toRefs } from '@vueuse/shared';
import type {
  UseCustomerOrderReturn,
  UseCustomerOrderState,
  FetchCustomerOrder,
} from '~/composables/useCustomerOrder/types';

/**
 * @description Composition function for fetching customer order data.
 *
 * @param id - The ID of the customer order to fetch.
 *
 * @returns An object with a `fetchCustomerOrder` function and the current state of the order.
 *
 * @example
 * const { fetchCustomerOrder, data: customerOrder, loading } = useCustomerOrder('123');
 * await fetchCustomerOrder();
 * const orderData = customerOrders.value?.orderDate;
 */
export const useCustomerOrder: UseCustomerOrderReturn = (id) => {
  const state = useState<UseCustomerOrderState>(`useCustomerOrder-${id}`, () => ({
    data: null,
    loading: false,
  }));

  const fetchCustomerOrder: FetchCustomerOrder = async () => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(() => useSdk().unified.getOrderDetails({ id }));
    useHandleError(error.value);
    state.value.data = data.value;
    state.value.loading = false;
    return data;
  };

  return {
    fetchCustomerOrder,
    ...toRefs(state.value),
  };
};
