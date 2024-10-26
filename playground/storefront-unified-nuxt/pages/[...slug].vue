<template>
  <NarrowContainer v-if="page">
    <RenderCmsContent v-for="component of page.componentsAboveFold" :key="component.id" :item="component" />
    <RenderCmsContent v-for="component of page.componentsBelowFold" :key="component.id" :item="component" />
  </NarrowContainer>
</template>

<script lang="ts" setup>
import type { AgnosticCmsComponent } from '@vsf-enterprise/cms-components-utils';
import { useCacheControl, useCmsPage } from '~/composables';
import RenderCmsContent from '../components/cms/wrappers/RenderCmsContent.vue';

/**
 * CMS Dynamic Page interface
 */
interface DynamicPage {
  /**
   * Components to be rendered immediately when the page is loaded.
   */
  componentsAboveFold: AgnosticCmsComponent[];
  /**
   * Components to be rendered only after scrolling down the page.
   */
  componentsBelowFold: AgnosticCmsComponent[];
}

const { page, getPage, initLivePreview } = useCmsPage<DynamicPage>();
const { setCacheControl } = useCacheControl();

setCacheControl();

await useAsyncData(getPage);

onMounted(initLivePreview);
</script>
