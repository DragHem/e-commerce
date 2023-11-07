'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { useEffect } from 'react';
import ConfirmAnimation from '@/components/animations/ConfirmAnimation';

const OrderConfirmed = () => {
  const cartStore = useCartStore();

  useEffect(() => {
    cartStore.setPaymentIntent('');
    cartStore.clearCart();
  }, []);

  return (
    <motion.div
      className="my-12 flex items-center justify-center"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="rounded-md p-12 text-center">
        <h1 className="text-xl font-medium">Your order has been confirmed</h1>
        <h2 className="my-4 text-sm">Check your email for the receipt.</h2>

        <ConfirmAnimation />

        <div className="flex items-center justify-center gap-12">
          <Link href="/dashboard">
            <button
              onClick={() => {
                cartStore.toggleCart();
                setTimeout(() => cartStore.setCheckout('cart'), 1000);
              }}
              className="btn btn-accent w-full rounded-md py-2 text-white"
            >
              Check your order
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderConfirmed;
