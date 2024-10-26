import type { SfAddress } from '~/types';

export type CheckoutAddressListProps = {
  heading: string;
  isOpen: boolean;
  submitting?: boolean;
  savedAddress?: SfAddress;
};
