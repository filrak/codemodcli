<template>
  <NarrowContainer>
    <div class="mb-20 px-4 md:px-0" data-testid="category-layout">
      <h1 data-testid="category-title" class="mt-4 mb-4 font-semibold typography-headline-3 md:typography-headline-2">
        {{ title }}
      </h1>
      <div class="mb-10" data-testid="slot-components-top">
        <slot name="components-top" />
      </div>
      <div class="md:flex gap-6" data-testid="category-page-content">
        <CategorySidebar v-if="isEmptySearch" :is-open="isOpen" @close="close">
          <NuxtLazyHydrate when-visible>
            <slot name="sidebar" />
          </NuxtLazyHydrate>
        </CategorySidebar>
        <div class="flex-1">
          <div v-if="isEmptySearch" class="flex justify-between items-center mb-6">
            <span class="font-semibold font-headings md:text-lg" data-testid="products-count">
              {{ $t('numberOfProducts', { count: totalProducts }) }}
            </span>
            <SfButton variant="tertiary" class="md:hidden whitespace-nowrap" @click="open">
              <template #prefix>
                <SfIconTune />
              </template>
              {{ $t('listSettings') }}
            </SfButton>
          </div>
          <section
            v-if="products && products.length > 0"
            class="grid grid-cols-1 2xs:grid-cols-2 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 mb-10 md:mb-5"
            data-testid="category-grid"
          >
            <UiProductCard
              v-for="({ id, sku, name, rating, price, primaryImage, slug, quantityLimit }, index) in products"
              :key="id"
              data-testid="product-card-vertical"
              :disabled="quantityLimit === 0"
              :image-alt="primaryImage?.alt ?? ''"
              :image-url="primaryImage?.url ?? ''"
              :name="name ?? ''"
              :price="price"
              :priority="index === 0"
              :product-id="id"
              :rating-count="rating?.count"
              :rating="rating?.average"
              :sku="sku"
              :slug="slug"
              show-add-to-cart-button
              :is-lazy-loading-data="isLazyLoadingData"
            />
          </section>
          <template v-else>
            <slot name="empty-state">
              <LazyCategoryEmptyState />
            </slot>
          </template>
          <slot
            name="pagination"
            :max-visible-pages="maxVisiblePages"
            :items-per-page="itemsPerPage"
            :total-products="totalProducts"
          />
        </div>
      </div>
      <div class="mt-20 mb-20" data-testid="slot-components-bottom">
        <slot name="components-bottom" />
      </div>
    </div>
  </NarrowContainer>
</template>

<script setup lang="ts">
import { SfButton, SfIconTune, useDisclosure } from '@storefront-ui/vue';
import { whenever } from '@vueuse/core';
import type { CategoryPageContentProps } from '~/components/CategoryPageContent/types';

const props = withDefaults(defineProps<CategoryPageContentProps>(), {
  itemsPerPage: 24,
});

const { isOpen, open, close } = useDisclosure();
const { isTablet, isDesktop } = useBreakpoints();

const maxVisiblePages = computed(() => (isDesktop.value ? 5 : 1));

const router = useRouter();
const isEmptySearch = computed(() => {
  return !(router.currentRoute.value.query?.search != null && props.products?.length === 0);
});

whenever(isTablet, close);
</script>
