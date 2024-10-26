<template>
  <div class="flex min-w-[320px] max-w-[470px] pt-4" data-testid="cart-product-card">
    <div class="relative overflow-hidden rounded-md w-[100px]">
      <NuxtImg
        v-if="image"
        class="w-full h-auto border rounded-md border-neutral-200"
        :src="image.url"
        placeholder="/images/placeholder-300.webp"
        :alt="image.alt ?? ''"
        width="100"
        height="100"
      />
    </div>
    <div class="flex flex-col pl-4 min-w-[180px] max-w-[350px] flex-1 typography-text-base">
      {{ productName }}
      <div class="my-2 sm:mb-0">
        <ul class="font-normal leading-5 typography-text-xs sm:typography-text-sm text-neutral-700">
          <li v-for="(attr, i) in product.attributes" :key="i">
            <span class="mr-1">{{ attr.label }}:</span>
            <span class="font-medium">{{ attr.valueLabel }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from '@vueuse/core';
import type { ProductHorizontalProps, ProductCardHorizontalProduct } from '~/components/ui/ProductCardHorizontal/types';

const props = defineProps<ProductHorizontalProps>();

const { product } = toRefs(props);

const isProduct = (x: unknown): x is ProductCardHorizontalProduct => {
  return typeof x === 'object' && x !== null && 'gallery' in x && 'name' in x;
};

const image = computed(() => {
  return isProduct(product.value) ? product.value.gallery[0] : product.value.image;
});

const productName = computed(() => {
  return isProduct(product.value) ? product.value.name : product.value.productName;
});
</script>
