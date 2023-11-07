import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AiFillShopping } from 'react-icons/ai';

const CartEmpty = () => {
  return (
    <AnimatePresence>
      <motion.div
        animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
        initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
        exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
        className="flex flex-col items-center gap-4 pt-56 text-2xl font-medium opacity-75"
      >
        <h1>Your cart is empty...</h1>
        <AiFillShopping size={70} />
      </motion.div>
    </AnimatePresence>
  );
};

export default CartEmpty;
