import { UpdateCartLineItemMutationArgs, UseUpdateCartLineItemArgs } from './types';
import { useCartMutation } from './useCartMutation';

/**
 * @description Composable for updating a cart line item in the cart.
 *
 * @param options - The options to configure the mutation function.
 * @param options.lineItemId - The ID of the line item to update.
 *
 * @returns The mutation function and its result, loading state and error.
 *
 * @example
 * const { loading, mutate: updateCartLineItem } = useUpdateCartLineItem({ lineItemId });
 * await updateCartLineItem({ quantity: 2 });
 */
export const useUpdateCartLineItem = ({ lineItemId }: UseUpdateCartLineItemArgs) => {
  return useCartMutation({
    key: ['main', 'updateCartLineItem', lineItemId],
    mutationFn: (sdk, args: UpdateCartLineItemMutationArgs) => sdk.unified.updateCartLineItem({ lineItemId, ...args }),
    meta: {
      notificationKey: 'cart.updateCart',
    },
  });
};
