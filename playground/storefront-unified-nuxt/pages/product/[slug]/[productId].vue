<template>
  <div>
    <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
      <NarrowContainer>
        <div
          class="md:grid gap-x-6 [grid-template-areas:'left-top_right''left-bottom_right'] grid-cols-[minmax(56%,500px)auto]"
        >
          <section class="[grid-area:left-top] md:h-full xl:max-h-[700px]">
            <NuxtLazyHydrate when-idle>
              <Gallery :images="product?.gallery ?? []" />
            </NuxtLazyHydrate>
          </section>
          <section class="[grid-area:right] mb-10 md:mb-0">
            <NuxtLazyHydrate when-idle>
              <UiPurchaseCard v-if="product" :product="product" :is-lazy-loading-data="isLazyLoadingData" />
            </NuxtLazyHydrate>
          </section>
          <section class="[grid-area:left-bottom] md:mt-8">
            <NuxtLazyHydrate when-visible>
              <ProductAttributes v-if="product" :product="product" />
            </NuxtLazyHydrate>
            <UiDivider class="mt-4 mb-2 md:mt-8" />
            <NuxtLazyHydrate when-visible>
              <ProductAccordion v-if="product" :product="product" />
            </NuxtLazyHydrate>
          </section>
          <UiDivider class="mt-4 mb-2" />
        </div>
        <div class="mt-20 mb-20 px-4 md:px-0" data-testid="slot-components-bottom">
          <RenderCmsContent v-if="page?.componentsBottom" :item="page.componentsBottom" />
        </div>
      </NarrowContainer>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { whenever } from '@vueuse/core';
import RenderCmsContent from '~/components/cms/wrappers/RenderCmsContent.vue';
import { useCacheControl } from '~/composables/useCacheControl';
import { useCmsPage } from '~/composables/useCmsPage';
import { useLazyProduct } from '~/composables/useLazyProduct';

/**
 * CMS Product Details Page interface
 */
interface ProductDetailsPage {
  /**
   * Components to be rendered only after scrolling down the page.
   */
  componentsBottom: any;
}

definePageMeta({
  layout: false,
});

const route = useRoute();
const id = route.params.productId as string;
const sku = route.query.sku as string;

const { data, fetchProduct, lazyLoading: isLazyLoadingData } = useLazyProduct(id, sku);
const { page, getPage, initLivePreview } = useCmsPage<ProductDetailsPage>();
const { currency } = storeToRefs(useSfState());

const product = computed(() => data.value?.product);
const { setCacheControl } = useCacheControl();
setCacheControl();
await fetchProduct();

whenever(currency, () => {
  fetchProduct();
});

const { breadcrumbs } = useProductBreadcrumbs(data.value?.categoryHierarchy || [], data.value?.product.name);
const title = computed(() => product.value?.name ?? '');

useHead({
  title,
});

await useAsyncData(getPage);
onMounted(initLivePreview);
</script>
