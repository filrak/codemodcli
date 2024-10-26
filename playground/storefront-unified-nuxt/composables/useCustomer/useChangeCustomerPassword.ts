import { isSdkRequestError, isSpecificSdkHttpError } from '@vue-storefront/sdk';
import { useMutation } from '~/composables/useMutation';
import { ChangeCustomerPasswordArgs } from '~/types';
import { ResetFormErrors, UseChangeCustomerPasswordArgs } from './types';

function handleError(error: unknown): never {
  const errorObj: ResetFormErrors = {
    errorMessage: 'errors.unknown',
  };
  if (isSpecificSdkHttpError(error, { statusCode: 422 })) {
    errorObj.errorMessage = 'errors.passwordComplexity';
  } else if (isSdkRequestError(error)) {
    errorObj.errorMessage = 'errors.wrongPassword';
  } else {
    throw error;
  }
  throw errorObj;
}

const isResetFormError = (error: unknown): error is ResetFormErrors => {
  return !!error && typeof error === 'object' && 'errorMessage' in error;
};

/**
 * @description A composable function to change a customer's password.
 *
 * @param options - The options to configure the mutation.
 * @param options.onSuccess - A function to be called when the mutation succeeds.
 *
 * @returns The mutation function and its result, loading state and error.
 *
 * @example
 * const { loading, mutate: changePassword } = useChangeCustomerPassword();
 * await changePassword({ currentPassword, newPassword, confirmPassword });
 */
export const useChangeCustomerPassword = ({ onSuccess }: UseChangeCustomerPasswordArgs) => {
  return useMutation<void, ResetFormErrors, ChangeCustomerPasswordArgs>({
    key: 'changeCustomerPassword',
    mutationFn: async (sdk, args) => sdk.unified.changeCustomerPassword(args).catch(handleError),
    meta: {
      notificationKey: 'passwordChanged',
      skipErrorNotification: isResetFormError,
    },
    onSuccess,
  });
};
