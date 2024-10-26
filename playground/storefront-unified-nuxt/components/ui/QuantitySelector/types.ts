import { type SfButtonSize } from '@storefront-ui/vue';

export interface QuantitySelectorProps {
  modelValue: number;
  minValue?: number;
  maxValue?: number;
  size?: `${SfButtonSize}`;
  showPlaceholder?: boolean;
  disabled?: boolean;
}

export type QuantitySelectorEmits = (event: 'update:modelValue', value: QuantitySelectorProps['modelValue']) => void;
