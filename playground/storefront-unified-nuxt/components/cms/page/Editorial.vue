<template>
  <div v-html="content" />
</template>

<script lang="ts" setup>
import type { AgnosticCmsEditorialProps } from '@vsf-enterprise/cms-components-utils';

type EditorialProps = AgnosticCmsEditorialProps;

defineProps<EditorialProps>();
</script>

<style scoped>
:deep(p) {
  @apply typography-text-base;
}

:deep(h1) {
  @apply typography-headline-2 md:typography-headline-1;
}

:deep(h2) {
  @apply typography-headline-3 md:typography-headline-2;
}

:deep(h3) {
  @apply typography-headline-4 md:typography-headline-3;
}

:deep(h4) {
  @apply typography-headline-5 md:typography-headline-4;
}

:deep(h5) {
  @apply typography-headline-6 md:typography-headline-5;
}

:deep(h6) {
  @apply typography-headline-6 md:typography-headline-6;
}

:deep(ul) {
  @apply list-disc list-inside;
}

:deep(ol) {
  @apply list-decimal list-inside;
}

:deep(a) {
  @apply underline text-primary-700;
}

:deep(th) {
  @apply bg-primary-700 text-white text-left font-medium border px-4 py-2;
}

:deep(td) {
  @apply text-left border px-4 py-2;
}

:deep(img) {
  @apply inline-block;
}

:deep(blockquote) {
  @apply border-l-4 border-primary-700 italic;
}
</style>
