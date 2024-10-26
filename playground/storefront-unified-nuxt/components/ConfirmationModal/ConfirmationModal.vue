<template>
  <slot name="trigger" :open="open" :close="close" />
  <UiModal
    v-bind="$attrs"
    :model-value="isOpen"
    class="w-[320px] overflow-auto md:w-[480px]"
    data-testid="confirmation-modal"
  >
    <UiModalClose @click="close" />

    <slot />
    <UiModalActions class="mt-6">
      <UiModalCancel data-testid="form-cancel" @click="close">{{ cancelLabel || $t('form.cancel') }}</UiModalCancel>
      <UiModalSubmit :loading="isConfirming" data-testid="confirm" type="submit" @click="$emit('on-confirm')">{{
        confirmLabel || $t('form.submit')
      }}</UiModalSubmit>
    </UiModalActions>
  </UiModal>
</template>

<script setup lang="ts">
import { useDisclosure } from '@storefront-ui/vue';
import { ConfirmationModalProps } from './types';

const { isOpen, open, close } = useDisclosure();

withDefaults(defineProps<ConfirmationModalProps>(), {
  isConfirming: false,
});

defineEmits(['on-confirm']);
</script>
