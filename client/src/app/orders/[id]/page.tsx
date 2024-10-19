"use client"
import React, { useEffect, useState } from 'react';
import { getOrderById } from '@/api/order';
import { Order } from '@/interfaces/order';

const OrderDetails = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        try {
          const response = await getOrderById(id);
          if (response.success && response.data) {
            setOrder(response.data);
          } else {
            setOrder(null);
          }
        } catch (error) {
          console.error('Failed to fetch order', error);
          setOrder(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) 
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );

  if (!order) 
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-red-500">No order found.</div>
      </div>
    );

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="border p-4 rounded-lg bg-gray-50">
        <p className="text-lg font-medium">Email: <span className="text-gray-700">{order.customer_email}</span></p>
        <p className="text-lg font-medium">Status: <span className="text-gray-700">{order.status}</span></p>
        <p className="text-lg font-medium">Created At: <span className="text-gray-700">{new Date(order.created_at || '').toLocaleString()}</span></p>
        <p className="text-lg font-medium">Updated At: <span className="text-gray-700">{new Date(order.updated_at || '').toLocaleString()}</span></p>
      </div>
    </div>
  );
};

export default OrderDetails;
