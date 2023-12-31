'use client';

import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCartStore, useThemeStore } from '@/store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutForm from '@/components/Cart/CheckoutForm';
import OrderAnimation from '@/components/animations/OrderAnimation';
import { motion } from 'framer-motion';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

const Checkout = () => {
  const cartStore = useCartStore();
  const themeStore = useThemeStore();
  const [clientSecret, setClientSecret] = useState('');

  const router = useRouter();

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      }),
    })
      .then((res) => {
        if (res.status === 403) {
          return router.push('/api/auth/signin');
        }

        return res.json();
      })
      .then((data) => {
        setClientSecret(data.paymentIntent.client_secret);
        cartStore.setPaymentIntent(data.paymentIntent.id);
      });
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: themeStore.mode === 'light' ? 'stripe' : 'night',
      labels: 'floating',
    },
    locale: 'en',
  };

  return (
    <div>
      {!clientSecret && <OrderAnimation />}
      {clientSecret && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
          <div className="mt-4 flex">
            <button
              className="btn btn-accent w-full rounded-md py-2 text-white"
              onClick={() => cartStore.setCheckout('cart')}
            >
              Check your cart
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Checkout;
