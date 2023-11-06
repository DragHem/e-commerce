import { auth } from '@/libs/authOptions';
import client from '@/libs/prisma';

export async function GET() {
  try {
    const session = await auth();

    if (!session)
      return Response.json('Not logged in', {
        status: 403,
      });

    const orders = await client.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        products: true,
      },
    });

    return Response.json(orders, { status: 200 });
  } catch (e) {
    return Response.json('Failed to get orders', {
      status: 500,
    });
  }
}
