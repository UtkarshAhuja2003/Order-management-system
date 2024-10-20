import { Order } from "@/interfaces/order";
import React, { useState } from "react";
import { MdSettings } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import Badge from '@/components/common/Badge';
import Link from "next/link";
import { deleteOrder } from "@/api/order";
import { useBanner } from "@/hooks/useBanner";
import Banner from "../common/Banner";

const OrdersContent: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [showActions, setShowActions] = useState<number | null>(null);
  const { banner, showBanner, closeBanner } = useBanner();
  const [filteredOrders, setOrders] = useState<Order[]>(orders);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.abs(now.getTime() - date.getTime());
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  };

  const handleRowClick = (index: number) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  const toggleActions = (index: number) => {
    setShowActions(showActions === index ? null : index);
  };

  const handleDelete = async (id: string) => {
    await deleteOrder(id);
    setOrders(filteredOrders.filter(order => order.id !== id));
    showBanner('success', 'Order deleted successfully');
  };

  return (
    <div className="overflow-x-auto">
      {banner.isVisible && banner.type && <Banner message={banner.message} onClose={closeBanner} type={banner.type} />}
      <h2 className="text-2xl font-semibold mb-4 mt-8">Orders Management</h2>
      <table className="hidden sm:table min-w-full bg-white border border-gray-200 rounded-lg">
        <thead style={{ backgroundColor: "#424874" }}>
          <tr className="text-white">
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Customer</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Last Updated</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr
              key={order.id}
              className={`border-b border-gray-200 ${selectedRow === index ? "bg-[#DCD6F7]" : ""}`}
              onClick={() => handleRowClick(index)}
            >
              <td className="p-4">{order.id}</td>
              <td className="p-4">{order.customer_email || "N/A"}</td>
              <td className="p-4"><Badge status={order.status || 'CONFIRMED'} /></td>
              <td className="p-4">{formatDate(order.updated_at)}</td>
              <td className="p-4">
                <div className="relative inline-block text-left">
                  <button onClick={() => toggleActions(index)}>
                    <MdSettings className="text-2xl text-gray-500 hover:text-gray-700" />
                  </button>
                  {showActions === index && (
                    <div className="absolute right-0 z-10 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1" role="none">
                        <Link href={`/orders/update/${order.id}`}>
                          <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            Update
                          </button>
                        </Link>
                        <button onClick={() => handleDelete(order.id!)} className="block bg-red-200 px-4 py-2 text-sm text-gray-700 hover:bg-red-400 w-full text-left">
                          <BiTrash className="inline-block mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="block sm:hidden space-y-4">
        {filteredOrders.map((order, index) => (
          <div key={order.id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <p><strong>ID:</strong> {order.id}</p>
                <p><strong>Customer:</strong> {order.customer_email || "N/A"}</p>
                <p><strong>Status:</strong> <Badge status={order.status || 'CONFIRMED'} /></p>
                <p><strong>Last Updated:</strong> {formatDate(order.updated_at)}</p>
              </div>
              <button onClick={() => toggleActions(index)}>
                <MdSettings className="text-2xl text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            {showActions === index && (
              <div className="mt-2">
                <button className="block w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Update
                </button>
                <button onClick={() => handleDelete(order.id!)} className="block w-full text-left bg-red-200 py-2 text-sm text-gray-700 hover:bg-red-400">
                  <BiTrash className="inline-block mr-1" />
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersContent;
