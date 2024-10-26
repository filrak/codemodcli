<template>
  <div class="border border-neutral-200 rounded-md hover:shadow-lg shrink-0 flex flex-col">
    <div class="relative">
      <SfLink
        :tag="NuxtLinkLocale"
        :to="`${paths.product}${slug}/${productId}?sku=${sku}`"
        data-testid="image-slot-link"
      >
        <NuxtImg
          :src="imageUrl"
          :alt="imageAlt"
          placeholder="/images/placeholder-300.webp"
          class="object-contain rounded-md aspect-square w-full h-full"
          data-testid="image-slot"
          width="320"
          :loading="lazy && !priority ? 'lazy' : undefined"
          :fetchpriority="priority ? 'high' : undefined"
          :preload="priority"
          format="webp"
        />
      </SfLink>
    </div>
    <div class="p-2 md:p-4 border-t border-neutral-200 typography-text-base flex flex-col flex-1">
      <SfLink
        :tag="NuxtLinkLocale"
        :to="`${paths.product}${slug}/${productId}?sku=${sku}`"
        class="no-underline text-sm text-inherit"
        variant="secondary"
      >
        <span v-html="name" />
      </SfLink>
      <div v-if="rating" class="flex items-center pt-2">
        <SfRating size="xs" :value="rating ?? 0" :max="5" />
        <SfCounter size="xs" class="ml-1">{{ ratingCount ?? 0 }}</SfCounter>
      </div>
      <p v-if="description" class="block mt-2 font-normal typography-text-xs text-neutral-700 text-justify">
        {{ description }}
      </p>
      <div class="block font-semibold typography-text-lg" data-testid="product-card-vertical-price">
        <SkeletonGeneric :is-loaded="!isLazyLoadingData" inline class-name="my-2">
          <DecoratedPrice
            v-if="price"
            :regular="formatPrice(price.value)"
            :special="price?.isDiscounted ? formatPrice(price.regularPrice) : undefined"
            class="mt-2"
            data-testid="product-card-vertical-price"
            :class-name-variants="{
              regular: 'text-lg',
              special: 'text-md',
            }"
          />
        </SkeletonGeneric>
        <noscript>
          <DecoratedPrice
            v-if="price"
            :regular="formatPrice(price.value)"
            :special="price?.isDiscounted ? formatPrice(price.regularPrice) : undefined"
          />
        </noscript>
      </div>
      <SfButton
        v-if="showAddToCartButton && sku"
        data-testid="add-to-cart-button"
        class="self-start mt-auto"
        size="sm"
        :disabled="isLazyLoadingData || loading || disabled"
        @click="addCartLineItem"
      >
        <template #prefix> <SfIconShoppingCart size="sm" /> </template>{{ $t('addToCart') }}
      </SfButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfLink, SfRating, SfCounter, SfButton, SfIconShoppingCart } from '@storefront-ui/vue';
import type { ProductCardProps } from '~/components/ui/ProductCard/types';
import SkeletonGeneric from '~/components/ui/Skeleton/Generic.vue';

const props = withDefaults(defineProps<ProductCardProps>(), {
  lazy: true,
  imageAlt: '',
});

const { formatPrice } = useFormatPrice();
const { mutate: addCartLineItem, loading } = useAddCartLineItem({ productId: props.productId, sku: props.sku || null });

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');
</script>
