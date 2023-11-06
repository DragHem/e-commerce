import Image from 'next/image';
import React from 'react';
import { SearchParamTypes } from '@/types/SearchParamType';
import formatPrice from '@/util/formatPrice';
import AddCart from '@/app/product/[id]/AddCart';

import type { Metadata } from 'next';
import getProduct from '@/actions/stripe/getProductById';

type Props = {
  searchParams: { name: string; description: string };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { name: title, description } = searchParams;

  return {
    title,
    description,
  };
}

const ProductPage = async ({ params }: SearchParamTypes) => {
  const { id } = params;

  const product = await getProduct(id);
  const {
    image,
    name,
    description,
    unit_amount,
    metadata: { features },
  } = product;

  return (
    <div className="flex flex-col justify-between gap-16 md:flex-row">
      <Image
        src={image ? image : '/default-product-image.png'}
        alt={name}
        width={600}
        height={600}
        className="rounded-lg"
        priority
      />
      <div className="font-medium">
        <h1 className="py-2 text-2xl">{name}</h1>
        <p className="py-2">{description}</p>
        <p className="py-2">{features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-primary">
            {unit_amount && formatPrice(unit_amount)}
          </p>
        </div>
        <AddCart {...product} />
      </div>
    </div>
  );
};

export default ProductPage;
