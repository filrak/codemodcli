import type { Ref } from 'vue';
import type { AsyncDataExecuteOptions, GetCategories } from '~/types';
import { GetCategoriesArgs, Maybe } from '~/types';

export interface UseCategoriesState {
  data: Maybe<Awaited<ReturnType<GetCategories>>>;
  loading: boolean;
}

export type FetchCategories = (params: GetCategoriesArgs) => Promise<(opts?: AsyncDataExecuteOptions) => Promise<void>>;

export interface UseCategories {
  data: Readonly<Ref<UseCategoriesState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchCategories: FetchCategories;
}

export type UseCategoriesReturn = (id: string) => UseCategories;
