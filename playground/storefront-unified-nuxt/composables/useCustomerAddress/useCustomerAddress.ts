import { toRefs } from '@vueuse/shared';
import type {
  UseCustomerAddressReturn,
  UseCustomerAddressState,
  GetCustomerAddress,
  CreateCustomerAddress,
  UpdateCustomerAddress,
  DeleteCustomerAddress,
  InvalidateCustomerAddress,
} from '~/composables/useCustomerAddress/types';

/**
 * @description A composable function that provides methods for retrieving, creating, updating
 * and deleting customer addresses.
 *
 * @returns An object containing the following methods:
 * - `getCustomerAddress`: Retrieves the customer's addresses from the server.
 * - `createCustomerAddress`: Creates a new customer address.
 * - `updateCustomerAddress`: Updates an existing customer address.
 * - `deleteCustomerAddress`: Deletes an existing customer address.
 * - `invalidateCustomerAddress`: Invalidates the current customer addresses, causing
 * them to be reloaded from the server on the next call to `getCustomerAddress`.
 * - `data`: The current customer addresses, or null if they have not been loaded yet.
 * - `loading`: A boolean indicating whether the customer addresses are currently being loaded from the server.
 *
 * @example
 * const {
 *   data,
 *   loading,
 *   getCustomerAddress,
 *   createCustomerAddress,
 *   updateCustomerAddress,
 *   deleteCustomerAddress
 * } = useCustomerAddress();
 *
 */
export const useCustomerAddress: UseCustomerAddressReturn = () => {
  const state = useState<UseCustomerAddressState>(`useCustomerAddress`, () => ({
    data: null,
    loading: false,
  }));

  /**
   * Retrieves the customer's addresses from the server.
   * @returns An object containing the customer's addresses, or null if there was an error.
   */
  const getCustomerAddress: GetCustomerAddress = async () => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(() => useSdk().unified.getCustomerAddresses(), { server: false });
    useHandleError(error.value);
    state.value.data = data.value?.addresses ?? null;
    state.value.loading = false;
    return data;
  };

  /**
   * Creates a new customer address.
   * @param args The arguments for creating the new address.
   * @returns An object containing the new address, or null if there was an error.
   */
  const createCustomerAddress: CreateCustomerAddress = async (args) => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(() => useSdk().unified.createCustomerAddress(args));
    useHandleError(error.value);
    if (data.value?.address) {
      state.value.data?.push(data.value.address);
    }
    state.value.loading = false;
    return data;
  };

  /**
   * Updates an existing customer address.
   * @param args The arguments for updating the address.
   * @returns An object containing the updated address, or null if there was an error.
   */
  const updateCustomerAddress: UpdateCustomerAddress = async (args) => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(() => useSdk().unified.updateCustomerAddress(args));
    useHandleError(error.value);

    if (data.value?.address) {
      const key = state.value.data?.findIndex((address) => address.id === data.value?.address?.id);
      if (key !== undefined && key !== -1) {
        state.value.data?.splice(key, 1, data.value.address);
      }
    }

    state.value.loading = false;
    return data;
  };

  /**
   * Deletes an existing customer address.
   * @param args The arguments for deleting the address.
   * @returns An object containing the result of the deletion, or null if there was an error.
   */
  const deleteCustomerAddress: DeleteCustomerAddress = async (args) => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(() => useSdk().unified.deleteCustomerAddress(args));
    useHandleError(error.value);

    if (!error.value) {
      const key = state.value.data?.findIndex((address) => address.id === args.id);
      if (key !== undefined && key !== -1) {
        state.value.data?.splice(key, 1);
      }
    }

    state.value.loading = false;
    return data;
  };

  /**
   * Invalidates the current customer addresses, causing them to be reloaded from the server on
   * the next call to `getCustomerAddress`.
   */
  const invalidateCustomerAddress: InvalidateCustomerAddress = () => {
    state.value.data = null;
  };

  return {
    getCustomerAddress,
    createCustomerAddress,
    updateCustomerAddress,
    deleteCustomerAddress,
    invalidateCustomerAddress,
    ...toRefs(state.value),
  };
};
