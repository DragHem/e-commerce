import getProducts from '@/app/functions/stripe/getProducts';

export default async function Home() {
  const products = await getProducts();
  console.log(products);

  return (
    <main>
      <h1 className="text-2xl text-green-500">Tailwindworks</h1>
    </main>
  );
}
