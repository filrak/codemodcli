import type { Ref } from 'vue';
import type { NuxtError } from '#app';
import type { AsyncDataExecuteOptions, GetCategory } from '~/types';
import { GetCategoryArgs, Maybe } from '~/types';

export interface UseCategoryState {
  data: Maybe<Awaited<ReturnType<GetCategory>>>;
  loading: boolean;
}

export type FetchCategory = (
  params: Partial<GetCategoryArgs>,
  options?: {
    /**
     * If not set, the default useHandleError will be used.
     */
    handleError?: (error: NuxtError) => void;
  },
) => Promise<(refetchOptions?: AsyncDataExecuteOptions) => Promise<void>>;

export interface UseCategory {
  data: Readonly<Ref<UseCategoryState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchCategory: FetchCategory;
}

export type UseCategoryReturn = (id: string) => UseCategory;
