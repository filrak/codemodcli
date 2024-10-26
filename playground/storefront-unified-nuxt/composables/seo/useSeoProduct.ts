import { computed } from 'vue';
import { useJsonld } from '#jsonld';
import { SfProduct } from '~/types';
import type { SeoProductProps } from './types';

export const useSeoProduct = <CFG extends SeoProductProps>(cfg: CFG) => {
  // Function to get UDM product fields
  function getUdmProductFields(product: SfProduct) {
    return {
      name: product?.name ?? '',
      sku: product?.sku ?? '',
      description: product?.description ?? '',
      regularPrice: product?.price?.regularPrice?.amount,
      currency: product?.price?.regularPrice?.currency,
      quantityLimit: product?.quantityLimit,
      imageUrl: product?.gallery?.[0]?.url,
    };
  }

  const payload = 'udmProduct' in cfg ? getUdmProductFields(cfg.udmProduct) : cfg.fields;

  const availability = computed(() => {
    return (payload.quantityLimit ?? 0) <= 0 ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock';
  });

  // Inject the JSON-LD into the head of the document
  useJsonld({
    '@context': 'https://schema.org',
    '@type': 'Product',
    offers: {
      availability: availability.value,
      price: payload?.regularPrice,
      priceCurrency: payload?.currency,
      '@type': 'Offer',
    },
    image: payload?.imageUrl,
    description: payload.description,
    sku: payload?.sku,
    name: payload?.name,
  });
};
