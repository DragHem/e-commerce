import React from 'react';
import Image from 'next/image';

import formatPrice from '@/util/formatPrice';
import type { ProductType } from '@/types/ProductType';

const Product = ({ name, price, image }: ProductType) => {
  return (
    <div className="text-gray-700">
      <Image
        src={image}
        alt={name}
        width={800}
        height={800}
        className="h-96 w-full rounded-lg object-cover"
      />
      <div className="py-2 font-medium">
        <h1>{name}</h1>
        <h2 className="text-sm text-teal-700">{price && formatPrice(price)}</h2>
      </div>
    </div>
  );
};

export default Product;
