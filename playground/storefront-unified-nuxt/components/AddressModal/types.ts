import type { Maybe, SfAddress } from '~/types';
import type { ModalProps } from '../ui/Modal/types';

export type AddressModalFormProps = {
  savedAddress?: Maybe<SfAddress & { id?: string }>;
};
export type AddressModalProps = {
  address?: Maybe<SfAddress>;
  loading?: boolean;
  heading: string;
} & Omit<ModalProps, 'modelValue'>;
