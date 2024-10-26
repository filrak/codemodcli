import { toRefs } from '@vueuse/shared';
import { UseCurrenciesDataState } from '~/composables/useCurrency/types';

export const useCurrenciesData = () => {
  const state = useState<UseCurrenciesDataState>('useCurrenciesData', () => ({
    loading: false,
  }));
  const { currencies, currency } = storeToRefs(useSfState());

  const fetchCurrencies = async () => {
    state.value.loading = true;
    const { data, error } = await useAsyncData('useCurrenciesData', () => useSdk().unified.getCurrencies(), {});
    useHandleError(error.value);
    currencies.value = data.value?.currencies || [];
    currency.value = data.value?.currentCurrency || data.value?.defaultCurrency || '';
    state.value.loading = false;
    return data;
  };

  return {
    ...toRefs(state.value),
    fetchCurrencies,
  };
};
