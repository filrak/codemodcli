<template>
  <UiDivider class="col-span-3 -mx-4 !w-auto md:mx-0" />
  <div data-testid="addresses-list">
    <div
      v-for="(address, i) in data"
      :key="i"
      class="flex flex-col gap-4 md:gap-5 my-5 relative"
      data-testid="addresses-item"
    >
      <div class="md:mx-4">
        <div class="flex justify-between w-full my-2">
          <h2 class="typography-headline-4 font-semibold">
            {{ $t('account.accountSettings.shippingDetails.shippingAddress') }} {{ i + 1 }}
          </h2>
          <div class="absolute sm:relative bottom-6 sm:bottom-0 right-0 sm:right-0 ml-auto">
            <ConfirmationModal
              :is-confirming="loading"
              :confirm-label="$t('account.accountSettings.shippingDetails.confirmation.delete')"
              :cancel-label="$t('account.accountSettings.shippingDetails.confirmation.cancel')"
              aria-labelledby="confirmation-modal-title"
              @on-confirm="deleteAddress(address.id)"
            >
              <template #default>
                <p id="confirmation-modal-title" class="text-base font-medium" data-testid="delete-address-heading">
                  {{ $t('account.accountSettings.shippingDetails.confirmation.deleteAddress1') }}
                </p>
                <p class="text-base font-normal" data-testid="delete-address-body">
                  {{ $t('account.accountSettings.shippingDetails.confirmation.deleteAddress2') }}
                </p>
              </template>
              <template #trigger="{ open: openConfirmationModal }">
                <SfButton variant="tertiary" size="sm" data-testid="delete-address" @click="openConfirmationModal">{{
                  $t('account.accountSettings.personalData.delete')
                }}</SfButton>
              </template>
            </ConfirmationModal>
            <SfButton variant="tertiary" size="sm" data-testid="edit-address" @click="editAddress(address.id)">{{
              $t('account.accountSettings.personalData.edit')
            }}</SfButton>
          </div>
        </div>

        <UiAddress :address="address" class="not-italic mt-4 pb-10 sm:pb-0" />
      </div>
      <UiDivider class="col-span-3 -mx-4 !w-auto md:mx-0" />
    </div>
  </div>
  <div class="flex flex-col gap-4 md:gap-5 my-5 relative">
    <div class="md:mx-4">
      <template v-if="data?.length === 0">
        <p class="mb-4" data-testid="description-body">
          {{ $t('account.accountSettings.shippingDetails.emptyStateHint') }}
        </p>
      </template>
      <div>
        <SfButton class="w-full md:w-auto" variant="secondary" data-testid="add-address-button" @click="addAddress">
          {{ $t('account.accountSettings.shippingDetails.addAddress') }}
        </SfButton>
      </div>
    </div>
    <UiDivider class="col-span-3 -mx-4 !w-auto md:mx-0" />
  </div>

  <AddressModal
    v-if="isOpen"
    :heading="$t('account.accountSettings.shippingDetails.shippingAddress')"
    :address="selectedAddress"
    :loading="loading"
    @on-save="handleModalSave"
    @on-close="close"
  />
</template>

<script setup lang="ts">
import { SfButton, useDisclosure } from '@storefront-ui/vue';
import type { SfCreateAddressBody, SfCustomerAddress } from '~/types';

definePageMeta({
  layout: 'account',
  middleware: 'auth',
});
const { isOpen, open, close } = useDisclosure();

const { data, loading, createCustomerAddress, getCustomerAddress, deleteCustomerAddress, updateCustomerAddress } =
  useCustomerAddress();

const selectedAddress = ref<SfCustomerAddress | undefined>();

const handleModalSave = async (address: SfCreateAddressBody & { id?: string }) => {
  const { id, ...addressBody } = address;
  await (id
    ? updateCustomerAddress({
        id,
        address: addressBody as SfCreateAddressBody,
      })
    : createCustomerAddress({ address: addressBody as SfCreateAddressBody }));
  close();
};

const editAddress = (id: string) => {
  selectedAddress.value = data.value?.find((address) => address.id === id);
  open();
};

const deleteAddress = async (id: string) => {
  await deleteCustomerAddress({ id });
  close();
};

const addAddress = () => {
  selectedAddress.value = undefined;
  open();
};

getCustomerAddress();
</script>
