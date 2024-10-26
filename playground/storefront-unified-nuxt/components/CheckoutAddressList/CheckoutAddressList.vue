<template>
  <LazyAddressListModal
    v-if="isOpen && customer"
    :heading="heading"
    :submitting="submitting"
    :submit-disabled="submitting || customerAddressListLoading || isCurrentAddress || !selectedAddress"
    @on-save="$emit('on-save', selectedAddress!)"
    @on-close="$emit('on-close')"
  >
    <div class="overflow-y-auto overscroll-contain flex md:max-h-80 md:mt-6">
      <div class="w-screen max-w-[750px] min-w-0 flex">
        <span v-if="customerAddressListLoading" class="flex justify-center m-auto h-24 overflow-hidden">
          <SfLoaderCircular size="3xl" />
        </span>
        <template v-else>
          <AddressList
            v-if="(customerAddresses ?? []).length > 0"
            :addresses="customerAddresses ?? []"
            :selected="selectedAddress?.id"
            class="w-full"
            @on-select="handleSelect"
          />
          <h4 v-else>
            {{ $t('emptyAddressList') }}
          </h4>
        </template>
      </div>
    </div>
    <SfButton data-testid="add-new-address" variant="tertiary" class="mt-4 self-start" @click="createAddressModal.open">
      {{ $t('addNewAddress') }}
    </SfButton>
  </LazyAddressListModal>
  <LazyAddressModal
    v-if="createAddressModal.isOpen.value"
    :heading="$t('newAddressModalHeading')"
    :loading="submitting"
    @on-save="handleCreateAddress"
    @on-close="createAddressModal.close"
  />

  <LazyAddressModal
    v-if="isOpen && !customer"
    :heading="heading"
    :address="savedAddress"
    :loading="submitting"
    @on-save="$emit('on-save', $event)"
    @on-close="$emit('on-close')"
  />
</template>

<script setup lang="ts">
import { SfButton, SfLoaderCircular, useDisclosure } from '@storefront-ui/vue';
import type { CheckoutAddressListProps } from '~/components/CheckoutAddressList/types';
import type { SfCreateAddressBody, SfCustomerAddress } from '~/types';
import { compareAddresses, findAddress } from '~/utils/findAddress';

const props = defineProps<CheckoutAddressListProps>();
defineEmits<{
  'on-close': [];
  'on-save': [data: SfCustomerAddress | SfCreateAddressBody];
}>();

const createAddressModal = useDisclosure();
const { customer } = storeToRefs(useSfState());
const {
  data: customerAddresses,
  loading: customerAddressListLoading,
  getCustomerAddress,
  createCustomerAddress,
} = useCustomerAddress();

const findSelectedAddress = () => findAddress(customerAddresses.value || [], props.savedAddress);
const selectedAddress = ref<SfCustomerAddress | undefined>(findSelectedAddress());
const isCurrentAddress = computed(
  () => selectedAddress.value && compareAddresses(props.savedAddress, selectedAddress.value),
);
const handleSelect = (address: SfCustomerAddress) => {
  selectedAddress.value = address;
};

const handleCreateAddress = async (address: SfCreateAddressBody) => {
  const createdAddress = await createCustomerAddress({ address });
  createAddressModal.close();
  selectedAddress.value = createdAddress.value?.address;
};

onMounted(async () => {
  if (customer.value && !customerAddresses.value) {
    await getCustomerAddress();
    selectedAddress.value = findSelectedAddress();
  }
});
</script>
