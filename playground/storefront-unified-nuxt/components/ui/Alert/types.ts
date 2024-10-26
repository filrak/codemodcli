export enum AlertVariant {
  positive = 'positive',
  error = 'error',
  warning = 'warning',
  secondary = 'secondary',
  neutral = 'neutral',
}

export interface AlertProps {
  size?: 'sm' | 'base';
  strong?: boolean;
  variant?: `${AlertVariant}`;
}
