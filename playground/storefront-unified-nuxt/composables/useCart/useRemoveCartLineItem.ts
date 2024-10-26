import { RemoveCartLineItemArgs } from '~/types';
import { useCartMutation } from './useCartMutation';

/**
 * @description Composable for removing a cart line item from the cart.
 *
 * @param args - The arguments object containing the line item ID.
 *
 * @returns The mutation function and its result, loading state and error.
 *
 * @example
 * const { loading, mutate } = useRemoveCartLineItem({ lineItemId });
 * await mutate();
 */
export const useRemoveCartLineItem = ({ lineItemId }: RemoveCartLineItemArgs) => {
  return useCartMutation({
    key: ['main', 'removeCartLineItem'],
    mutationFn: (sdk) => sdk.unified.removeCartLineItem({ lineItemId }),
    meta: {
      notificationKey: 'cart.updateCart',
    },
  });
};
