<template>
  <div ref="intersectionRef" class="top-1/2 pointer-events-none z-40 absolute" data-testid="scroll-top">
    <SfButton
      square
      variant="secondary"
      :aria-label="$t('scrollTop')"
      :class="[
        'bg-white transition-opacity fixed right-4 bottom-20',
        targetIsVisible ? 'opacity-0' : 'opacity-100 pointer-events-auto',
      ]"
      @click="scrollToTop"
    >
      <template #prefix>
        <SfIconExpandLess />
      </template>
    </SfButton>
  </div>
</template>

<script setup lang="ts">
import { SfButton, SfIconExpandLess } from '@storefront-ui/vue';
import { useIntersectionObserver } from '@vueuse/core';

const intersectionRef = ref<HTMLElement | null>();
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const targetIsVisible = ref(false);
const { stop } = useIntersectionObserver(intersectionRef, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting;
});

onUnmounted(() => {
  stop();
});
</script>
