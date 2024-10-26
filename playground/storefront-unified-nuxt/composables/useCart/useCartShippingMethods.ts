import { toRefs } from '@vueuse/shared';
import { SetShippingMethodArgs } from '~/types';
import { GetShippingMethods, UseCartShippingMethodsState } from './types';

export function getShippingMethodsState() {
  return useState<UseCartShippingMethodsState>('useCartShippingMethods', () => ({
    data: null,
    loading: false,
  }));
}

/**
 * @description Composable for fetching shipping methods & updating shipping method in the cart.
 *
 * @returns An object containing the following:
 * - `refetch`: A function that refetches the available shipping methods.
 * - `getShippingMethods`: A function that retrieves the available shipping methods.
 * - `setShippingMethod`: A function that sets the shipping method for the cart.
 * - `data`: The available shipping methods data.
 * - `loading`: A boolean indicating whether the shipping methods are currently being loaded.
 *
 * @example
 * const { data, getShippingMethods, setShippingMethod, loading } = useCartShippingMethods();
 * await getShippingMethods();
 * await setShippingMethod({ shippingMethodId: '1' });
 */
export const useCartShippingMethods = () => {
  const { cart } = storeToRefs(useSfState());
  const state = getShippingMethodsState();

  const getShippingMethods: GetShippingMethods = async () => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(
      'getShippingMethods',
      () => {
        if (!cart.value?.shippingAddress) {
          return Promise.resolve(null);
        }
        return useSdk().unified.getAvailableShippingMethods();
      },
      {
        server: false,
      },
    );
    useHandleError(error.value);
    state.value.data = data.value;
    state.value.loading = false;
    return data;
  };

  const setShippingMethod = useCartMutation({
    key: ['main', 'setShippingMethod'],
    mutationFn: (sdk, args: SetShippingMethodArgs) => sdk.unified.setShippingMethod(args),
  });

  async function refetch() {
    state.value.data = null;
    return getShippingMethods();
  }

  return {
    refetch,
    getShippingMethods,
    setShippingMethod,
    ...toRefs(state.value),
    loading: computed(() => state.value.loading || setShippingMethod.loading.value),
  };
};
