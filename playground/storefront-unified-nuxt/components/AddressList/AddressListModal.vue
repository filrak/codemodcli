<template>
  <UiModal
    class="overflow-hidden flex flex-col max-md:gap-y-6 m-auto w-full h-full md:w-fit md:h-fit md:max-h-[calc(100%-80px)] md:max-w-[calc(100%-80px)]"
    data-testid="address-list-modal"
    open
    disable-click-away
    :model-value="true"
  >
    <UiModalClose @click="$emit('on-close')" />
    <UiModalHeader>{{ heading }}</UiModalHeader>

    <div class="relative h-full md:h-auto overflow-hidden flex flex-col inher max-md:pb-4">
      <slot />
    </div>

    <UiModalActions class="mt-6">
      <UiModalCancel data-testid="form-cancel" @click="$emit('on-close')">{{ $t('form.cancel') }}</UiModalCancel>
      <UiModalSubmit data-testid="save" :disabled="submitDisabled" :loading="submitting" @click="$emit('on-save')">{{
        $t('form.confirm')
      }}</UiModalSubmit>
    </UiModalActions>
  </UiModal>
</template>

<script setup lang="ts">
import { AddressListModalProps } from './types';

defineProps<AddressListModalProps>();

defineEmits<{
  'on-close': [];
  'on-save': [];
}>();
</script>
