import { SetCustomerEmailArgs } from '~/types';
import type { UseSetCustomerEmailArgs } from './types';
import { useCartMutation } from './useCartMutation';

/**
 * @description Composable for updating an email in the cart.
 *
 * @param options - The options object.
 * @param options.onSuccess - A function to be called when the mutation is successful.
 *
 * @returns The mutation function and its result, loading state and error.
 *
 * @example
 * const { loading, mutate: setCustomerEmail } = useSetCustomerEmail();
 * await setCustomerEmail({ email: 'vsf@email.com' });
 */
export const useSetCustomerEmail = ({ onSuccess }: UseSetCustomerEmailArgs = {}) => {
  return useCartMutation({
    key: ['main', 'setCustomerEmail'],
    mutationFn: (sdk, args: SetCustomerEmailArgs) => sdk.unified.setCustomerEmail(args),
    meta: {
      notificationKey: 'cart.updateCart',
    },
    onSuccess,
  });
};
