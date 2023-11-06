'use client';

import { useState, useEffect, FormEvent } from 'react';
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import formatPrice from '@/util/formatPrice';
import { useCartStore } from '@/store';

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce(
    (prev, item) => prev + item.unit_amount! * item.quantity!,
    0,
  );

  const formattedPrice = formatPrice(totalPrice);

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;
  }, [stripe]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: 'if_required',
      })
      .then((result) => {
        if (!result.error) {
          cartStore.setCheckout('success');
        }

        setIsLoading(false);
      });
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <AddressElement id="payment-element" options={{ mode: 'shipping' }} />
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <h2 className="py-4 text-sm font-bold">Total: {formattedPrice}</h2>
      <button
        className="w-full rounded-md bg-primary py-2 text-white disabled:opacity-25"
        id="submit"
        disabled={isLoading || !stripe || !elements}
      >
        <span id="button-text"> {isLoading ? 'Processing' : 'Pay now!'}</span>
      </button>
    </form>
  );
};

export default CheckoutForm;
