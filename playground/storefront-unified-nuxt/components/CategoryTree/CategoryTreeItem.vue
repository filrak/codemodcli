<template>
  <SfListItem
    :selected="selected"
    size="lg"
    :class="[
      'md:sf-list-item-sm md:py-1.5 md:rounded-md',
      { 'bg-primary-100 hover:bg-primary-100 cursor-auto': selected },
    ]"
    data-testid="category-tree-item"
    :disabled="selected"
  >
    <NuxtLinkLocale :to="href">
      <span class="flex gap-2 items-center">
        <span class="text-base md:text-sm capitalize flex items-center text-black" data-testid="list-item-menu-label">
          <slot />{{ name }}
        </span>
      </span>
    </NuxtLinkLocale>
    <template #suffix>
      <SfIconCheck v-if="selected" class="text-primary-700" />
    </template>
  </SfListItem>
</template>

<script setup lang="ts">
import { SfIconCheck, SfListItem } from '@storefront-ui/vue';
import type { CategoryTreeItemType } from '~/components/CategoryTree/types';

defineProps<CategoryTreeItemType>();
</script>
