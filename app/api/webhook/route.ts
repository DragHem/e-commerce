import Stripe from 'stripe';
import client from '@/libs/prisma';
import { headers } from 'next/headers';
import stripe from '@/libs/stripe';

export async function POST(request: Request) {
  const signature = headers().get('stripe-signature') as string;
  const body = await request.text();

  if (!signature)
    return Response.json('Missing the stripe signature', {
      status: 400,
    });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (e: any) {
    return Response.json('Webhook Error' + e.message);
  }

  switch (event.type) {
    case 'payment_intent.created':
      const paymentIntent = event.data.object;
      console.log('Payment intent was created');
      break;

    case 'charge.succeeded':
      const charge = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === 'string') {
        const order = await client.order.update({
          where: { paymentIntentID: charge.payment_intent },
          data: { status: 'complete' },
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return Response.json({ received: true });
}
