import Image from 'next/image';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import formatPrice from '@/util/formatPrice';
import { motion } from 'framer-motion';
import { AddCartType } from '@/types/AddCartType';
import { useCartStore } from '@/store';

const CartItem = ({ id, name, image, unit_amount, quantity }: AddCartType) => {
  const cartStore = useCartStore();

  return (
    <motion.div layout className="my-4 flex gap-4 rounded-lg bg-base-100 p-4">
      <Image
        className="h-24 rounded-md"
        src={image ? image : '/default-product-image.png'}
        alt={name}
        width={120}
        height={120}
        placeholder="blur"
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
        <p className="text-sm">{unit_amount && formatPrice(unit_amount)}</p>
      </div>
    </motion.div>
  );
};

export default CartItem;
