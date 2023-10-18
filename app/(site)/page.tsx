import getProducts from '@/actions/stripe/getProducts';
import Product from '@/components/Product';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="grid grid-cols-fluid gap-12">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </main>
  );
}
