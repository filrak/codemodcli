import type { GetProductReviews, Maybe } from '~/types';

type GetProductReviewsReturn = Awaited<ReturnType<GetProductReviews>>;

export interface UseProductReviewsState {
  data: Maybe<GetProductReviewsReturn>;
  loading: boolean;
}

export type FetchProductReviews = () => Promise<Ref<Maybe<GetProductReviewsReturn>>>;

export interface UseProductReviewsReturn {
  data: Readonly<Ref<UseProductReviewsState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchProductReviews: FetchProductReviews;
}

export type UseProductReviews = (productId: string) => UseProductReviewsReturn;
