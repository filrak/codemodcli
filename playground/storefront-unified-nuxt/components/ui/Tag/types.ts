export enum TagVariant {
  primary = 'primary',
  secondary = 'secondary',
  negative = 'negative',
  warning = 'warning',
}

export enum TagSize {
  sm = 'sm',
  base = 'base',
}

export interface TagProps {
  size?: `${TagSize}`;
  strong?: boolean;
  variant?: `${TagVariant}`;
}
