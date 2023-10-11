'use client';
import Image from 'next/image';
import { useCartStore } from '@/store';
import formatPrice from '@/util/formatPrice';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';

const MyComponent = () => {
  const cartStore = useCartStore();

  return (
    <div
      className="fixed left-0 top-0 h-screen w-full bg-black/25"
      onClick={() => cartStore.toggleCart()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-screen w-1/4 overflow-y-scroll bg-white p-12 text-gray-700"
      >
        <h1>Here's your shopping list</h1>
        {cartStore.cart.map(({ id, name, image, unit_amount, quantity }) => (
          <div className="flex gap-4 py-4" key={id}>
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
          </div>
        ))}
        <button className="mt-4 w-full rounded-md bg-teal-700 py-2 text-white">
          Check out
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
