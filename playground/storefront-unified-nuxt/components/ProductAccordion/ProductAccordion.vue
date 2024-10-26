<template>
  <div data-testid="product-accordion">
    <UiAccordionItem
      v-model="productDetailsOpen"
      summary-class="md:rounded-md w-full hover:bg-neutral-100 mt-4 pl-4 pr-3 flex justify-between items-center"
    >
      <template #summary>
        <h2 data-testid="product-details-heading" class="font-semibold font-headings text-lg leading-6 md:text-2xl">
          {{ $t('productDetails') }}
        </h2>
      </template>
      <div data-testid="product-description" class="px-4 py-2" v-html="product.description" />
    </UiAccordionItem>
    <UiDivider class="my-4" />
    <UiAccordionItem
      id="customer-reviews"
      v-model="reviewsOpen"
      summary-class="md:rounded-md w-full hover:bg-neutral-100 pl-4 pr-3 flex justify-between items-center"
    >
      <template #summary>
        <h2 data-testid="customer-reviews-heading" class="font-semibold font-headings text-lg leading-6 md:text-2xl">
          {{ $t('customerReviews') }}
        </h2>
      </template>
      <div v-if="loading" class="flex mt-4 mb-8 justify-center">
        <SfLoaderCircular :aria-label="$t('loading')" />
      </div>
      <div v-else data-testid="customer-reviews" class="px-4 py-2">
        <div v-if="productReviews?.length === 0">{{ $t('noReviews') }}</div>
        <UiReview v-for="review in productReviews" :key="review.id" :review="review" class="mb-4" />
      </div>
    </UiAccordionItem>
  </div>
</template>

<script setup lang="ts">
import { SfLoaderCircular } from '@storefront-ui/vue';
import { toRefs } from '@vueuse/core';
import type { ProductAccordionPropsType } from '~/components/ProductAccordion/types';

const props = defineProps<ProductAccordionPropsType>();

const { product } = toRefs(props);
const { data, fetchProductReviews, loading } = useProductReviews(product.value.id);

const productReviews = computed(() => data.value?.reviews);
const productDetailsOpen = ref(true);

const { isAccordionOpen, toggleAccordion } = useReviewsAccordion();
const reviewsOpen = computed({
  get: () => isAccordionOpen.value,
  set() {
    toggleAccordion();
  },
});

watchEffect(() => {
  if (reviewsOpen.value && !productReviews.value) {
    fetchProductReviews();
  }
});
</script>
