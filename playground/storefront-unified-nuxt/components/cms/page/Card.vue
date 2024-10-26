<template>
  <div
    class="flex flex-col min-w-[325px] max-w-[375px] lg:w-[496px] relative border border-neutral-200 rounded-md hover:shadow-xl"
  >
    <a
      class="absolute inset-0 z-1 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-md"
      href="/"
    />
    <img v-if="image" :src="image.desktop" :alt="image.alt" class="object-cover h-auto rounded-t-md aspect-video" />
    <div class="flex flex-col items-start p-4 grow">
      <p class="font-medium typography-text-base">{{ title }}</p>
      <p class="mt-1 mb-4 font-normal typography-text-sm text-neutral-700">{{ description }}</p>
      <SfButton
        v-if="button"
        size="sm"
        variant="tertiary"
        class="relative mt-auto"
        :tag="NuxtLinkLocale"
        :to="button.link"
      >
        {{ button.label }}
      </SfButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { SfButton } from '@storefront-ui/vue';
import type { AgnosticCmsCardProps } from '@vsf-enterprise/cms-components-utils';

type CardProps = AgnosticCmsCardProps;

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');

defineProps<CardProps>();
</script>
