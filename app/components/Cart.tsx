'use client';
import Image from 'next/image';
import { useCartStore } from '@/store';
import formatPrice from '@/util/formatPrice';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import { AiFillCloseCircle, AiFillShopping } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';

const Cart = () => {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce(
    (prev, item) => prev + item.unit_amount! * item.quantity!,
    0,
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed left-0 top-0 h-screen w-full bg-black/25"
      onClick={() => cartStore.toggleCart()}
    >
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-screen w-full overflow-y-scroll bg-white p-12 text-gray-700 lg:w-2/5"
      >
        <div className="flex justify-between">
          <h1>Here's your shopping list</h1>
          <button onClick={() => cartStore.toggleCart()} className="md:hidden">
            <AiFillCloseCircle size={24} />
          </button>
        </div>
        {cartStore.cart.map(({ id, name, image, unit_amount, quantity }) => (
          <motion.div layout className="flex gap-4 py-4" key={id}>
            <Image
              className="h-24 rounded-md"
              src={image ? image : '/default-product-image.png'}
              alt={name}
              width={120}
              height={120}
            />
            <div>
              <h2>{name}</h2>
              <div className="flex gap-2">
                <h2>Quantity: {quantity}</h2>
                <button onClick={() => cartStore.removeProduct(id)}>
                  <IoRemoveCircle />
                </button>
                <button
                  onClick={() =>
                    cartStore.addProduct({
                      id,
                      name,
                      image,
                      unit_amount,
                      quantity,
                    })
                  }
                >
                  <IoAddCircle />
                </button>
              </div>
              <p className="text-sm">
                {unit_amount && formatPrice(unit_amount)}
              </p>
            </div>
          </motion.div>
        ))}
        {!cartStore.cartQuantity || (
          <motion.div layout>
            <p>Total: {formatPrice(totalPrice)}</p>
            <button className="mt-4 w-full rounded-md bg-teal-700 py-2 text-white">
              Check out
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {!cartStore.cartQuantity && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              className="flex flex-col items-center gap-4 pt-56 text-2xl font-medium opacity-75"
            >
              <h1>Your cart is empty...</h1>
              <AiFillShopping size={70} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Cart;
