import type { SfCart } from '~/types';

export type ContactInformationProps = {
  isEditable?: boolean;
};

export type ContactInformationFormProps = {
  email?: SfCart['customerEmail'];
  loading?: boolean;
  isEditable?: boolean;
};
