<template>
  <div>
    <NuxtLayout name="default">
      <CategoryPageContent
        v-if="productsCatalog"
        :title="$t('resultsFor', { phrase: query.search })"
        :total-products="productsCatalog.pagination.totalResults"
        :products="productsCatalog.products"
        :is-lazy-loading-data="lazyLoading"
      >
        <template v-if="productsCatalog.products.length > 0" #sidebar>
          <CategorySorting />
          <FilterContainer :title="$t('filters')">
            <div class="flex flex-col gap-2">
              <CategoryFilters :facets="productsCatalog.facets" />
            </div>
          </FilterContainer>
        </template>
        <template #pagination="{ totalProducts, itemsPerPage, maxVisiblePages }">
          <UiPagination
            v-if="totalProducts > itemsPerPage"
            :current-page="currentPage"
            :total-items="totalProducts"
            :page-size="itemsPerPage"
            :max-visible-pages="maxVisiblePages"
            @on-page-changed="onPageChanged"
          />
        </template>
        <template #empty-state>
          <SearchEmptyState />
        </template>
      </CategoryPageContent>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { t } = useI18n();
const {
  setPageInQuery,
  fetchProducts,
  watchQuery,
  query,
  data: productsCatalog,
  lazyLoading,
} = useLazySearchProducts();

watchQuery();
await fetchProducts();

const currentPage = computed(() => query.value.currentPage);
const onPageChanged = (page: number) => {
  setPageInQuery(page);
};

useSeoItemList({ udmProductCatalogItemList: productsCatalog.value?.products ?? [] });

useHead({
  title: t('resultsFor', { phrase: query.value.search }) || t('searchResults.noMatches'),
});
</script>
