import type { Ref } from 'vue';
import type { Maybe, GetCustomer as GetCustomerUdm } from '~/types';

export interface UseCustomerState {
  loading: boolean;
}

interface CustomerState {
  loading: Readonly<Ref<boolean>>;
}

export type GetCustomer = () => Promise<Ref<Maybe<Awaited<ReturnType<GetCustomerUdm>>>>>;

export interface UseCustomer extends CustomerState {
  getCustomer: GetCustomer;
}
export type UseCustomerReturn = () => UseCustomer;

export type ResetFormErrors = {
  errorMessage: string;
};

export interface UseLogoutCustomerArgs {
  onSuccess?: () => void;
  skipNotifications?: boolean;
}

export type CustomerMutationReturn = Awaited<ReturnType<GetCustomerUdm>>;

export interface UseUpdateCustomerArgs {
  onSuccess?: () => void;
}

export interface UseRegisterCustomerArgs {
  onSuccess?: () => void;
}

export interface UseLoginCustomerArgs {
  onSuccess?: () => void;
}

export interface UseChangeCustomerPasswordArgs {
  onSuccess?: () => void;
}
