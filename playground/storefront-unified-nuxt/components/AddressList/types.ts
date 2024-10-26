import type { SfCustomerAddress } from '~/types';

export type AddressListProps = {
  addresses: SfCustomerAddress[];
  loading?: boolean;
  selected?: string;
};
export type AddressListModalProps = {
  heading: string;
  submitting?: boolean;
  submitDisabled?: boolean;
};
