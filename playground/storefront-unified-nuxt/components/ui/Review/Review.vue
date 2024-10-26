<template>
  <article class="w-full p-4 border rounded-md" data-testid="review">
    <p class="pb-2 font-medium">{{ review.title }}</p>
    <header class="flex flex-col pb-2 md:flex-row md:justify-between">
      <span class="flex items-center pr-2 text-xs text-neutral-500">
        <SfRating :value="review.rating ?? undefined" :max="5" size="xs" class="mr-2" />
        <span data-testid="review-date">{{ $d(new Date(review.createdAt)) }}</span>
      </span>
      <p class="flex items-center text-xs truncate text-primary-700">
        <span data-testid="review-author" class="mr-2 text-xs text-neutral-500">{{ review.reviewer }}</span>
      </p>
    </header>
    <p data-testid="review-text" class="pb-2 text-sm text-neutral-900">{{ truncatedContent }}</p>
    <button
      v-if="isButtonVisible"
      type="button"
      class="inline-block mb-2 text-sm font-normal border-b-2 border-black cursor-pointer w-fit hover:text-primary-700 hover:border-primary-800"
      @click="isCollapsed = !isCollapsed"
    >
      {{ $t(isCollapsed ? 'readMore' : 'readLess') }}
    </button>
  </article>
</template>

<script setup lang="ts">
import { SfRating } from '@storefront-ui/vue';
import { toRefs } from '@vueuse/core';
import type { ReviewProps } from '~/components/ui/Review/types';

const props = defineProps<ReviewProps>();

const { review } = toRefs(props);
const charLimit = 300;
const isCollapsed = ref(true);
const isButtonVisible = computed(() => (review.value.text?.length || 0) > charLimit);
const truncatedContent = computed(() =>
  isButtonVisible.value && isCollapsed.value
    ? `${review.value.text?.slice(0, Math.max(0, charLimit))}...`
    : review.value.text,
);
</script>
