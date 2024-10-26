<template>
  <form ref="formRef" class="flex flex-wrap gap-4 md:mx-4 mb-6 border border-neutral-200 rounded-md p-4 pt-2 pb-3">
    <label class="flex-grow-[2] w-full xl:w-auto">
      <UiFormLabel>{{ $t('creditCard.cardNumber') }}</UiFormLabel>
      <SfInput
        v-model="formData.number"
        data-testid="cc-number"
        class="tracking-widest"
        name="number"
        placeholder="4111 1111 1111 1111"
        autocomplete="cc-number"
        pattern="\d{4}(?:\s\d{4}){3}"
        :title="$t('creditCard.cardNumberPattern')"
        required
        @input="formData.number = formatCreditCardNumber($event.target.value)"
      />
    </label>
    <label class="flex-1">
      <UiFormLabel>{{ $t('creditCard.expiryMonth') }}</UiFormLabel>
      <SfSelect
        v-model="formData.expiryMonth"
        data-testid="cc-expiry-month"
        name="expiryMonth"
        placeholder="MM"
        autocomplete="cc-exp-month"
        required
      >
        <option v-for="month in expiryMonthsOptions" :key="month">{{ month }}</option>
      </SfSelect>
    </label>
    <label class="flex-1">
      <UiFormLabel>{{ $t('creditCard.expiryYear') }}</UiFormLabel>
      <SfSelect
        v-model="formData.expiryYear"
        data-testid="cc-expiry-year"
        name="expiryYear"
        placeholder="YYYY"
        autocomplete="cc-exp-year"
        required
      >
        <option v-for="year in expiryYearsOptions" :key="year">{{ year }}</option>
      </SfSelect>
    </label>
  </form>
</template>

<script setup lang="ts">
import { SfInput, SfSelect } from '@storefront-ui/vue';
import { CreditCardFormRef, CreditCardPayment } from './types';

const expiryMonthsOptions = Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0'));
const expiryYearsOptions = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

function formatCreditCardNumber(input: string) {
  const cleaned = input.replace(/\D/g, '').slice(0, 16);
  return cleaned.replace(/(\d{4})/g, '$1 ').trim();
}

const formData = ref<CreditCardPayment['payload']>({
  number: '',
  expiryMonth: '',
  expiryYear: '',
});

const getFormState = () => {
  return {
    ...formData.value,
    number: formData.value.number.replace(/\s/g, ''),
  };
};

const formRef = ref<HTMLFormElement>();

defineExpose<CreditCardFormRef>({
  getFormState,
  reportValidity: () => formRef.value?.reportValidity() ?? false,
});
</script>
