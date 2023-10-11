'use client';
import Image from 'next/image';
import { useCartStore } from '@/store';

const MyComponent = () => {
  const cartStore = useCartStore();

  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
};

export default MyComponent;
