import type { Maybe, SfAddress, SfCreateAddressBody } from '~/types';

export type BillingAddressProps = {
  savedAddress?: Maybe<SfAddress> | SfCreateAddressBody;
};
