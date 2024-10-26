import { AddCartLineItemMutationArgs, UseAddCartLineItemArgs } from './types';
import { useCartMutation } from './useCartMutation';

/**
 * @description Composable for adding a cart line item to the cart.
 *
 * @param product - The object the product to add to the cart.
 * @param product.productId - The ID of the product to add to the cart.
 * @param product.sku - The SKU of the product to add to the cart.
 *
 * @returns The mutation function and its result, loading state and error.
 *
 * @example
 * const { status, loading, mutate: addCartLineItem } = useAddCartLineItem({ productId, sku });
 * await addCartLineItem({ quantity: 2 });
 * await addCartLineItem(); // takes quantity: 1 as default
 */
export const useAddCartLineItem = ({ productId, sku }: UseAddCartLineItemArgs) => {
  return useCartMutation({
    key: ['main', 'addCartLineItem', productId, sku],
    mutationFn: (sdk, args: AddCartLineItemMutationArgs) => sdk.unified.addCartLineItem({ productId, sku, ...args }),
    meta: {
      notificationKey: 'cart.addToCart',
    },
  });
};
