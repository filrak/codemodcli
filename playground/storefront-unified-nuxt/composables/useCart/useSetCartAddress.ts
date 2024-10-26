import { SetCartAddressArgs } from '~/types';
import type { UseSetCartAddressArgs } from './types';
import { useCartMutation } from './useCartMutation';

/**
 * @description Composable for updating an shipping address in the cart.
 *
 * @param options - The options object.
 * @param options.onSuccess - A callback function to be called on successful mutation.
 *
 * @returns An object containing the `setShippingAddress` method and a `loading` computed property.
 *
 * @example
 * const { setShippingAddress, loading } = useSetCartAddress();
 * await setShippingAddress.mutate({ shippingAddress: { ... } });
 */
export const useSetCartAddress = ({ onSuccess }: UseSetCartAddressArgs = {}) => {
  const { refetch } = useCartShippingMethods();
  const setShippingAddress = useCartMutation({
    key: ['main', 'setCartAddress', 'shipping'],
    mutationFn: (sdk, args: SetCartAddressArgs) => sdk.unified.setCartAddress(args),
    meta: {
      notificationKey: 'cart.updateCart',
    },
    async onSuccess() {
      onSuccess?.();
      await refetch();
    },
  });

  return {
    setShippingAddress,
    loading: computed(() => setShippingAddress.loading.value),
  };
};
