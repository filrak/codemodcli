<template>
  <div class="flex gap-4">
    <div
      v-for="itemIndex in count"
      :key="itemIndex"
      class="animate-pulse border border-neutral-200 rounded-md w-[190px]"
      data-testid="skeleton-item"
    >
      <div class="w-full">
        <div class="p-3 border-b border-neutral-200">
          <div class="h-[130px] bg-gray-300 rounded-md" data-testid="skeleton-title-bar" />
        </div>
        <ul class="p-4 space-y-3">
          <li
            v-for="contentIndex in 4"
            :key="contentIndex"
            class="w-full h-4 bg-gray-200 rounded-full"
            data-testid="skeleton-detail-line"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SkeletonProductProps } from './types';

withDefaults(defineProps<SkeletonProductProps>(), {
  count: 4,
});
</script>
