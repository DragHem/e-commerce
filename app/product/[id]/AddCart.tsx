'use client';

import { useCartStore } from '@/store';
import type { AddCartType } from '@/types/AddCartType';

const AddCart = ({ name, id, image, unit_amount, quantity }: AddCartType) => {
  console.log(image);
  const cartStore = useCartStore();

  return (
    <button
      onClick={() =>
        cartStore.addProduct({ id, name, image, unit_amount, quantity })
      }
      className="my-12 rounded-md bg-teal-700 px-6 py-2 font-medium text-white"
    >
      Add to cart
    </button>
  );
};

export default AddCart;
