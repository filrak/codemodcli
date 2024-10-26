import { UpdateCustomerArgs } from '~/types';
import { UseUpdateCustomerArgs } from './types';
import { useCustomerMutation } from './useCustomerMutation';

/**
 * @description A composable function for updating a customer's information.
 *
 * @param options - The options object.
 * @param options.onSuccess - A callback function to be called when the mutation is successful.
 *
 * @returns The mutation function and its result, loading state and error.
 *
 * @example
 * const { data, loading, mutate: updateCustomer } = useUpdateCustomer();
 * await updateCustomer({ firstName: 'John', lastName: 'Doe' });
 * const customerName = data.value?.customer?.firstName;
 */
export const useUpdateCustomer = ({ onSuccess }: UseUpdateCustomerArgs) => {
  return useCustomerMutation({
    key: 'updateCustomer',
    mutationFn: (sdk, args: UpdateCustomerArgs) => sdk.unified.updateCustomer(args),
    onSuccess,
  });
};
