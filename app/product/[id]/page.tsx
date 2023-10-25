import Image from 'next/image';
import React from 'react';
import { SearchParamTypes } from '@/types/SearchParamType';
import formatPrice from '@/util/formatPrice';
import AddCart from '@/app/product/[id]/AddCart';

const ProductPage = async ({ searchParams }: SearchParamTypes) => {
  const { image, name, description, unit_amount, features } = searchParams;

  return (
    <div className="flex flex-col justify-between gap-16 md:flex-row">
      <Image
        src={image ? image : '/default-product-image.png'}
        alt={name}
        width={600}
        height={600}
        className="rounded-lg"
      />
      <div className="font-medium">
        <h1 className="py-2 text-2xl">{name}</h1>
        <p className="py-2">{description}</p>
        <p className="py-2">{features}</p>
        <div className="flex gap-2">
          <p className="text-primary font-bold">
            {unit_amount && formatPrice(unit_amount)}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
};

export default ProductPage;
