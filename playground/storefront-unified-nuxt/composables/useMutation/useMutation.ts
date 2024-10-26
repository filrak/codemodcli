/* eslint-disable @typescript-eslint/no-explicit-any */
import { toRefs } from '@vueuse/core';
import { useNotification } from '~/composables/useNotification';
import type { UseMutationNotificationOptions, UseMutationOptions, UseMutationReturn, UseMutationState } from './types';

const useMutationNotification = (options: UseMutationNotificationOptions) => {
  const { meta } = options;
  const notification = useNotification();

  return {
    success() {
      if (meta?.notificationKey) {
        notification.success(`messages.success.${meta.notificationKey}`, meta.notificationKey);
      }
    },
    error(error: unknown) {
      if (meta?.skipErrorNotification?.(error)) {
        return;
      }

      if (meta?.notificationKey) {
        notification.error(`messages.error.${meta.notificationKey}`, meta.notificationKey);
      } else {
        notification.error('messages.error.default');
      }
    },
  };
};

const loadingState = () => ({ status: 'loading', data: null, error: null }) as const;
const successState = <TData>(data: TData) => ({ status: 'success', data, error: null }) as const;
const errorState = <TError>(error: TError) => ({ status: 'error', data: null, error }) as const;

/**
 * @description A composable function that provides a mutation function and its state for a given key.
 *
 * @template TData The type of the data returned by the mutation function.
 * @template TError The type of the error returned by the mutation function.
 * @template TArgs The type of the arguments passed to the mutation function.
 *
 * @param {UseMutationOptions<TData, TError, TArgs>} options The options object for the mutation function.
 *
 * @returns {UseMutationReturn<TData, TError, TArgs>} An object containing the mutation function,
 * loading state and mutation state.
 *
 * @example
 * const { mutate, loading, data, error } = useMutation({
 *   key: 'updateCustomer',
 *   mutationFn: async (sdk, args) => sdk.unified.updateCustomer(args),
 *   onSuccess: (updatedCustomer) => {
 *    // do something with the updated customer
 *   },
 *   onError: (error) => {
 *     // do something with the error
 *   },
 *   meta: {
 *     notificationKey: 'customerUpdated',
 *   },
 * });
 */
export function useMutation<TData, TError = unknown, TArgs = void>(
  options: UseMutationOptions<TData, TError, TArgs>,
): UseMutationReturn<TData, TError, TArgs> {
  const sdk = useSdk();
  const { key, mutationFn, onError, onSuccess, meta } = options;
  const preparedKey = Array.isArray(key) ? key.join('-') : `${key}`;

  const state = useState<UseMutationState<TData, TError>>(preparedKey, () => ({
    status: 'idle',
    data: null,
    error: null,
  }));
  const notification = useMutationNotification({ meta });

  const mutate = async (args: TArgs) => {
    Object.assign(state.value, loadingState());

    try {
      const data = await mutationFn(sdk, args);
      const updatedState = successState(data);
      Object.assign(state.value, updatedState);

      await onSuccess?.(data, args);
      notification.success();

      return updatedState;
    } catch (error: any) {
      const updatedState = errorState(error);
      Object.assign(state.value, updatedState);

      await onError?.(error, args)?.catch((error: any) => {
        state.value.error = error;
      });
      notification.error(error);

      return updatedState;
    }
  };

  return {
    mutate,
    loading: computed(() => state.value.status === 'loading'),
    ...toRefs(state.value),
  };
}
