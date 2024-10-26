<template>
  <div class="w-full mb-6 last:mb-0">
    <span
      data-testid="list-settings-item"
      class="bg-neutral-100 md:rounded-md px-4 py-2 text-sm font-semibold font-headings mb-2 tracking-widest uppercase block"
    >
      {{ title }}
    </span>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
