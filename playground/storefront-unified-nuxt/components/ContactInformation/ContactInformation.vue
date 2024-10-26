<template>
  <div data-testid="contact-information" class="md:px-4 py-6">
    <div class="flex justify-between items-center">
      <h2 class="text-neutral-900 font-semibold typography-headline-4 mb-4">{{ $t('contactInfo.heading') }}</h2>
      <SfButton
        v-if="cart?.customerEmail && isEditable"
        data-testid="edit-button"
        size="sm"
        variant="tertiary"
        @click="open"
      >
        {{ $t('contactInfo.change') }}
      </SfButton>
    </div>
    <div v-if="cart?.customerEmail" class="mt-2 md:w-[520px]">
      <p class="text-neutral-900" data-testid="customer-email">{{ cart.customerEmail }}</p>
    </div>
    <div v-else class="w-full md:max-w-[520px]">
      <p class="text-neutral-900">{{ $t('contactInfo.description') }}</p>
      <SfButton data-testid="add-button" class="mt-4 w-full md:w-auto" variant="secondary" @click="open">
        {{ $t('contactInfo.add') }}
      </SfButton>
    </div>

    <UiModal
      v-if="isOpen"
      :model-value="true"
      tag="section"
      role="dialog"
      class="h-full w-full overflow-auto md:w-[600px] md:h-fit"
      aria-labelledby="contact-modal-title"
    >
      <UiModalClose @click="close" />
      <UiModalHeader id="contact-modal-title">{{ $t('contactInfo.heading') }}</UiModalHeader>

      <ContactInformationForm
        :email="cart?.customerEmail"
        :is-editable="isEditable"
        :loading="loading"
        @on-save="setCustomerEmail({ email: $event.email })"
        @on-cancel="close"
      />
    </UiModal>
  </div>
</template>
<script setup lang="ts">
import { SfButton, useDisclosure } from '@storefront-ui/vue';
import type { ContactInformationProps } from '~/components/ContactInformation/types';

defineProps<ContactInformationProps>();

const { isOpen, open, close } = useDisclosure();
const { cart } = storeToRefs(useSfState());
const { loading, mutate: setCustomerEmail } = useSetCustomerEmail({ onSuccess: close });
</script>
