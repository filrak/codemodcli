import { UseCustomerState } from './types';

export function getState() {
  return useState<UseCustomerState>('useCustomer', () => ({
    loading: false,
  }));
}
