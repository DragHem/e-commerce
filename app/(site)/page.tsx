'use client';

import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <main>
      <h1 className="text-2xl text-green-500">Tailwindworks</h1>
    </main>
  );
}
