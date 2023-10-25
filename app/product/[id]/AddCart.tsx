'use client';

import { useCartStore } from '@/store';
import type { AddCartType } from '@/types/AddCartType';

const AddCart = ({ name, id, image, unit_amount, quantity }: AddCartType) => {
  const cartStore = useCartStore();

  return (
    <button
      onClick={() =>
        cartStore.addProduct({ id, name, image, unit_amount, quantity })
      }
      className="btn btn-primary my-4 w-full"
    >
      Add to cart
    </button>
  );
};

export default AddCart;
