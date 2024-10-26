<template>
  <UiDivider class="col-span-3 -mx-4 !w-auto md:mx-0" />
  <AccountData
    class="col-span-3 my-4 md:my-6"
    :header="$t('account.accountSettings.personalData.yourName')"
    :button-text="$t('account.accountSettings.personalData.edit')"
    data-testid="account-data-name"
    @on-click="openModal('yourName')"
  >
    {{ customer?.firstName }} {{ customer?.lastName }}
  </AccountData>
  <UiDivider class="col-span-3 -mx-4 !w-auto md:mx-0" />
  <AccountData
    class="col-span-3 my-4 md:my-6"
    :header="$t('account.accountSettings.personalData.contactInformation')"
    :button-text="$t('account.accountSettings.personalData.edit')"
    data-testid="account-data-email"
    @on-click="openModal('contactInformation')"
  >
    {{ customer?.email }}
  </AccountData>
  <UiDivider class="col-span-3 -mx-4 !w-auto md:mx-0" />
  <AccountData
    class="col-span-3 my-4 md:my-6"
    :header="$t('account.accountSettings.personalData.yourPassword')"
    :button-text="$t('account.accountSettings.personalData.change')"
    data-testid="account-data-password"
    @on-click="openModal('passwordChange')"
  >
    ******
  </AccountData>
  <UiDivider class="col-span-3 -mx-4 !w-auto md:mx-0" />
  <UiModal
    ref="modalElement"
    v-model="isOpen"
    tag="section"
    role="dialog"
    class="h-full w-full overflow-auto md:w-[600px] md:h-fit"
    aria-labelledby="address-modal-title"
  >
    <UiModalClose @click="closeModal" />
    <UiModalHeader id="address-modal-title">{{
      $t(`account.accountSettings.personalData.${openedForm}`)
    }}</UiModalHeader>

    <UiAlert v-if="changePasswordErrorMsg" variant="error" class="mb-4 w-full" data-testid="passwordResetErrorAlert">
      <template #prefix>
        <SfIconWarning class="mr-2 text-red-700 shrink-0" />
      </template>
      {{ $t(changePasswordErrorMsg) }}
    </UiAlert>
    <AccountFormsName
      v-if="openedForm === 'yourName'"
      :first-name="customer?.firstName"
      :last-name="customer?.lastName"
      @on-save="updateCustomer"
      @on-cancel="closeModal"
    />
    <ContactInformationForm
      v-else-if="openedForm === 'contactInformation'"
      :email="customer?.email"
      @on-save="updateCustomer"
      @on-cancel="closeModal"
    />
    <AccountFormsPassword
      v-else-if="openedForm === 'passwordChange'"
      :email="customer?.email"
      @on-save="changeCustomerPassword"
      @on-cancel="closeModal"
    />
  </UiModal>
</template>

<script setup lang="ts">
import { SfIconWarning, useDisclosure } from '@storefront-ui/vue';
import { unrefElement } from '@vueuse/core';
import { ChangeCustomerPasswordArgs } from '~/types';

definePageMeta({
  layout: 'account',
  middleware: 'auth',
});

const { isOpen, open, close } = useDisclosure();
const { customer } = storeToRefs(useSfState());

const lastActiveElement = ref();
const modalElement = ref();
const openedForm = ref('');

const openModal = async (modalName: string) => {
  openedForm.value = modalName;
  lastActiveElement.value = document.activeElement;
  open();
  await nextTick();
  unrefElement(modalElement).focus();
};
const closeModal = () => {
  close();
  lastActiveElement.value.focus();
};

const { mutate: updateCustomer } = useUpdateCustomer({
  onSuccess() {
    closeModal();
  },
});

const { mutate: changePassword, error: changePasswordError } = useChangeCustomerPassword({
  onSuccess() {
    closeModal();
  },
});

const changePasswordErrorMsg = computed(() => {
  return changePasswordError.value?.errorMessage
    ? `account.accountSettings.personalData.${changePasswordError.value.errorMessage}`
    : null;
});

const changeCustomerPassword = async (password: ChangeCustomerPasswordArgs) => {
  await changePassword(password);
};
</script>
