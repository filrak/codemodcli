import type { Ref } from 'vue';
import type { Maybe, GetOrderDetails } from '~/types';

type GetOrderDetailsReturn = Awaited<ReturnType<GetOrderDetails>>;

export interface UseCustomerOrderState {
  data: Maybe<GetOrderDetailsReturn>;
  loading: boolean;
}

export type FetchCustomerOrder = (id: string) => Promise<Ref<Maybe<GetOrderDetailsReturn>>>;

export interface UseCustomerOrder {
  data: Readonly<Ref<UseCustomerOrderState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchCustomerOrder: FetchCustomerOrder;
}

export type UseCustomerOrderReturn = (id: string) => UseCustomerOrder;
