<template>
  <div class="px-4 md:px-0" data-testid="order-success-page">
    <div
      v-if="orderSuccessData"
      class="border border-1 border-neutral-200 mt-10 mb-20 rounded p-4 md:p-6 flex flex-col items-center max-w-2xl mx-auto"
    >
      <img src="/images/order-success.svg" :alt="$t('orderSuccessfulImageAlt')" width="192" height="192" />
      <h1 class="mt-6 mb-1 font-semibold typography-headline-3">{{ $t('successInfoHeader') }}</h1>
      <p class="text-center">
        <i18n-t v-if="isCustomerLoggedIn" keypath="successInfoMessage">
          <template #successOrderId>
            <span class="font-medium">{{ orderSuccessData.id }}</span>
          </template>
          <template #successInfoLink>
            <SfLink :href="paths.accountMyOrders">
              {{ $t('successInfoLink') }}
            </SfLink>
          </template>
        </i18n-t>
        <i18n-t v-else keypath="successInfoMessageNotLoggedIn">
          <template #successOrderId>
            <span class="font-medium">{{ orderSuccessData.id }}</span>
          </template>
        </i18n-t>
      </p>
      <div class="border border-1 border-neutral-200 rounded bg-neutral-100 p-4 w-full my-4 space-y-4 text-sm">
        <div v-if="orderSuccessData.shippingAddress">
          <h2 class="font-medium text-base">{{ $t('shippingAddress') }}</h2>
          <UiAddress :address="orderSuccessData.shippingAddress" class="not-italic" />
        </div>

        <div v-if="orderSuccessData.shippingMethod?.estimatedDelivery">
          <h2 class="font-medium text-base">{{ $t('etaDelivery') }}</h2>
          <p class="capitalize">{{ orderSuccessData.shippingMethod.estimatedDelivery }}</p>
        </div>

        <div v-if="orderSuccessData.id">
          <h2 class="font-medium text-base">{{ $t('shippingDetails') }}</h2>
          <p>{{ orderSuccessData.shippingMethod.name }}</p>
        </div>
      </div>

      <div data-testid="success-order-details" class="text-left w-full text-sm mb-6 flex flex-col gap-1">
        <div>
          <span class="font-medium">{{ $t('orderSuccess.orderTitle') }}</span
          >:
          {{ orderSuccessData.id }}
        </div>
        <div>
          <span class="font-medium">{{ $t('orderSuccess.orderDate') }}</span
          >:
          {{ orderSuccessData.orderDate }}
        </div>
        <div>
          <span class="font-medium">{{ $t('orderSuccess.paymentAmount') }}</span
          >:
          {{ formatPrice(orderSuccessData.totalPrice) }}
        </div>
        <div>
          <span class="font-medium">{{ $t('orderSuccess.paymentMethod') }}</span
          >:
          {{ orderSuccessData.paymentMethod }}
        </div>
        <div v-if="orderSuccessData?.billingAddress" class="flex whitespace-pre-wrap flex-wrap">
          <span class="font-medium">{{ $t('orderSuccess.billingAddress') }}</span
          >:
          <UiAddress :address="orderSuccessData.billingAddress" class="not-italic flex flex-wrap" />
        </div>
      </div>

      <SfButton :tag="NuxtLinkLocale" to="/" class="max-md:w-full mt-4 !ring-[#E4E4E7]" variant="secondary">
        {{ $t('continueShopping') }}
      </SfButton>
    </div>
    <div v-else class="flex justify-center my-40 h-24">
      <SfLoaderCircular size="3xl" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfButton, SfLoaderCircular, SfLink } from '@storefront-ui/vue';

definePageMeta({
  layout: 'order',
});

const { customer } = storeToRefs(useSfState());
const isCustomerLoggedIn = computed(() => Boolean(customer.value));
const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');
const { formatPrice } = useFormatPrice();

const router = useRouter();
const { data: orderSuccessData } = useNuxtData('order-success-data');

if (!orderSuccessData.value) {
  router.push('/');
}
</script>
