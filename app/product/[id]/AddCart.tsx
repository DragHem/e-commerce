'use client';

import { useCartStore } from '@/store';
import type { AddCartType } from '@/types/AddCartType';
import { useState } from 'react';

const AddCart = ({ name, id, image, unit_amount, quantity }: AddCartType) => {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ id, name, image, unit_amount, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 300);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="btn btn-primary my-4 w-full"
      disabled={added}
    >
      {!added && <span>Add to cart</span>}
      {added && <span>Adding to cart</span>}
    </button>
  );
};

export default AddCart;
