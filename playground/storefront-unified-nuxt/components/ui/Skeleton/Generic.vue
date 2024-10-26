<template>
  <div :class="skeletonClasses" v-bind="attributes">
    <template v-if="inline && !isLoaded">Text</template>
    <template v-else-if="isLoaded"><slot /></template>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
  className: {
    type: String,
    default: '',
  },
  isLoaded: {
    type: Boolean,
    required: true,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  attributes: {
    type: Object,
    default: () => ({}),
  },
});

const { className, isLoaded, inline, attributes } = toRefs(props);

const skeletonClasses = computed(() => {
  return isLoaded.value
    ? [className.value]
    : ['animate-pulse rounded-full bg-slate-200 text-transparent', className.value];
});
</script>
