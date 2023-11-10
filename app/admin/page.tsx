import React from 'react';

import { z } from 'zod';
import Form from '@/app/admin/Form';
import stripe from '@/libs/stripe';

const Admin = () => {
  async function create(previousState: any, formData: FormData) {
    'use server';

    const createSchema = z.object({
      name: z.string().min(3, 'Name input is to short'),
      price: z.number().min(1),
    });

    const d = createSchema.safeParse({
      name: formData.get('name'),
      price: Number(formData.get('price')),
    });

    if (!d.success)
      return {
        errors: d.error.flatten().fieldErrors,
      };

    const product = await stripe.products.create({
      name: formData.get('name') as string,
      default_price_data: {
        unit_amount: Number(formData.get('price')) * 100,
        currency: 'pln',
      },
      expand: ['default_price'],
      active: false,
    });

    console.log(product);
  }

  return (
    <div>
      Admin Page
      <Form create={create} />
    </div>
  );
};

export default Admin;
