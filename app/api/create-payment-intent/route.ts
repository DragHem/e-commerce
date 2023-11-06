import { auth } from '@/libs/authOptions';
import { AddCartType } from '@/types/AddCartType';
import client from '@/libs/prisma';
import { Product } from '.prisma/client';
import stripe from '@/libs/stripe';

const calculateOrderAmount = (items: AddCartType[]) => {
  return items.reduce(
    (acc, item) => acc + item.unit_amount! * item.quantity!,
    0,
  );
};

export async function POST(request: Request) {
  const userSession = await auth();

  if (!userSession)
    return Response.json({ message: 'Not logged in' }, { status: 403 });

  const { items, payment_intent_id } = await request.json();

  const orderData = {
    user: { connect: { id: userSession.user?.id } },
    amount: calculateOrderAmount(items),
    currency: 'pln',
    status: 'pending',
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((item: Product) => ({
        name: item.name,
        description: item.description || null,
        unit_amount: Number(item.unit_amount),
        image: item.image,
        quantity: item.quantity,
      })),
    },
  };

  if (payment_intent_id) {
    const current_intent =
      await stripe.paymentIntents.retrieve(payment_intent_id);

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: calculateOrderAmount(items),
        },
      );

      const existing_order = await client.order.findFirst({
        where: { paymentIntentID: updated_intent.id },
        include: { products: true },
      });

      if (!existing_order) {
        return Response.json(
          { message: 'Invalid Payment Intent' },
          {
            status: 400,
          },
        );
      }

      await client.order.update({
        where: { id: existing_order.id },
        data: {
          amount: calculateOrderAmount(items),
          products: {
            deleteMany: {},
            create: items.map((item: Product) => ({
              name: item.name,
              description: item.description || null,
              unit_amount: Number(item.unit_amount),
              image: item.image,
              quantity: item.quantity,
            })),
          },
        },
      });
      return Response.json(
        { paymentIntent: updated_intent },
        {
          status: 200,
        },
      );
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'pln',
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentID = paymentIntent.id;

    await client.order.create({
      data: orderData,
    });

    return Response.json(
      { paymentIntent },
      {
        status: 200,
      },
    );
  }
}
