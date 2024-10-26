import { useMutation } from '~/composables/useMutation';
import type { UseMutationOptions, UseMutationReturn } from '~/composables/useMutation/types';
import type { SfCart } from '~/types';

function isCartResponse(data: unknown): data is SfCart {
  return typeof data === 'object' && data !== null && 'lineItems' in data && data.lineItems !== undefined;
}

/**
 * @description A composable function that returns a mutation function for updating the cart state.
 * Cart name should be specified as a first item of the "key" array.
 *
 * @template TArgs The type of the mutation arguments.
 * @template TError The type of the mutation error.
 *
 * @param {UseMutationOptions<SfCart, TError, TArgs>} options The options for the mutation function.
 *
 * @returns {UseMutationReturn<SfCart, TError, TArgs>} The mutation function and its result state.
 *
 * @example
 * const { mutate } = useCartMutation({
 *   key: ['main', 'updateCart'],
 *   mutationFn: async (sdk, args) => sdk.unified.updateCart(args),
 *   onSuccess: (updatedCart) => {
 *     // do something with the updated cart
 *   },
 *   onError: (error) => {
 *     // do something with the error
 *   },
 *   meta: {
 *     notificationKey: 'cartUpdated',
 *   },
 * });
 */
export function useCartMutation<TData, TArgs, TError = unknown>(
  options: UseMutationOptions<TData, TError, TArgs> & { key: [`${keyof CartName}`, ...unknown[]] },
): UseMutationReturn<TData, TError, TArgs> {
  const cartName = options.key[0];
  const cart = useCartState(cartName);
  const { cart: alokaiCart } = storeToRefs(useSfState());

  return useMutation<TData, TError, TArgs>({
    ...options,
    onSuccess: (updatedCart, variables) => {
      if (isCartResponse(updatedCart)) {
        cart.value.data = updatedCart;

        if (cartName === 'main') {
          alokaiCart.value = updatedCart;
        }
      }
      options.onSuccess?.(updatedCart, variables);
    },
  });
}
