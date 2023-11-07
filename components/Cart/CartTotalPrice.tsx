import React from 'react';
import { motion } from 'framer-motion';
import formatPrice from '@/util/formatPrice';
import { useCartStore } from '@/store';

const CartTotalPrice = ({ totalPrice }: { totalPrice: number }) => {
  const cartStore = useCartStore();

  return (
    <motion.div layout>
      <p>Total: {formatPrice(totalPrice)}</p>
      <button
        onClick={() => cartStore.setCheckout('checkout')}
        className="btn btn-primary mt-4 w-full rounded-md py-2 text-white"
      >
        Check out
      </button>
    </motion.div>
  );
};

export default CartTotalPrice;
