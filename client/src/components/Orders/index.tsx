import React, { useState } from "react";
import { deleteOrder, getOrderById, getAllOrders } from "@/api/order";
import { useBanner } from "@/hooks/useBanner";
import Banner from "../common/Banner";
import { Order } from "@/interfaces/order";
import OrderRow from "./OrderRow";
import OrderPopup from "./OrderPopup";

const OrdersContent: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const { banner, showBanner, closeBanner } = useBanner();
  const [popupOrderId, setPopupOrderId] = useState<string | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [isCreatePopupVisible, setIsCreatePopupVisible] = useState<boolean>(false);

  const handleDelete: (id: string) => Promise<void> = async (id: string) => {
    await deleteOrder(id);
    setFilteredOrders(filteredOrders.filter(order => order.id !== id));
    showBanner('success', 'Order deleted successfully');
  };

  const handleUpdate = async (id: string) => {
    const updatedOrder = await getOrderById(id);
    setFilteredOrders(
      filteredOrders.map(order =>
        order.id === id && updatedOrder.data ? { ...order, status: updatedOrder.data.status, updated_at: updatedOrder.data.updated_at } : order
      )
    );
  };

  const handleCreate = async () => {
    const newOrders = await getAllOrders();
    if (newOrders.data) {
      setFilteredOrders(newOrders.data);
    }
  };

  return (
    <div className="overflow-x-auto">
      {popupOrderId && (
        <OrderPopup
          orderId={popupOrderId}
          onClose={() => setPopupOrderId(null)}
          onSuccess={() => handleUpdate(popupOrderId)}
        />
      )}

      {isCreatePopupVisible && (
        <OrderPopup
          onClose={() => setIsCreatePopupVisible(false)}
          onSuccess={() => handleCreate()}
        />
      )}

      <h2 className="text-2xl font-semibold mb-4 mt-8">Orders Management</h2>
      {banner.isVisible && banner.type && <Banner message={banner.message} onClose={closeBanner} type={banner.type} />}

      <div className="mb-4">
        <button
          onClick={() => setIsCreatePopupVisible(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create New Order
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
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
            <OrderRow
              key={order.id}
              order={order}
              onUpdate={() => order.id && setPopupOrderId(order.id)}
              onDelete={() => order.id && handleDelete(order.id)}
              isSelected={selectedRow === index}
              onSelect={() => setSelectedRow(index)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersContent;
