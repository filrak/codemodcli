export * from 'storefront-middleware/types';

export type Maybe<TType> = TType | null;

export interface AsyncDataExecuteOptions {
  _initial?: boolean;
  /**
   * Force a refresh, even if there is already a pending request. Previous requests will
   * not be cancelled, but their result will not affect the data/pending state - and any
   * previously awaited promises will not resolve until this new request resolves.
   *
   * Instead of using `boolean` values, use `cancel` for `true` and `defer` for `false`.
   * Boolean values will be removed in a future release.
   */
  dedupe?: boolean | 'cancel' | 'defer';
}
