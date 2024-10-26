<template>
  <div>
    <UiNavbarTop />
    <main data-testid="checkout-layout">
      <NarrowContainer>
        <div data-testid="cart-page" class="px-4 md:px-0 mb-20">
          <div data-testid="cart-header" class="flex justify-between mt-8 mb-10 px-4 md:px-0">
            <h1 class="font-semibold typography-headline-3 md:typography-headline-2">{{ heading }}</h1>
            <SfButton
              data-testid="back-button-mobile"
              :tag="NuxtLinkLocale"
              :to="backHref"
              class="flex md:hidden whitespace-nowrap"
              size="sm"
              variant="tertiary"
            >
              <template #suffix><SfIconChevronRight /></template>{{ backLabelMobile }}</SfButton
            >
            <SfButton :tag="NuxtLinkLocale" :to="backHref" class="hidden md:flex" variant="tertiary">
              <template #suffix><SfIconChevronRight /></template>{{ backLabelDesktop }}
            </SfButton>
          </div>
          <span v-if="loading" class="!flex justify-center my-40 h-24">
            <SfLoaderCircular size="3xl" />
          </span>
          <slot v-else />
        </div>
      </NarrowContainer>
    </main>
    <UiFooter />
  </div>
</template>

<script setup lang="ts">
import { SfButton, SfIconChevronRight } from '@storefront-ui/vue';

defineProps<{
  backLabelDesktop: string;
  backLabelMobile: string;
  backHref: string;
  heading: string;
}>();

const { loading } = useCart();

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');
</script>
