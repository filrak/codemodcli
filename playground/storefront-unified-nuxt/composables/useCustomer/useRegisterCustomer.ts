import { isSdkRequestError } from '@vue-storefront/sdk';
import { RegisterCustomerArgs } from '~/types';
import { UseRegisterCustomerArgs } from './types';
import { useCustomerMutation } from './useCustomerMutation';

/**
 * @description A composable function that registers a new customer using the provided arguments.
 *
 * @param options - The options object containing the onSuccess callback.
 * @param options.onSuccess - A function to be called when the mutation succeeds.
 *
 * @returns The mutation function and its result, loading state and error.
 *
 * @example
 * const { data, loading, mutate: registerCustomer } = useRegisterCustomer();
 * await registerCustomer({ email, password });
 * const customerName = data.value?.customer?.firstName;
 */
export const useRegisterCustomer = ({ onSuccess }: UseRegisterCustomerArgs) => {
  const { fetchCart } = useCart();

  return useCustomerMutation({
    key: 'registerCustomer',
    mutationFn: (sdk, args: RegisterCustomerArgs) => sdk.unified.registerCustomer(args),
    meta: {
      skipErrorNotification: isSdkRequestError,
    },
    onSuccess: () => {
      fetchCart();
      onSuccess?.();
    },
  });
};
