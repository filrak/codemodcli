<template>
  <SfScrollable
    buttons-placement="floating"
    class="items-center pb-4"
    :wrapper-class="wrapperClass"
    data-testid="slider"
  >
    <UiProductCard
      v-for="product in items"
      :key="product.id"
      data-testid="product-card-vertical"
      class="w-[148px] md:w-[192px] self-stretch"
      :name="product.name ?? ''"
      :slug="product.slug"
      :product-id="product.id"
      :sku="product.sku"
      :image-url="product.primaryImage?.url ?? ''"
      :image-alt="product.primaryImage?.alt ?? ''"
      :price="product.price"
      :rating-count="product.rating?.count"
      :rating="product.rating?.average"
    />
  </SfScrollable>
</template>

<script setup lang="ts">
import { SfScrollable } from '@storefront-ui/vue';
import type { ProductSliderProps } from '~/components/ProductSlider/types';

defineProps<ProductSliderProps>();
</script>
