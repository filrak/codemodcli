<template>
  <transition
    enter-active-class="transition duration-500 ease-in-out"
    leave-active-class="transition duration-500 ease-in-out"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <SfDrawer
      v-show="isOpen"
      :model-value="true"
      :disable-click-away="true"
      :disable-esc="true"
      class="w-full shadow-none md:translate-x-0 z-[100] md:z-0 md:static md:!block -translate-x-full shrink-0 md:w-[303px] bg-white"
      data-testid="category-sidebar"
    >
      <div class="grid [grid-template-rows:min-content_auto_min-content] h-full md:block">
        <div class="px-4 py-3 flex justify-between items-center">
          <span data-testid="list-settings-title" class="font-semibold typography-headline-4">{{
            $t('listSettings')
          }}</span>
          <SfButton class="md:hidden" variant="tertiary" :aria-label="$t('closeListSettings')" @click="$emit('close')">
            <template #prefix>
              <SfIconClose class="text-neutral-500" />
            </template>
          </SfButton>
        </div>
        <div class="overflow-y-auto md:overflow-y-visible">
          <slot />
        </div>
        <div
          class="py-4 md:mt-2 flex flex-wrap justify-between border-t border-t-neutral-200 md:border-0 gap-3 whitespace-nowrap"
        >
          <SfButton
            variant="secondary"
            class="flex-1"
            :disabled="!hasFilters"
            data-testid="clear-all-filters-button"
            @click="clearFilters"
          >
            {{ $t('clearFilters') }}
          </SfButton>
          <SfButton class="flex-1 md:hidden" variant="primary" @click="$emit('close')">
            {{ $t('showProducts') }}
          </SfButton>
        </div>
      </div>
    </SfDrawer>
  </transition>
</template>

<script setup lang="ts">
import { SfDrawer, SfButton, SfIconClose } from '@storefront-ui/vue';
import type { CategorySidebarEmits, CategorySidebarProps } from '~/components/CategorySidebar/types';

defineProps<CategorySidebarProps>();
defineEmits<CategorySidebarEmits>();

const { clearFilters, query } = useSearchProducts();
const hasFilters = computed(() => Object.keys(query.value?.facets ?? {}).length > 0);
</script>
