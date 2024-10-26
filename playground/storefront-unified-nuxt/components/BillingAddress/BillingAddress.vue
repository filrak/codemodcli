<template>
  <div
    class="mb-4"
    data-testid="billing-address"
  >
    <div class="flex justify-between items-center">
      <h3 class="text-neutral-900 font-semibold typography-headline-5">
        {{ $t('billing.heading') }}
      </h3>
      <SfButton
        data-testid="edit-button"
        size="sm"
        variant="tertiary"
        @click="open"
      >
        {{ $t('billing.change') }}
      </SfButton>
    </div>
    <p
      v-if="isSameAddress"
      class="text-neutral-900"
      data-testid="billing-address-same-address"
    >
      {{ $t('billing.sameAddress') }}
    </p>
    <LazyUiAddress
      v-else-if="savedAddress"
      :address="savedAddress"
      class="not-italic mt-2 md:w-[520px]"
    />
    <LazyCheckoutAddressList
      v-if="isOpen"
      :is-open="isOpen"
      :saved-address="savedAddress ?? undefined"
      :heading="$t('selectAddressModalHeading')"
      @on-close="close"
      @on-save="handleOnSave"
    />
  </div>
</template>

<script setup lang="ts">
import { SfButton, useDisclosure } from '@storefront-ui/vue';
import type { SfCreateAddressBody, SfCustomerAddress } from '~/types';
import { compareAddresses } from '~/utils/findAddress';
import type { BillingAddressProps } from './types';

const props = defineProps<BillingAddressProps>();
const emit = defineEmits<{
  'on-save': [data: SfCreateAddressBody];
}>();

const { isOpen, open, close } = useDisclosure();
const { cart } = storeToRefs(useSfState());

const isSameAddress = ref(true);
const handleOnSave = (data: SfCustomerAddress | SfCreateAddressBody) => {
  // TODO remove casting to SfCreateAddressBody when it will be fixed in the core https://vsf.atlassian.net/browse/UST-1016

  emit('on-save', data as SfCreateAddressBody);
  close();

  if (cart.value?.shippingAddress) {
    isSameAddress.value = compareAddresses(cart.value.shippingAddress, data);
  }
};

watch(cart, () => {
  if (cart.value?.shippingAddress && props.savedAddress) {
    isSameAddress.value = compareAddresses(cart.value.shippingAddress, props.savedAddress);
  }
});
</script>
