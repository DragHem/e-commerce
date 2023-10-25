'use client';
import Image from 'next/image';
import { useCartStore } from '@/store';
import formatPrice from '@/util/formatPrice';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import { AiFillCloseCircle, AiFillShopping } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import Checkout from '@/components/Checkout';
import OrderConfirmed from '@/components/OrderConfirmed';

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
        className="bg-base-200 absolute right-0 top-0 h-screen w-full overflow-y-scroll p-12 lg:w-1/4"
      >
        {cartStore.onCheckout === 'cart' && (
          <div className="mb-4 flex justify-between">
            <h1>Here is your shopping list</h1>
            <button
              onClick={() => cartStore.toggleCart()}
              className="md:hidden"
            >
              <AiFillCloseCircle size={24} />
            </button>
          </div>
        )}

        {cartStore.onCheckout === 'cart' && (
          <>
            {cartStore.cart.map(
              ({ id, name, image, unit_amount, quantity }) => (
                <motion.div
                  layout
                  className="bg-base-100 my-4 flex gap-4 rounded-lg p-4"
                  key={id}
                >
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
              ),
            )}
          </>
        )}
        {cartStore.cartQuantity > 0 && cartStore.onCheckout === 'cart' && (
          <motion.div layout>
            <p>Total: {formatPrice(totalPrice)}</p>
            <button
              onClick={() => cartStore.setCheckout('checkout')}
              className="bg-primary mt-4 w-full rounded-md py-2 text-white"
            >
              Check out
            </button>
          </motion.div>
        )}

        {/*checkout form*/}
        {cartStore.onCheckout === 'checkout' && <Checkout />}
        {cartStore.onCheckout === 'success' && <OrderConfirmed />}

        {cartStore.onCheckout === 'checkout' && (
          <div className="mt-4 flex">
            <button
              className="bg-accent w-full rounded-md py-2 text-white disabled:opacity-25"
              onClick={() => cartStore.setCheckout('cart')}
            >
              Check your cart
            </button>
          </div>
        )}

        <AnimatePresence>
          {!cartStore.cartQuantity && cartStore.onCheckout === 'cart' && (
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
