import { SfProduct, SfProductCatalogItem } from '~/types';

export type SeoProductProps =
  | {
      udmProduct: SfProduct;
    }
  | {
      fields: Partial<{
        name: string;
        sku: string;
        description: string;
        regularPrice: number;
        currency: string;
        quantityLimit: number;
        imageUrl: string;
      }>;
    };

type SeoItemListFields = {
  name: string;
  sku: string;
  regularPrice: number;
  currency: string;
  quantityLimit: number;
};

export type SeoItemListProps =
  | {
      udmProductCatalogItemList: SfProductCatalogItem[];
    }
  | {
      fields: SeoItemListFields[];
    };
