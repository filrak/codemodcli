import type { ToRefs } from 'vue';

export interface UseMutationMeta {
  notificationKey?: string;
  skipErrorNotification?: (error: unknown) => boolean;
}

export interface UseMutationOptions<TData, TError, TArgs> {
  key: string | number | (string | number | null | undefined)[];
  mutationFn: (sdk: ReturnType<typeof useSdk>, args: TArgs) => Promise<TData>;
  onSuccess?: (data: TData, variables: TArgs) => void | Promise<void>;
  onError?: (error: TError, variables: TArgs) => void | Promise<void>;
  meta?: UseMutationMeta;
}

export interface UseMutationNotificationOptions {
  meta?: UseMutationMeta;
}

export type UseMutationState<TData, TError> =
  | { status: 'loading'; data: null; error: null }
  | { status: 'idle'; data: null; error: null }
  | { status: 'success'; data: TData; error: null }
  | { status: 'error'; data: null; error: TError };

export type MutateReturn<TData, TError> = Promise<
  Extract<UseMutationState<TData, TError>, { status: 'error' } | { status: 'success' }>
>;

export type UseMutationReturn<TData, TError = unknown, TArgs = void> = {
  mutate: (args: TArgs) => MutateReturn<TData, TError>;
  loading: Ref<boolean>;
} & ToRefs<UseMutationState<TData, TError>>;
