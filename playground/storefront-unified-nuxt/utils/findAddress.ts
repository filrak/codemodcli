import type { SfAddress, SfCreateAddressBody, SfCustomerAddress } from '~/types';

export const compareAddresses = (current?: SfAddress, address?: SfCustomerAddress | SfAddress | SfCreateAddressBody) =>
  !!(
    current &&
    address &&
    (Object.keys(current) as (keyof SfAddress)[]).every((key) => key === '$custom' || address[key] === current[key])
  );

export const findAddress = (addresses: SfCustomerAddress[], current?: SfAddress) =>
  current && addresses?.find((address) => compareAddresses(current, address));
