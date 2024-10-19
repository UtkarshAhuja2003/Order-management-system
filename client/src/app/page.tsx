"use client"
import React, { useEffect, useState } from 'react';
import { getAllOrders, deleteOrder } from '@/api/order';
import { Order } from '@/interfaces/order';
import { useBanner } from '@/hooks/useBanner';
import Banner from '@/components/common/Banner';
import Link from 'next/link';

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { banner, showBanner, closeBanner } = useBanner();

  useEffect(() => {
    const loadOrders = async () => {
      const data = await getAllOrders();
      if (data.data) {
        setOrders(data.data);
      } else {
        showBanner('error', 'Failed to load orders');
      }
    };
    loadOrders();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteOrder(id);
    setOrders(orders.filter(order => order.id !== id));
    showBanner('success', 'Order deleted successfully');
  };

  return (
    <div className="container mx-auto p-6">
      {banner.isVisible && banner.type && <Banner message={banner.message} onClose={closeBanner} type={banner.type} />}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>
      <Link href="/orders/create">
        <button className="mb-6 p-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200">Create Order</button>
      </Link>
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-gray-600">Email</th>
            <th className="py-3 px-4 text-left text-gray-600">Status</th>
            <th className="py-3 px-4 text-left text-gray-600">Timestamps</th>
            <th className="py-3 px-4 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-4">{order.customer_email}</td>
              <td className="py-3 px-4">{order.status}</td>
              <td className="py-3 px-4">
                <p>Created: {new Date(order.created_at || '').toLocaleString()}</p>
                <p>Updated: {new Date(order.updated_at || '').toLocaleString()}</p>
              </td>
              <td className="py-3 px-4">
                <Link href={`/orders/${order.id}`}>
                  <button className="p-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition duration-200">View</button>
                </Link>
                <Link href={`/orders/update/${order.id}`}>
                  <button className="p-2 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-600 transition duration-200 ml-2">Update</button>
                </Link>
                <button onClick={() => order.id && handleDelete(order.id)} className="p-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 transition duration-200 ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
