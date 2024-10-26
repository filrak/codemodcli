import { useJsonld } from '#jsonld';
import { SfProductCatalogItem } from '~/types';
import type { SeoItemListProps } from './types';

export const useSeoItemList = <CFG extends SeoItemListProps>(cfg: CFG) => {
  function getUdmCatalogItemFields(items: SfProductCatalogItem[]) {
    return items.map((item) => ({
      name: item?.name ?? '',
      sku: item?.sku ?? '',
      regularPrice: item?.price?.regularPrice?.amount,
      currency: item?.price?.regularPrice?.currency,
      quantityLimit: item?.quantityLimit,
    }));
  }

  const payload =
    'udmProductCatalogItemList' in cfg ? getUdmCatalogItemFields(cfg.udmProductCatalogItemList) : cfg.fields;

  const getAvailability = (quantityLimit: number) => {
    return (quantityLimit ?? 0) <= 0 ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock';
  };

  // Inject the JSON-LD into the head of the document
  useJsonld({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: payload.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: item?.name,
        sku: item?.sku,
        offers: {
          '@type': 'Offer',
          availability: getAvailability(item?.quantityLimit ?? 0),
          price: item?.regularPrice,
          priceCurrency: item?.currency,
        },
      },
    })),
  });
};
