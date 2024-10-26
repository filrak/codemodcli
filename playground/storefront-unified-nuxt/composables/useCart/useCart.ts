import { toRefs } from '@vueuse/shared';
import type { CartName, FetchCart, UseCartReturn, UseCartState } from './types';

export const useCartState = (name: keyof CartName) => {
  return useState<UseCartState>(`useCart-${name}`, () => ({
    data: null, // TODO remove `data` from cart state when QuickOrder module is updated to use global state
    loading: false,
  }));
};

/**
 * @description Composable for getting the cart loading state. Cart will not be fetched until `fetchCart` is called.
 *
 * @returns An object with the cart loading state and the `fetchCart` function.
 *
 * @example
 * const { loading, fetchCart } = useCart();
 */
export const useCart: UseCartReturn = () => {
  const state = useCartState('main');
  const { cart } = storeToRefs(useSfState());
  const notification = useNotification();
  // useCart can be called outside of the setup function https://github.com/nuxt-modules/i18n/issues/1831#issuecomment-1429601024
  const {
    $i18n: { t },
  } = useNuxtApp();

  const fetchCart: FetchCart = async ({ skipErrorNotification } = {}) => {
    state.value.loading = true;
    state.value.data = null;
    cart.value = null;
    try {
      const fetchedCart = await useSdk().unified.getCart();
      cart.value = fetchedCart;
      state.value.data = fetchedCart;
    } catch {
      if (!skipErrorNotification) {
        notification.error(t('messages.error.default'));
      }
    }
    state.value.loading = false;
    return cart.value;
  };

  return {
    fetchCart,
    ...toRefs(state.value),
  };
};
