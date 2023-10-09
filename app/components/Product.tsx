import React from 'react';
import Image from 'next/image';

import formatPrice from '@/util/formatPrice';
import type { ProductType } from '@/types/ProductType';

const Product = ({ name, price, image }: ProductType) => {
  return (
    <div>
      <Image src={image} alt={name} width={400} height={400} />
      <h1>{name}</h1>
      {price && formatPrice(price)}
    </div>
  );
};

export default Product;
