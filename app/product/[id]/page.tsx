import Image from 'next/image';
import React from 'react';
import { SearchParamTypes } from '@/types/SearchParamType';
import formatPrice from '@/util/formatPrice';
import AddCart from '@/app/product/[id]/AddCart';

const ProductPage = async ({ searchParams }: SearchParamTypes) => {
  const { image, name, description, unit_amount, features } = searchParams;

  return (
    <div className="flex justify-between gap-24 p-12 text-gray-700">
      <Image
        src={image ? image : '/default-product-image.png'}
        alt={name}
        width={600}
        height={600}
      />
      <div className="font-medium text-gray-700">
        <h1 className="py-2 text-2xl">{name}</h1>
        <p className="py-2">{description}</p>
        <p className="py-2">{features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-teal-700">
            {unit_amount && formatPrice(unit_amount)}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
};

export default ProductPage;
