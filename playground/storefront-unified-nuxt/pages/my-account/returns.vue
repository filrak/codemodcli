<template>
  <UiDivider class="col-span-3 -mx-4 !w-auto md:mx-0" />
  <h2 class="hidden md:block col-span-3 typography-headline-4 mb-4 font-semibold mx-4 my-4 md:my-6 capitalize">
    {{ $t('account.ordersAndReturns.returnsHeading') }}
  </h2>
  <div v-if="!data?.length" class="col-span-3 text-center">
    <img
      src="/images/returns.png"
      :alt="$t('account.ordersAndReturns.returnsAltText')"
      width="192"
      height="192"
      class="mx-auto"
    />
    <h3 class="typography-headline-3 font-semibold mt-6 mb-4">
      {{ $t('account.ordersAndReturns.noOrders') }}
    </h3>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'account',
  middleware: 'auth',
});

const { data, fetchCustomerReturns } = useCustomerReturns();

await fetchCustomerReturns();
</script>
