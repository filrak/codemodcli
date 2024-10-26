import { toRefs } from '@vueuse/shared';
import type { UseCustomerReturn, GetCustomer } from '~/composables/useCustomer/types';
import { useOnLogout } from './useLogoutCustomer';

/**
 * @description Composable function that provides methods and reactive state for fetching customer data.
 *
 * @returns An object containing the `getCustomer` method and reactive `loading`.
 *
 * @example
 * const { loading, getCustomer } = useCustomer();
 * await getCustomer();
 */
export const useCustomer: UseCustomerReturn = () => {
  const state = getState();
  const { customer } = storeToRefs(useSfState());
  const onLogout = useOnLogout();

  const getCustomer: GetCustomer = async () => {
    state.value.loading = true;
    const { data, error } = await useAsyncData('useCustomer', () => useSdk().unified.getCustomer(), {
      server: false,
    });
    useHandleError(error.value);
    customer.value = data.value?.customer || null;
    state.value.loading = false;
    return data;
  };

  watch([customer], () => {
    if (customer.value === null) {
      onLogout();
    }
  });

  return {
    getCustomer,
    ...toRefs(state.value),
  };
};
