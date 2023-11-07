import getOrders from '@/actions/getOrders';
import formatPrice from '@/util/formatPrice';
import Image from 'next/image';

export const revalidate = 0;

const Dashboard = async () => {
  const orders = await getOrders();

  if (!orders) return <div>You need to be logged in to see yours orders</div>;

  if (orders.length === 0)
    return (
      <div>
        <h1>No orders</h1>
      </div>
    );

  return (
    <div>
      <h1>Your Orders</h1>
      <div className="font-medium">
        {orders.map((order) => (
          <div
            key={order.id}
            className="my-4 space-y-2 rounded-lg bg-base-200 p-8"
          >
            <h2 className="text-xs font-medium">Order reference: {order.id}</h2>
            <p className="text-xs">
              Status:
              <span
                className={`${
                  order.status === 'complete' ? 'bg-teal-700' : 'bg-orange-500'
                } rounded-md p-2 py-1 text-sm text-white`}
              >
                {order.status}
              </span>
            </p>
            <p>Time: {new Date(order.createdDate).toDateString()}</p>

            <p className="text-xs">Total: {formatPrice(order.amount)}</p>
            <div className="text-sm">
              {order.products.map((product) => (
                <div key={product.id} className="py-2">
                  <h2 className="py-2">{product.name}</h2>
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        product.image
                          ? product.image
                          : '/default-product-image.png'
                      }
                      width={92}
                      height={92}
                      alt={product.name}
                      priority
                      className="w-auto"
                      placeholder="blur"
                    />
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
