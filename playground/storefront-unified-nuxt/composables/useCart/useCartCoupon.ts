import { ApplyCouponToCartArgs, RemoveCouponFromCartArgs } from '~/types';
import { useCartMutation } from './useCartMutation';

/**
 * @description Composable for applying and removing a coupon from the cart.
 *
 * @returns An object containing the `applyCoupon` and `removeCoupon` methods, as well as a `loading` computed property.
 *
 * @example
 * const { loading, applyCouponToCart, removeCouponFromCart } = useCartCoupon();
 * await applyCouponToCart.mutate({ couponCode: 'coupon' });
 * await removeCouponFromCart.mutate({ couponId }); // couponId can be read from cart.appliedCoupons
 */
export const useCartCoupon = () => {
  const applyCoupon = useCartMutation({
    key: ['main', 'applyCouponToCart'],
    mutationFn: (sdk, args: ApplyCouponToCartArgs) => sdk.unified.applyCouponToCart(args),
    meta: {
      skipErrorNotification: () => true,
    },
    onSuccess: (data) => {
      const notification = useNotification();
      if ((data as unknown as { message?: string })?.message) {
        notification.error('messages.error.cart.applyCartCoupon');
      } else {
        notification.success('messages.success.cart.applyCartCoupon');
      }
    },
  });

  const removeCoupon = useCartMutation({
    key: ['main', 'removeCouponFromCart'],
    mutationFn: (sdk, args: RemoveCouponFromCartArgs) => sdk.unified.removeCouponFromCart(args),
    meta: {
      notificationKey: 'cart.removeCartCoupon',
    },
  });

  const loading = computed(() => applyCoupon.loading.value || removeCoupon.loading.value);

  return {
    applyCoupon,
    removeCoupon,
    loading,
  };
};
