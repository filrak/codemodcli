<template>
  <UiProductCard
    v-for="{ id, sku, name, rating, price, primaryImage, slug, quantityLimit } in productList"
    :key="id"
    data-testid="product-card-vertical"
    :disabled="quantityLimit === 0"
    :image-alt="primaryImage?.alt ?? ''"
    :image-url="primaryImage?.url ?? ''"
    :name="name ?? ''"
    :price="price"
    :product-id="id"
    :rating-count="rating?.count"
    :sku="sku"
    :slug="slug"
    class="w-[148px] md:w-[192px] shrink-0 self-stretch"
    :class="$attrs.class"
  />
</template>

<script setup lang="ts">
import type { AgnosticCmsProductListProps } from '@vsf-enterprise/cms-components-utils';
import { toRefs } from '@vueuse/core';
import { SfProductCatalogItem } from '~/types';

type ProductListProps = AgnosticCmsProductListProps & {
  class: string;
};

const props = withDefaults(defineProps<ProductListProps>(), {
  items: () => [],
});
const { items } = toRefs(props);
const { currency } = storeToRefs(useSfState());

const skus = computed(() => items.value?.map(({ product }) => product));

const { fetchProductsCatalog, data } = useProductsCatalog('cms-product-list');

watch([skus, currency], () => fetchProductsCatalog({ skus: skus.value }), { immediate: true });

const productList = computed(() => {
  if (!data.value) {
    return [];
  }
  return props.items.reduce<SfProductCatalogItem[]>((acc, entry) => {
    const productData = data.value?.products.find((item) => item.sku === entry.product);
    if (productData) {
      acc.push(productData);
    }
    return acc;
  }, []);
});
</script>
