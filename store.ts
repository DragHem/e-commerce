import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AddCartType } from '@/types/AddCartType';

type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  cartQuantity: number;
};

type ActionCartState = {
  toggleCart: () => void;
  addProduct: (item: AddCartType) => void;
};

export const useCartStore = create<CartState & ActionCartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      cartQuantity: 0,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id,
          );

          if (!existingItem) {
            return {
              cart: [...state.cart, { ...item, quantity: 1 }],
              cartQuantity: state.cartQuantity + 1,
            };
          }

          const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === item.id)
              return { ...cartItem, quantity: cartItem.quantity! + 1 };

            return cartItem;
          });
          return { cart: updatedCart, cartQuantity: state.cartQuantity + 1 };
        }),
    }),
    { name: 'cart-store' },
  ),
);
