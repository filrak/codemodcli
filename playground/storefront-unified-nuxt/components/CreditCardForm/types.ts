import { PaymentMethod } from '../CheckoutPayment/types';

export type CreditCardPayment = {
  paymentMethod: PaymentMethod.CreditCard;
  payload: {
    number: string;
    expiryMonth: string;
    expiryYear: string;
  };
};

export type CreditCardFormRef = {
  getFormState(): CreditCardPayment['payload'];
  reportValidity(): boolean;
};
