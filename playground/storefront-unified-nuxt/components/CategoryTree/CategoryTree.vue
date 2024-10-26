<template>
  <UiAccordionItem v-model="open" class="border-b border-neutral-200 pb-6" data-testid="category-tree">
    <template #summary>
      <span data-testid="filter-category-heading" class="font-medium text-base capitalize">{{ $t('category') }}</span>
    </template>
    <div class="flex flex-col gap-y-2">
      <template v-if="parent">
        <CategoryTreeItem :name="parent.name" :href="parent.href">
          <SfIconArrowBack size="sm" class="text-neutral-500 mr-2" />
        </CategoryTreeItem>
      </template>
      <template v-if="currentCategory">
        <CategoryTreeItem
          selected
          :name="currentCategory.name"
          :href="currentCategory.href"
          data-testid="category-tree-current"
        />
      </template>
      <div data-testid="categories">
        <CategoryTreeItem
          v-for="category in itemsToDisplay"
          :key="category.name"
          :name="category.name"
          :href="category.href"
        />
      </div>
    </div>
    <SfButton
      v-if="isThereMoreItemsToShow"
      class="mt-2 md:h-8 md:text-sm md:px-3 grayscale"
      variant="tertiary"
      @click="toggleShowMore"
    >
      {{ showMore ? $t('showLess') : $t('showMore') }}
    </SfButton>
  </UiAccordionItem>
</template>

<script setup lang="ts">
import { SfIconArrowBack, SfButton } from '@storefront-ui/vue';
import { toRefs } from '@vueuse/core';
import type { CategoryTreeProps } from '~/components/CategoryTree/types';

const props = withDefaults(defineProps<CategoryTreeProps>(), {
  maxToShow: 5,
});

const { categories, maxToShow } = toRefs(props);

const isThereMoreItemsToShow = computed(() => categories.value.length > maxToShow.value);
const showMore = ref(false);
const toggleShowMore = () => (showMore.value = !showMore.value);

const itemsToDisplay = computed(() => (showMore.value ? categories.value : categories.value.slice(0, maxToShow.value)));

const open = ref(true);
</script>
