import getProducts from '@/actions/stripe/getProducts';
import Product from '@/app/components/Product';

export default async function Home() {
  const products = await getProducts();
  console.log(products);

  return (
    <main>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </main>
  );
}
