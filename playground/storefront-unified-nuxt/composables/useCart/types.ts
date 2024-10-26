import type { Ref } from 'vue';
import type { AddCartLineItemArgs, Maybe, UpdateCartLineItemArgs, GetCart, GetAvailableShippingMethods } from '~/types';

export interface CartName {
  main: true;
}

export interface UseCartState {
  data: Maybe<Awaited<ReturnType<GetCart>>>;
  loading: boolean;
}

type FetchCartArgs = {
  skipErrorNotification: boolean;
};

export type FetchCart = (args?: Partial<FetchCartArgs>) => Promise<Maybe<Awaited<ReturnType<GetCart>>>>;

export interface UseCart {
  data: Readonly<Ref<UseCartState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchCart: FetchCart;
}

export type UseCartReturn = () => UseCart;

export type UseAddCartLineItemArgs = Omit<AddCartLineItemArgs, 'quantity'>;
export type AddCartLineItemMutationArgs = Pick<AddCartLineItemArgs, 'quantity'>;

export type UseUpdateCartLineItemArgs = Pick<UpdateCartLineItemArgs, 'lineItemId'>;
export type UpdateCartLineItemMutationArgs = Omit<UpdateCartLineItemArgs, 'lineItemId'>;

export interface UseSetCartAddressArgs {
  onSuccess?: () => void;
}
export interface UseSetCustomerEmailArgs {
  onSuccess?: () => void;
}

export interface UseCartShippingMethodsState {
  data: Maybe<Awaited<ReturnType<GetAvailableShippingMethods>>>;
  loading: boolean;
}

export type GetShippingMethods = () => Promise<Ref<UseCartShippingMethodsState['data']>>;

export interface UseCartShippingMethods {
  data: Readonly<Ref<UseCartShippingMethodsState['data']>>;
  loading: Readonly<Ref<boolean>>;
  getShippingMethods: GetShippingMethods;
  invalidate: () => void;
}

export type UseCartShippingMethodsReturn = () => UseCartShippingMethods;
