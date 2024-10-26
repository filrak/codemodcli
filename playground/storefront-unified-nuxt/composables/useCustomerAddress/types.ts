import type { Ref } from 'vue';
import {
  CreateCustomerAddressArgs,
  DeleteCustomerAddressArgs,
  Maybe,
  UpdateCustomerAddressArgs,
  GetCustomerAddresses as GetCustomerAddressesUdm,
  CreateCustomerAddress as CreateCustomerAddressUdm,
  UpdateCustomerAddress as UpdateCustomerAddressUdm,
  DeleteCustomerAddress as DeleteCustomerAddressUdm,
} from '~/types';

type GetCustomerAddressesReturn = Awaited<ReturnType<GetCustomerAddressesUdm>>;

export interface UseCustomerAddressState {
  data: Maybe<GetCustomerAddressesReturn['addresses']>;
  loading: boolean;
}

export type GetCustomerAddress = () => Promise<Ref<Maybe<GetCustomerAddressesReturn>>>;
export type CreateCustomerAddress = (
  args: CreateCustomerAddressArgs,
) => Promise<Ref<Maybe<Awaited<ReturnType<CreateCustomerAddressUdm>>>>>;
export type UpdateCustomerAddress = (
  args: UpdateCustomerAddressArgs,
) => Promise<Ref<Maybe<Awaited<ReturnType<UpdateCustomerAddressUdm>>>>>;
export type DeleteCustomerAddress = (
  args: DeleteCustomerAddressArgs,
) => Promise<Ref<Maybe<Awaited<ReturnType<DeleteCustomerAddressUdm>>>>>;
export type InvalidateCustomerAddress = () => void;

export interface UseCustomerAddress {
  data: Readonly<Ref<UseCustomerAddressState['data']>>;
  loading: Readonly<Ref<boolean>>;
  getCustomerAddress: GetCustomerAddress;
  createCustomerAddress: CreateCustomerAddress;
  updateCustomerAddress: UpdateCustomerAddress;
  deleteCustomerAddress: DeleteCustomerAddress;
  invalidateCustomerAddress: InvalidateCustomerAddress;
}

export type UseCustomerAddressReturn = () => UseCustomerAddress;
