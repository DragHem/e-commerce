import { auth } from '@/libs/authOptions';
import client from '@/libs/prisma';

export default async function getOrders() {
  const session = await auth();

  if (!session) return;

  const orders = await client.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      products: true,
    },
    orderBy: {
      createdDate: 'desc',
    },
  });

  return orders;
}
