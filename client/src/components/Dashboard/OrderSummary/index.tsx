import React, { useState, useEffect } from "react";
import { Order } from "@/interfaces/order";
import { StatusBox } from "./Status";
import { filterOrdersWithTimeframe } from "@/utils/orders";
import { Timeframes } from "@/utils/constants";
import { OrderStatus } from "@/utils/constants";
import { filterOrdersByStatus } from "@/utils/orders";
import { orderStatusConfig } from "@/utils/constants";

const OrderSummary: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [timeframe, setTimeframe] = useState<Timeframes>(Timeframes.LastWeek);

  useEffect(() => {
    const newFilteredOrders = filterOrdersWithTimeframe(timeframe, orders);
    setFilteredOrders(newFilteredOrders);
  }, [timeframe, orders]);

  const getOrderCountByStatus = (status: OrderStatus) => {
    return filterOrdersByStatus(status, filteredOrders).length;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-2xl font-semibold">Orders Summary</h2>
        <select
          className="p-2 border border-gray-300 rounded"
          onChange={(e) => setTimeframe(e.target.value as Timeframes)}
          value={timeframe}
        >
          <option value={Timeframes.Today}>Today</option>
          <option value={Timeframes.LastWeek}>Last Week</option>
          <option value={Timeframes.LastMonth}>Last Month</option>
        </select>
      </div>
      <div className="grid w-[70%] md:w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-12">
        {Object.keys(orderStatusConfig).map((key) => {
          const statusConfig = orderStatusConfig[key as OrderStatus];
          const IconComponent = statusConfig.icon;
          return (
            <StatusBox
              key={statusConfig.label}
              icon={<IconComponent className="md:text-5xl" />}
              count={getOrderCountByStatus(key as OrderStatus)}
              label={statusConfig.label}
              iconColor={statusConfig.iconColor}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OrderSummary;
