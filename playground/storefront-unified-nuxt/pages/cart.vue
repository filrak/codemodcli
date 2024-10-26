<template>
  <div>
    <NuxtLayout
      name="checkout"
      :back-href="paths.category"
      :back-label-desktop="$t('continueShopping')"
      :back-label-mobile="$t('back')"
      :heading="$t('myCart')"
    >
      <CartPageContent />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
