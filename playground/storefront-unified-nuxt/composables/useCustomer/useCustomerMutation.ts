import { useMutation } from '~/composables/useMutation';
import type { UseMutationOptions, UseMutationReturn } from '~/composables/useMutation/types';
import { CustomerMutationReturn } from './types';

/**
 * @description
 * A composable function that returns a `useMutation` function with added
 * functionality to update the customer state on success.
 *
 * @template TArgs The type of the mutation arguments.
 * @template TError The type of the mutation error.
 *
 * @param {UseMutationOptions<CustomerMutationReturn, TError, TArgs>} options The options to
 * configure the `useMutation` function.
 *
 * @returns {UseMutationReturn<CustomerMutationReturn, TError, TArgs>} The `useMutation`
 * function with added functionality to update the customer state on success.
 *
 * @example
 * const { mutate } = useCustomerMutation({
 *   key: 'updateCustomer',
 *   mutationFn: async (sdk, args) => sdk.unified.updateCustomer(args),
 *   onSuccess: (updatedCustomer) => {
 *     // do something with the updated customer
 *   },
 *   onError: (error) => {
 *     // do something with the error
 *   },
 *   meta: {
 *     notificationKey: 'customerUpdated',
 *   },
 * });
 */
export function useCustomerMutation<TArgs, TError = unknown>(
  options: UseMutationOptions<CustomerMutationReturn, TError, TArgs>,
): UseMutationReturn<CustomerMutationReturn, TError, TArgs> {
  const { customer } = storeToRefs(useSfState());

  return useMutation<CustomerMutationReturn, TError, TArgs>({
    ...options,
    onSuccess: (updatedCustomer, variables) => {
      customer.value = updatedCustomer.customer;
      options.onSuccess?.(updatedCustomer, variables);
    },
  });
}
