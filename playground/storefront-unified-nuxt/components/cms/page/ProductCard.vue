<template>
  <div class="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px] shrink-0 w-full">
    <div class="relative">
      <SfLink href="#">
        <picture v-if="image">
          <source media="(max-width:500px)" :srcset="image.mobile" />
          <img class="image" :src="image.desktop" />
        </picture>
      </SfLink>
      <SfButton
        type="button"
        variant="tertiary"
        size="sm"
        square
        class="absolute bottom-0 right-0 mr-2 mb-2 bg-white border border-neutral-200 !rounded-full"
        aria-label="Add to wishlist"
      >
        <SfIconFavorite size="sm" />
      </SfButton>
    </div>
    <div class="p-4 border-t border-neutral-200">
      <SfLink href="#" variant="secondary" class="no-underline">{{ title }}</SfLink>
      <div class="flex items-center pt-1">
        <SfRating size="xs" :value="scoreRating" :max="maxRating" />

        <SfLink href="#" variant="secondary" class="pl-1 no-underline">
          <SfCounter size="xs">123</SfCounter>
        </SfLink>
      </div>
      <p class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700">
        {{ description }}
      </p>
      <span class="block pb-2 font-semibold typography-text-lg">${{ regularPrice }}</span>
      <SfButton type="button" size="sm">
        <template #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
        Add to cart
      </SfButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SfRating, SfCounter, SfLink, SfButton, SfIconShoppingCart, SfIconFavorite } from '@storefront-ui/vue';
import type { AgnosticCmsProductCardProps } from '@vsf-enterprise/cms-components-utils';

type ProductCardProps = AgnosticCmsProductCardProps;

defineProps<ProductCardProps>();
</script>
