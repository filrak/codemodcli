<template>
  <div>
    <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
      <CategoryPageContent
        v-if="productsCatalog"
        :title="currentCategory?.name || $t('allProducts')"
        :total-products="productsCatalog.pagination.totalResults"
        :products="productsCatalog.products"
        :is-lazy-loading-data="lazyLoading"
      >
        <template #components-top>
          <RenderCmsContent v-if="page?.componentsTop" :item="page.componentsTop" />
        </template>
        <template #sidebar>
          <CategorySorting />
          <FilterContainer :title="$t('filters')">
            <div class="flex flex-col gap-2">
              <CategoryTree :categories="categories" :parent="parent" :current-category="currentCategory" />
              <CategoryFilters :facets="filterFacets" />
            </div>
          </FilterContainer>
        </template>
        <template #pagination="{ totalProducts, itemsPerPage, maxVisiblePages }">
          <UiPagination
            :current-page="query.currentPage"
            :total-items="totalProducts"
            :page-size="itemsPerPage"
            :max-visible-pages="maxVisiblePages"
            @on-page-changed="onPageChanged"
          />
        </template>
        <template #components-bottom>
          <RenderCmsContent v-if="page?.componentsBottom" :item="page.componentsBottom" />
        </template>
      </CategoryPageContent>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import RenderCmsContent from '~/components/cms/wrappers/RenderCmsContent.vue';
import { useCmsPage } from '~/composables/useCmsPage';
import { useLazySearchProducts } from '~/composables/useLazySearchProducts';

/**
 * CMS Category Page interface
 */
interface CategoryPage {
  /**
   * Components to be rendered only after scrolling down the page.
   */
  componentsBottom: any;
  /**
   * Components to be rendered immediately when the page is loaded.
   */
  componentsTop: any;
}

definePageMeta({
  layout: false,
});

const { t } = useI18n();
const route = useRoute();
const parentPathname = useParentPathname();
const { page, getPage, initLivePreview } = useCmsPage<CategoryPage>();

if (Object.keys(route.query).length === 0) {
  // We cache only base category pages
  // Please note, that this page should not be cached if the results are coming from personalized recommendations
  const { setCacheControl } = useCacheControl();
  setCacheControl();
}

const {
  fetchProducts,
  setPageInQuery,
  watchQuery,
  data: productsCatalog,
  query,
  lazyLoading,
} = useLazySearchProducts();
const { data: categoryData, fetchCategory } = useCategory('plp');
const categoryId = computed(() => route.params.slugs?.at(-1) as string | undefined);

watchQuery();
await fetchProducts();
await fetchCategory({ id: categoryId.value }).catch(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Category Not found',
  });
});

const onPageChanged = (page: number) => {
  setPageInQuery(page);
};
const { breadcrumbs } = useCategoryBreadcrumbs(categoryData);

// Category Tree

const categories = computed(
  () =>
    productsCatalog.value?.facets
      .find((facet) => facet.type === 'CATEGORY')
      ?.values?.map(({ value, label, productCount }) => ({
        name: label,
        count: productCount || 0,
        href: `${route.path}/${value}`,
      })) || [],
);
const currentCategory = computed(() => {
  const category = categoryData.value?.category;
  if (!category) {
    return;
  }
  return {
    name: category.name,
    href: '#',
  };
});

const parent = computed(() => {
  if (!query.value.category) {
    return;
  }

  const category = categoryData.value?.ancestors.at(-1);
  if (!category) {
    return {
      name: t('allFromCategory', { name: t('allProducts') }),
      href: paths.category,
    };
  }

  return {
    name: t('allFromCategory', { name: category?.name }),
    href: parentPathname.value,
  };
});

const filterFacets = computed(() => {
  return productsCatalog.value?.facets.filter((facet) => facet.type !== 'CATEGORY') || [];
});

useSeoItemList({ udmProductCatalogItemList: productsCatalog.value?.products ?? [] });

useHead({
  title: currentCategory.value?.name || t('allProducts'),
});

await useAsyncData(getPage);
onMounted(initLivePreview);
</script>
