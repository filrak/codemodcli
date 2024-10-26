<template>
  <UiModal
    v-model="value"
    aria-labelledby="address-modal-title"
    class="h-full w-full overflow-auto md:w-[600px] md:h-fit flex flex-col gap-y-6"
    data-testid="address-modal"
  >
    <UiModalClose @click="$emit('on-close')" />
    <UiModalHeader id="address-modal-title">{{ heading }}</UiModalHeader>
    <AddressModalForm :id="formId" :saved-address="address" @on-save="$emit('on-save', $event)" />
    <UiModalActions>
      <UiModalCancel data-testid="form-cancel" @click="$emit('on-close')">{{ $t('contactInfo.cancel') }}</UiModalCancel>
      <UiModalSubmit data-testid="save" :loading="loading" type="submit" :form="formId">{{
        $t('contactInfo.save')
      }}</UiModalSubmit>
    </UiModalActions>
  </UiModal>
</template>

<script setup lang="ts">
import { uniqueId } from 'lodash-es';
import type { AddressModalProps } from '~/components/AddressModal/types';
import type { SfCreateAddressBody } from '~/types';

defineProps<AddressModalProps>();

const emits = defineEmits<{
  (event: 'on-close'): void;
  (event: 'on-save', data: SfCreateAddressBody): void;
}>();

const value = computed({
  get() {
    return true;
  },
  set(value) {
    if (value) {
      return;
    }
    emits('on-close');
  },
});

const formId = uniqueId('address-form');
</script>
