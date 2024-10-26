import { isSpecificSdkHttpError } from '@vue-storefront/sdk';
import { LoginCustomerArgs } from '~/types';
import { UseLoginCustomerArgs } from './types';
import { useCustomerMutation } from './useCustomerMutation';

/**
 * @description A composable function that provides the ability to log in a customer.
 *
 * @param options - The options to configure the login behavior.
 * @param options.onSuccess - A callback function to execute when the login is successful.
 *
 * @returns The mutation function and its result, loading state and error.
 *
 * @example
 * const { data: customer, loading, mutate: loginCustomer } = useLoginCustomer();
 * await loginCustomer({ email, password })
 * const customerName = customer.value?.firstName;
 */
export const useLoginCustomer = ({ onSuccess }: UseLoginCustomerArgs) => {
  const { fetchCart } = useCart();

  return useCustomerMutation({
    key: 'loginCustomer',
    mutationFn: (sdk, args: LoginCustomerArgs) => sdk.unified.loginCustomer(args),
    onSuccess: () => {
      fetchCart();
      onSuccess?.();
    },
    meta: {
      skipErrorNotification: (error: unknown) =>
        isSpecificSdkHttpError(error, { statusCode: (code) => code === 401 || code === 403 }),
    },
  });
};
