import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AddCartType } from '@/types/AddCartType';

type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  cartQuantity: number;
  paymentIntent: string;
  onCheckout: string;
};

type ActionCartState = {
  toggleCart: () => void;
  addProduct: (item: AddCartType) => void;
  removeProduct: (itemId: string) => void;
  setPaymentIntent: (val: string) => void;
  setCheckout: (val: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState & ActionCartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      paymentIntent: '',
      onCheckout: 'cart',
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
      removeProduct: (itemId) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === itemId,
          );

          if (existingItem && existingItem.quantity === 1) {
            const filteredCart = state.cart.filter(
              (cartItem) => cartItem.id !== itemId,
            );

            return { cart: filteredCart, cartQuantity: state.cartQuantity - 1 };
          }

          const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === itemId) {
              return { ...cartItem, quantity: cartItem.quantity! - 1 };
            }

            return cartItem;
          });

          return { cart: updatedCart, cartQuantity: state.cartQuantity - 1 };
        }),
      setPaymentIntent: (val) => set(() => ({ paymentIntent: val })),
      setCheckout: (val) => set(() => ({ onCheckout: val })),
      clearCart: () => set(() => ({ cart: [], cartQuantity: 0 })),
    }),

    { name: 'cart-store' },
  ),
);

type ThemeState = {
  mode: 'light' | 'dark';
};

type ActionThemeState = {
  toggleMode: (theme: 'light' | 'dark') => void;
};

export const useThemeStore = create<ThemeState & ActionThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      toggleMode: (theme) => set(() => ({ mode: theme })),
    }),
    { name: 'themeStore' },
  ),
);
