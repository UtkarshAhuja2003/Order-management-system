import React, { useState, useEffect } from "react";
import { Order } from "@/interfaces/order";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdRemoveShoppingCart } from "react-icons/md";
import { TbCalendarClock } from "react-icons/tb";
import { FaBoxArchive } from "react-icons/fa6";
import { StatusBox } from "./Status";

const OrderSummary: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [timeframe, setTimeframe] = useState<string>('lastWeek');
  console.log(filteredOrders);

  useEffect(() => {
    filterOrders(timeframe);
  }, [timeframe, orders]);

  const getOrderCountByStatus = (status: string) =>
    filteredOrders.filter((order) => order.status === status).length;

  const statusData = [
    { status: 'CONFIRMED', label: 'Confirmed', icon: <BsFillCartCheckFill className="md:text-5xl" />, iconColor: 'text-green-500' },
    { status: 'REJECTED', label: 'Rejected', icon: <MdRemoveShoppingCart className="md:text-5xl" />, iconColor: 'text-red-500' },
    { status: 'PREPARING', label: 'Preparing', icon: <TbCalendarClock className="md:text-5xl" />, iconColor: 'text-yellow-500' },
    { status: 'READY', label: 'Ready', icon: <FaBoxArchive className="md:text-5xl" />, iconColor: 'text-blue-500' },
  ];

  const filterOrders = (timeframe: string) => {
    const now = new Date();
    let filtered = orders;

    if (timeframe === 'today') {
      filtered = orders.filter(order => order.created_at && new Date(order.created_at).toDateString() === now.toDateString());
    } else if (timeframe === 'lastWeek') {
      const lastWeek = new Date();
      lastWeek.setDate(now.getDate() - 7);
      filtered = orders.filter(order => order.created_at && new Date(order.created_at) > lastWeek && new Date(order.created_at) <= now);
    } else if (timeframe === 'lastMonth') {
      const lastMonth = new Date();
      lastMonth.setMonth(now.getMonth() - 1);
      filtered = orders.filter(order => order.created_at && new Date(order.created_at) > lastMonth && new Date(order.created_at) <= now);
    }

    setFilteredOrders(filtered);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-2xl font-semibold">Orders Summary</h2>
        <select
          className="p-2 border border-gray-300 rounded"
          onChange={(e) => setTimeframe(e.target.value)}
          value={timeframe}
        >
          <option value="today">Today</option>
          <option value="lastWeek">Last Week</option>
          <option value="lastMonth">Last Month</option>
        </select>
      </div>
      <div className="grid w-[70%] md:w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-12">
        {statusData.map((status) => (
          <StatusBox
            key={status.status}
            icon={status.icon}
            count={getOrderCountByStatus(status.status)}
            label={status.label}
            iconColor={status.iconColor}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
