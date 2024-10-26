<template>
  <section
    class="p-4 xl:p-6 md:border md:border-neutral-100 md:shadow-lg md:rounded-md md:sticky md:top-20"
    data-testid="purchase-card"
  >
    <UiTag v-if="isOnSale" variant="secondary" strong class="mb-4 text-white" data-testid="special-tag">
      <SfIconSell size="sm" class="mr-1" />
      <span class="mr-1">{{ $t(`sale`) }}</span>
    </UiTag>
    <h1 class="mb-1 font-semibold typography-headline-4" data-testid="product-name">{{ product.name }}</h1>
    <SkeletonGeneric
      :is-loaded="!isLazyLoadingData"
      inline
      class-name="font-semibold typography-headline-3 text-neutral-900 mt-1"
    >
      <DecoratedPrice
        v-if="product.price"
        :regular="formatPrice(product.price.value)"
        :special="product.price.isDiscounted ? formatPrice(product.price.regularPrice) : undefined"
        data-testid="price"
        class="mt-1"
        :class-name-variants="{
          regular: 'typography-headline-3',
          special: 'text-base',
        }"
      />
    </SkeletonGeneric>
    <noscript>
      <DecoratedPrice
        v-if="product.price"
        :regular="formatPrice(product.price.value)"
        :special="product.price.isDiscounted ? formatPrice(product.price.regularPrice) : undefined"
      />
    </noscript>
    <div class="inline-flex items-center mt-4 mb-2">
      <SfRating size="sm" :value="product.rating?.average ?? 0" :max="5" />
      <SfCounter class="ml-1" size="xs">{{ product.rating?.count ?? 0 }}</SfCounter>
      <SfLink
        variant="secondary"
        class="ml-2 text-xs text-neutral-500 cursor-pointer"
        @click="scrollToAndOpenAccordion"
      >
        {{ $t('reviewsCount', { count: product.rating?.count ?? 0 }) }}
      </SfLink>
    </div>
    <div
      class="mb-4 font-normal typography-text-sm"
      data-testid="product-description"
      v-html="product.description || ''"
    />
    <div class="py-4 mb-8 border-gray-200 border-y">
      <UiTag v-if="isInCart" class="w-full mb-4">
        <SfIconShoppingCartCheckout />
        {{ $t('numberInCart', { count: 1 }) }}
      </UiTag>
      <div class="flex flex-col md:flex-row flex-wrap gap-4">
        <UiQuantitySelector
          v-model="quantitySelectorValue"
          class="min-w-[145px] flex-grow flex-shrink-0 basis-0"
          :max-value="product.quantityLimit || 10"
          :show-placeholder="isOutOfStock"
          :disabled="isOutOfStock"
        />
        <SfButton
          data-testid="add-to-cart-button"
          size="lg"
          class="flex-grow-[2] flex-shrink basis-auto whitespace-nowrap"
          :disabled="isLazyLoadingData || isOutOfStock"
          @click="addCartLineItem({ quantity: quantitySelectorValue })"
        >
          <template #prefix> <SfIconShoppingCart size="sm" /> </template>{{ $t('addToCart') }}
        </SfButton>
      </div>
    </div>
    <div data-testid="additional-info-line" class="flex first:mt-4">
      <SfIconPackage size="sm" class="flex-shrink-0 mr-1 text-neutral-500" />
      <p class="text-sm">
        <i18n-t keypath="additionalInfo.shipping" scope="global">
          <template #addAddress>
            <SfLink href="#" variant="secondary">{{ $t('additionalInfo.addAddress') }}</SfLink>
          </template>
        </i18n-t>
      </p>
    </div>
    <div data-testid="additional-info-line" class="flex mt-4">
      <SfIconWarehouse size="sm" class="flex-shrink-0 mr-1 text-neutral-500" />
      <p class="text-sm">
        <i18n-t keypath="additionalInfo.pickup" scope="global">
          <template #checkAvailability>
            <SfLink href="#" variant="secondary">{{ $t('additionalInfo.checkAvailability') }}</SfLink>
          </template>
        </i18n-t>
      </p>
    </div>
    <div data-testid="additional-info-line" class="flex mt-4">
      <p class="text-sm">
        <SfIconSafetyCheck size="sm" class="flex-shrink-0 mr-1 text-neutral-500" />
        <i18n-t keypath="additionalInfo.returns" scope="global">
          <template #details>
            <SfLink href="#" variant="secondary">{{ $t('additionalInfo.details') }}</SfLink>
          </template>
        </i18n-t>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  SfButton,
  SfCounter,
  SfLink,
  SfRating,
  SfIconSafetyCheck,
  SfIconWarehouse,
  SfIconPackage,
  SfIconSell,
  SfIconShoppingCartCheckout,
  SfIconShoppingCart,
} from '@storefront-ui/vue';
import { toRefs } from '@vueuse/core';
import type { PurchaseCardProps } from '~/components/ui/PurchaseCard/types';
import SkeletonGeneric from '~/components/ui/Skeleton/Generic.vue';
import { useSeoProduct } from '~/composables';

const props = defineProps<PurchaseCardProps>();

const { product, isLazyLoadingData } = toRefs(props);
const isOnSale = computed(() => product.value.price?.regularPrice.amount !== product.value.price?.value.amount);
const isInCart = computed(() => false);
const { formatPrice } = useFormatPrice();
const quantitySelectorValue = ref(1);
const { mutate: addCartLineItem } = useAddCartLineItem({
  productId: props.product.id,
  sku: props.product.sku,
});

useSeoProduct({ udmProduct: product.value });

const isOutOfStock = computed(() => {
  if (product.value?.quantityLimit === null) return false;

  return (product.value?.quantityLimit || 0) <= 0;
});

const { scrollToAndOpenAccordion } = useReviewsAccordion();
</script>
