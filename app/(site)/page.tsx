import getProducts from '@/actions/stripe/getProducts';
import Product from '@/app/components/Product';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="grid-cols-fluid grid gap-12">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </main>
  );
}
