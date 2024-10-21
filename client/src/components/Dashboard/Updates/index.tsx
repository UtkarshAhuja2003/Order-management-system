import React from 'react';
import { Order } from '@/interfaces/order';
import Badge from '@/components/common/Badge';
import { OrderStatus } from '@/utils/constants';

const Updates: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.updated_at || '').getTime() - new Date(a.updated_at || '').getTime())
    .slice(0, 10);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Updates</h2>
      <ul className="space-y-4">
        {recentOrders.map((order) => (
          <li
            key={order.id}
            className="p-4 bg-white shadow rounded flex flex-col sm:flex-row sm:justify-between items-start sm:items-center"
          >
            <div className="flex flex-col sm:flex-row sm:space-x-6">
              <p className="text-sm font-medium text-gray-700">
                Customer: {order.customer_email || 'N/A'}
              </p>
              <Badge status={order.status || OrderStatus.CONFIRMED} />
            </div>
            <div className="mt-2 sm:mt-0">
              <p className="text-sm text-gray-500">
                Updated At: {new Date(order.updated_at || '').toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Updates;
