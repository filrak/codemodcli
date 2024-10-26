import type { ComputedRef } from 'vue';

export type UseLocationReturn = () => {
  getLanguageLabel: ComputedRef<(language: string) => string>;
  stripLocalePath: (path: string, locale?: string) => string;
};
