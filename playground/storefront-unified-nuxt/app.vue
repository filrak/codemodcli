<template>
  <Body class="font-body" />
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
usePageTitle();
const { locale } = storeToRefs(useSfState());

useHead({
  htmlAttrs: {
    lang: locale.value,
  },
});
</script>
