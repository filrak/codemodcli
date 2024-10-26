<template>
  <UiDivider class="col-span-3 -mx-4 !w-auto md:mx-0" />
  <h2 class="hidden md:block typography-headline-4 font-semibold mx-4 capitalize col-span-3 my-4 md:my-6">
    {{ $t('account.ordersAndReturns.myOrders') }}
  </h2>
  <div v-if="!data || data.length === 0" class="col-span-3 text-center mt-8">
    <img
      src="/images/empty-cart.svg"
      :alt="$t('account.ordersAndReturns.noOrdersAltText')"
      width="192"
      height="192"
      class="mx-auto"
    />
    <h3 class="typography-headline-3 font-semibold mb-4 mt-6">{{ $t('account.ordersAndReturns.noOrders') }}</h3>
    <SfButton variant="secondary" class="!ring-neutral-200">
      {{ $t('account.ordersAndReturns.continue') }}
    </SfButton>
  </div>
  <div v-else class="col-span-3" data-testid="orders-list">
    <ul v-for="{ id, orderDate, totalPrice, status } in data" :key="id" class="md:hidden my-4 last-of-type:mb-0">
      <li>
        <p class="block typography-text-sm font-medium">{{ $t('account.ordersAndReturns.orderId') }}</p>
        <span class="block typography-text-sm mb-2">{{ id }}</span>
      </li>
      <li>
        <p class="block typography-text-sm font-medium">
          {{ $t('account.ordersAndReturns.orderDate') }}
        </p>
        <span class="block typography-text-sm mb-2">{{ orderDate }}</span>
      </li>
      <li>
        <p class="block typography-text-sm font-medium">{{ $t('account.ordersAndReturns.amount') }}</p>
        <span class="block typography-text-sm mb-2">${{ totalPrice.precisionAmount }}</span>
      </li>
      <li class="flex flex-wrap items-center mb-2">
        <p class="block typography-text-sm -mb-1.5 font-medium flex-[100%]">
          {{ $t('account.ordersAndReturns.status') }}
        </p>
        <span class="block typography-text-sm flex-1">{{ status }}</span>
        <SfButton
          :tag="NuxtLinkLocale"
          size="sm"
          variant="tertiary"
          :to="`${paths.accountMyOrders}/${id}`"
          data-testid="button"
        >
          {{ $t('account.ordersAndReturns.details') }}
        </SfButton>
      </li>
      <UiDivider class="col-span-3 -mx-4 !w-auto md:mx-0" />
    </ul>
    <table class="hidden md:block text-left typography-text-sm mx-4" data-testid="orders-table">
      <caption class="hidden">
        {{
          $t('account.ordersAndReturns.listOfOrders')
        }}
      </caption>
      <thead class="border-b-2 border-neutral-200">
        <tr>
          <th class="lg:py-4 py-2 lg:pr-4 pr-2 font-medium">{{ $t('account.ordersAndReturns.orderId') }}</th>
          <th class="lg:p-4 p-2 font-medium lg:whitespace-nowrap">{{ $t('account.ordersAndReturns.orderDate') }}</th>
          <th class="lg:p-4 p-2 font-medium">{{ $t('account.ordersAndReturns.amount') }}</th>
          <th class="lg:p-4 p-2 font-medium">{{ $t('account.ordersAndReturns.status') }}</th>
          <th class="lg:py-4 py-2 lg:pl-4 pl-2" />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="{ id, orderDate, totalPrice, status } in data"
          :key="id"
          class="border-b border-neutral-200"
          data-testid="orders-table-row"
        >
          <td class="lg:py-4 py-2 lg:pr-4 pr-2 lg:whitespace-nowrap">{{ id }}</td>
          <td class="lg:p-4 p-2 lg:whitespace-nowrap">{{ orderDate }}</td>
          <td class="lg:p-4 p-2">${{ totalPrice.precisionAmount }}</td>
          <td :class="['lg:p-4 p-2 ', { 'text-negative-700': status === 'Cancelled' }]">{{ status }}</td>
          <td class="py-1.5 lg:pl-4 pl-2 text-right w-full">
            <SfButton
              :tag="NuxtLinkLocale"
              size="sm"
              variant="tertiary"
              :to="`${paths.accountMyOrders}/${id}`"
              data-testid="button"
            >
              {{ $t('account.ordersAndReturns.details') }}
            </SfButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <NuxtPage />
</template>

<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';

definePageMeta({
  layout: 'account',
  middleware: 'auth',
});

const { fetchCustomerOrders, data } = useCustomerOrders();

onMounted(async () => {
  await nextTick();
  await fetchCustomerOrders();
});

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');
</script>
