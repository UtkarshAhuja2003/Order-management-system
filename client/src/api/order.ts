import { Order } from "@/interfaces/order";

const BACKEND_URI = process.env.BACKEND_URI || "http://localhost:8000";

/**
 * Fetches all orders from the backend.
 */
const getAllOrders = async (): Promise<{ success: boolean, message: string, data: Order[] | null }> => {
    try {
        const response = await fetch(`${BACKEND_URI}/orders/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.message || "Failed to fetch orders";
            return { success: false, message: errorMessage, data: null };
        }

        return { success: true, message: "Orders fetched successfully", data };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return { success: false, message: errorMessage, data: null };
    }
};

/**
 * Fetches a single order by ID.
 * @param orderId The ID of the order to fetch.
 */
const getOrderById = async (orderId: string): Promise<{ success: boolean, message: string, data: Order | null }> => {
    try {
        const response = await fetch(`${BACKEND_URI}/orders/${orderId}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.message || `Failed to fetch order with ID: ${orderId}`;
            return { success: false, message: errorMessage, data: null };
        }

        return { success: true, message: "Order fetched successfully", data };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return { success: false, message: errorMessage, data: null };
    }
};

/**
 * Creates a new order.
 * @param order The order object to create.
 */
const createOrder = async (order: Order): Promise<{ success: boolean, message: string, data: Order | null }> => {
    try {
        const response = await fetch(`${BACKEND_URI}/orders/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.message || "Failed to create order";
            return { success: false, message: errorMessage, data: null };
        }

        return { success: true, message: "Order created successfully", data };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return { success: false, message: errorMessage, data: null };
    }
};

/**
 * Updates the status of an existing order.
 * @param orderId The ID of the order to update.
 * @param updateData The updated order data (e.g., status).
 */
const updateOrder = async (orderId: string, updateData: Partial<Order>): Promise<{ success: boolean, message: string, data: Order | null }> => {
    try {
        const response = await fetch(`${BACKEND_URI}/orders/${orderId}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.message || `Failed to update order with ID: ${orderId}`;
            return { success: false, message: errorMessage, data: null };
        }

        return { success: true, message: "Order updated successfully", data };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return { success: false, message: errorMessage, data: null };
    }
};

/**
 * Deletes an existing order.
 * @param orderId The ID of the order to delete.
 */
const deleteOrder = async (orderId: string): Promise<{ success: boolean, message: string }> => {
    try {
        const response = await fetch(`${BACKEND_URI}/orders/${orderId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const data = await response.json();
            const errorMessage = data.message || `Failed to delete order with ID: ${orderId}`;
            return { success: false, message: errorMessage };
        }

        return { success: true, message: "Order deleted successfully" };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return { success: false, message: errorMessage };
    }
};

export {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
}