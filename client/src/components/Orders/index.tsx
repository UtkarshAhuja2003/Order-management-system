import { Order } from "@/interfaces/order";
import React from "react";

const OrdersContent: React.FC<{ orders: Order[] }> = ({ orders }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Orders Management</h2>
      <p>Manage your orders here. You can view, edit, and track orders.</p>
    </div>
  );
};

export default OrdersContent;
