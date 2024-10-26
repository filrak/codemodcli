<template>
  <form data-testid="contact-information-form" @submit.prevent="$emit('on-save', { email: formData.customerEmail })">
    <label>
      <UiFormLabel>{{ $t('contactInfo.email') }}</UiFormLabel>
      <SfInput
        v-model="formData.customerEmail"
        name="email"
        type="email"
        autocomplete="email"
        required
        :disabled="loading"
        data-testid="email-input"
      />
      <UiFormHelperText v-if="!isEditable">{{ $t('contactInfo.emailPersistent') }}</UiFormHelperText>
    </label>
    <UiModalActions class="mt-4">
      <UiModalCancel data-testid="form-cancel" type="reset" @click="$emit('on-cancel')">{{
        $t('contactInfo.cancel')
      }}</UiModalCancel>
      <UiModalSubmit :loading="loading" data-testid="save" type="submit">{{ $t('contactInfo.save') }}</UiModalSubmit>
    </UiModalActions>
  </form>
</template>
<script setup lang="ts">
import { SfInput } from '@storefront-ui/vue';
import { type ContactInformationFormProps } from './types';

const props = defineProps<ContactInformationFormProps>();

defineEmits<{
  'on-save': [data: { email: string }];
  'on-cancel': [];
}>();

const formData = ref({
  customerEmail: props.email ?? '',
});
</script>
