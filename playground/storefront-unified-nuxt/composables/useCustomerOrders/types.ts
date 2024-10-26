import type { Ref } from 'vue';
import type { Maybe, GetOrders } from '~/types';

type GetOrdersReturn = Awaited<ReturnType<GetOrders>>;

export interface UseCustomerOrdersState {
  data: Maybe<GetOrdersReturn['orders']>;
  pagination: Maybe<GetOrdersReturn['pagination']>;
  loading: boolean;
}

export type FetchCustomerOrders = () => Promise<Ref<Maybe<GetOrdersReturn>>>;
export type InvalidateCustomerOrders = () => void;

export interface UseCustomerOrders {
  data: Readonly<Ref<UseCustomerOrdersState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchCustomerOrders: FetchCustomerOrders;
  invalidateCustomerOrders: InvalidateCustomerOrders;
}

export type UseCustomerOrdersReturn = () => UseCustomerOrders;
