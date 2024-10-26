import { useMutation } from '~/composables/useMutation';
import { UseLogoutCustomerArgs } from './types';

export const useOnLogout = () => {
  const { customer } = storeToRefs(useSfState());
  const { fetchCart } = useCart();
  const { invalidateCustomerAddress } = useCustomerAddress();
  const { invalidateCustomerOrders } = useCustomerOrders();

  return () => {
    customer.value = null;
    invalidateCustomerAddress();
    invalidateCustomerOrders();
    fetchCart();
  };
};

/**
 * @description
 * A composable function that logs out the current customer
 * and invalidates the cart, customer address, and customer orders.
 *
 * @param options - The options to configure the composable.
 * @param options.onSuccess - A function to be called when the customer is successfully logged out.
 * @param options.skipNotifications - A flag to skip showing notifications.
 *
 * @returns The mutation function and its result, loading state and error.
 *
 * @example
 * const { loading, mutate: logoutCustomer } = useLogoutCustomer();
 * await logoutCustomer();
 */
export const useLogoutCustomer = ({ onSuccess, skipNotifications }: UseLogoutCustomerArgs = {}) => {
  const onLogout = useOnLogout();

  return useMutation({
    key: 'logoutCustomer',
    mutationFn: (sdk) => sdk.unified.logoutCustomer(),
    onSuccess: () => {
      onLogout();
      onSuccess?.();
    },
    meta: skipNotifications ? undefined : { notificationKey: 'logout' },
  });
};
