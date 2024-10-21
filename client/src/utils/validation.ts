import { Order } from "@/interfaces/order";
import { OrderStatus } from "./constants";

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateOrderStatus = (status: string): boolean => {
    return OrderStatus[status as keyof typeof OrderStatus] !== undefined;
};

export const validateOrder = (order: Partial<Order>): { isValid: boolean, errors: string[] } => {
    const errors: string[] = [];

    if (!order.customer_email || !validateEmail(order.customer_email)) {
        errors.push("Enter a valid email address.");
    }

    if (!order.status || !validateOrderStatus(order.status)) {
        errors.push(`Invalid order status: ${order.status}. Valid options are: ${Object.keys(OrderStatus).join(', ')}.`);
    }
    return {
        isValid: errors.length === 0,
        errors,
    };
};
