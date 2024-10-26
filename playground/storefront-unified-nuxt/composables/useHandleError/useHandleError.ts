import type { UseHandleError, ErrorParams } from '~/composables/useHandleError/types';

const defaultError: ErrorParams = {
  status: 500,
  message: 'An error occurred',
  statusMessage: 'An error occurred',
};

/**
 * @description A composable function that handles errors by throwing a new error with
 * the provided status code, message, and status message.
 *
 * @param error - The error object to handle.
 *
 * @throws An error with the provided status code, message, and status message.
 *
 * @example
 * const { data, error } = await fetch(data);
 * useHandleError(error.value);
 */
export const useHandleError: UseHandleError = (error) => {
  if (error) {
    throw createError({
      statusCode: error.status || defaultError.status,
      message: error.message ?? defaultError.message,
      statusMessage: error.message ?? defaultError.statusMessage,
      fatal: true,
    });
  }
};
