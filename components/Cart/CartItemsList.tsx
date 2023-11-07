import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import CartItem from '@/components/Cart/CartItem';
import { useCartStore } from '@/store';

const CartItemsList = () => {
  const cartStore = useCartStore();

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button onClick={() => cartStore.toggleCart()} className="md:hidden">
          <AiFillCloseCircle size={24} />
        </button>
      </div>
      {cartStore.cart.map((product) => (
        <CartItem key={product.id} {...product} />
      ))}
    </>
  );
};

export default CartItemsList;
