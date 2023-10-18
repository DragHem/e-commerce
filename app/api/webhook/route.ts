import Stripe from 'stripe';
import client from '@/libs/prisma';
import { buffer } from 'micro';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { NextApiRequest } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16',
});

export async function POST(request: Request) {
  // const buf = await buffer(request as NextApiRequest);
  const signature = headers().get('stripe-signature');
}

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
