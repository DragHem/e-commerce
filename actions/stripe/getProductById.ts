import Stripe from 'stripe';

export default async function getProduct(id: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-08-16',
  });

  const product = await stripe.products.retrieve(id);
  const price = await stripe.prices.list({
    product: id,
  });

  const features = product.metadata.features || '';

  return {
    id: product.id,
    name: product.name,
    unit_amount: price.data[0].unit_amount,
    image: product.images[0],
    currency: price.data[0].currency,
    description: product.description,
    metadata: { features },
  };
}
