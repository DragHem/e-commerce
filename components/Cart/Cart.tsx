'use client';
import { useCartStore } from '@/store';
import { motion } from 'framer-motion';
import Checkout from '@/components/Cart/Checkout';
import OrderConfirmed from '@/components/Cart/OrderConfirmed';
import CartTotalPrice from '@/components/Cart/CartTotalPrice';
import CartEmpty from '@/components/Cart/CartEmpty';
import CartItemsList from '@/components/Cart/CartItemsList';

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
        className="absolute right-0 top-0 h-screen w-full overflow-y-scroll bg-base-200 p-12 lg:w-1/4"
      >
        {cartStore.onCheckout === 'cart' && <CartItemsList />}

        {cartStore.cartQuantity > 0 && cartStore.onCheckout === 'cart' && (
          <CartTotalPrice totalPrice={totalPrice} />
        )}

        {/*checkout form*/}
        {cartStore.onCheckout === 'checkout' && <Checkout />}
        {cartStore.onCheckout === 'success' && <OrderConfirmed />}

        {!cartStore.cartQuantity && cartStore.onCheckout === 'cart' && (
          <CartEmpty />
        )}
      </motion.div>
    </motion.div>
  );
};

export default Cart;
