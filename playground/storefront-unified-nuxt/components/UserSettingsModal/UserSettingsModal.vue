<template>
  <UiModal
    :model-value="true"
    class="w-full overflow-auto max-w-[calc(100%-2rem)] sm:max-w-[480px] md:h-fit gap-y-6 flex flex-col"
    data-testid="region-modal"
    @update:model-value="$emit('on-close')"
  >
    <UiModalClose @click="$emit('on-close')" />
    <UiModalHeader>{{ $t('choosePreferences') }}</UiModalHeader>
    <form
      class="flex flex-col gap-y-4"
      data-testid="contact-information-form"
      @submit.prevent="handleSubmit"
      @change="isFormChanged = true"
    >
      <label>
        <UiFormLabel>{{ $t('language') }}</UiFormLabel>
        <SfSelect v-model="selected.locale" :aria-label="$t('language')" data-testid="language-select">
          <option v-for="localeItem in locales" :key="localeItem" :value="localeItem" data-testid="language-option">
            {{ getLanguageLabel(localeItem) }}
          </option>
        </SfSelect>
      </label>
      <label>
        <UiFormLabel>{{ $t('currency') }}</UiFormLabel>
        <SfSelect v-model="selected.currency" :aria-label="$t('currency')" data-testid="currency-select">
          <option v-for="value in currencies" :key="value" :value="value" data-testid="currency-option">
            {{ getCurrencyLabel(value, true) }}
          </option>
        </SfSelect>
      </label>
      <div class="mt-2">
        <SfButton type="submit" class="w-full capitalize" :disabled="!isFormChanged" data-testid="region-save-button">
          {{ $t('form.saveChanges') }}
        </SfButton>
      </div>
    </form>
  </UiModal>
</template>

<script setup lang="ts">
import { SfButton, SfSelect } from '@storefront-ui/vue';
import type { SfLocale } from '~/types';

const emit = defineEmits<{
  'on-close': [];
}>();

const { setLocale } = useI18n();
const { locale, locales, currencies, currency } = storeToRefs(useSfState());
const { getLanguageLabel } = useLocation();
const { getCurrencyLabel, setCurrency } = useCurrency();

const isFormChanged = ref(false);
const selected = ref({
  locale: locale.value ?? '',
  currency: currency.value ?? '',
});

const handleSubmit = async () => {
  setCurrency(selected.value.currency);
  await setLocale(selected.value.locale);
  locale.value = selected.value.locale as SfLocale;
  await nextTick();
  emit('on-close');
};
</script>
