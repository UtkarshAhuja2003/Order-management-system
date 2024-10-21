import { Order } from "@/interfaces/order";
import { Timeframes } from "./constants";
import { OrderStatus } from "./constants";

export const filterOrdersWithTimeframe = (timeframe: Timeframes, orders: Order[]) => {
  const now = new Date();
  let filteredOrders = orders;

  if (timeframe === Timeframes.Today) {
    filteredOrders = orders.filter(order => order.created_at && new Date(order.created_at).toDateString() === now.toDateString());
  } else if (timeframe === Timeframes.LastWeek) {
    const lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);
    filteredOrders = orders.filter(order => order.created_at && new Date(order.created_at) > lastWeek && new Date(order.created_at) <= now);
  } else if (timeframe === Timeframes.LastMonth) {
    const lastMonth = new Date();
    lastMonth.setMonth(now.getMonth() - 1);
    filteredOrders = orders.filter(order => order.created_at && new Date(order.created_at) > lastMonth && new Date(order.created_at) <= now);
  }

  return filteredOrders;
};

export const filterOrdersByStatus = (status: OrderStatus, orders: Order[]) => {
    return orders.filter(order => order.status === status);
}