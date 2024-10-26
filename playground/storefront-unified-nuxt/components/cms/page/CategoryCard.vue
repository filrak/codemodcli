<template>
  <div v-if="category" class="relative min-w-[180px] flex-col max-w-[240px] group" data-testid="category-card">
    <NuxtLinkLocale
      class="absolute w-full h-full z-[1] focus-visible:outline focus-visible:outline-offset focus-visible:rounded-md"
      :to="link"
      :aria-label="title"
    />
    <NuxtImg
      class="rounded-full bg-neutral-100 group-hover:shadow-xl group-active:shadow-none"
      :src="image?.desktop"
      :alt="image?.alt"
      width="240"
      height="240"
      placeholder="/images/placeholder-300.webp"
    />
    <div class="flex justify-center">
      <a
        class="mt-4 font-semibold no-underline text-normal-900 typography-text-base group-hover:underline group-hover:text-primary-800 group-hover:font-normal group-active:text-primary-800 group-active:font-normal"
      >
        {{ title }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AgnosticCmsCategoryCardProps } from '@vsf-enterprise/cms-components-utils';

type CategoryCardProps = AgnosticCmsCategoryCardProps;

const props = withDefaults(defineProps<CategoryCardProps>(), {
  categoryId: '',
});

const { fetchCategory, data } = useCategory(props.categoryId);
const refresh = await fetchCategory(
  { id: props.categoryId },
  { handleError: () => console.warn(`Category with ID '${props.categoryId}' not found`) },
);

const category = computed(() => data.value?.category);
const title = computed(() => category.value?.name);
const link = computed(() => {
  return { name: 'category-slugs', params: { slugs: [category.value?.slug, category.value?.id] } };
});

watch(
  () => props.categoryId,
  async () => {
    await refresh();
  },
);
</script>
