import type { HTMLAttributes } from 'vue';
import type { SfProductCatalogItem } from '~/types';

export type ProductSliderProps = {
  items?: SfProductCatalogItem[];
  wrapperClass?: HTMLAttributes['class'];
};
