import React from 'react';
import Image from 'next/image';

import formatPrice from '@/util/formatPrice';
import type { ProductType } from '@/types/ProductType';
import Link from 'next/link';

const Product = ({
  name,
  unit_amount,
  image,
  id,
  description,
  metadata,
}: ProductType) => {
  const { features } = metadata;

  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, id, description, features },
      }}
    >
      <div className="text-gray-700">
        <Image
          src={image ? image : '/default-product-image.png'}
          alt={name}
          width={800}
          height={800}
          className="h-96 w-full rounded-lg object-cover"
        />
        <div className="py-2 font-medium">
          <h1>{name}</h1>
          <h2 className="text-sm text-teal-700">
            {unit_amount && formatPrice(unit_amount)}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Product;
