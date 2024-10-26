import type { SfProductCatalogItem } from '~/types';

export type CategoryPageContentProps = {
  title: string;
  totalProducts: number;
  itemsPerPage?: number;
  products?: SfProductCatalogItem[];
  isLazyLoadingData?: boolean;
};
