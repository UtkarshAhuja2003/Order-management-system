"use client";
import React, { useEffect } from "react";
import { useOrderForm } from "@/hooks/orderForm";
import OrderForm from "@/components/Orders/OrderForm";
import Banner from "@/components/common/Banner";
import { useBanner } from "@/hooks/useBanner";
import { getOrderById } from "@/api/order";
import { OrderStatus } from "@/utils/constants";

interface OrderPopupProps {
  orderId?: string;
  onClose: () => void;
  onSuccess: () => void;
}

const OrderPopup: React.FC<OrderPopupProps> = ({ orderId, onClose, onSuccess }) => {
  const isEdit = !!orderId;
  const { formState, setFormState, handleChange, handleSubmit, errors, isSubmitting } = useOrderForm({
    customer_email: "",
    status: OrderStatus.CONFIRMED,
  });
  const { banner, showBanner, closeBanner } = useBanner();

  useEffect(() => {
    if (isEdit && orderId) {
      const fetchOrder = async () => {
        try {
          const res = await getOrderById(orderId);
          if (res.data) {
            setFormState(res.data);
          }
        } catch (error) {
          showBanner("error", (error as Error).message || "Failed to fetch order");
        }
      };
      fetchOrder();
    }
  }, [orderId, isEdit]);

  const handleFormSubmit = async () => {
    const success = await handleSubmit(isEdit);
    if (success) {
      showBanner("success", `Order ${isEdit ? "updated" : "created"} successfully`);
      onSuccess(); 
      onClose();
    } else {
      showBanner("error", `Failed to ${isEdit ? "update" : "create"} the order`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        {banner.isVisible && banner.type && (
          <Banner message={banner.message} onClose={closeBanner} type={banner.type} />
        )}
        <OrderForm
          formState={formState}
          handleChange={handleChange}
          handleSubmit={handleFormSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          isEdit={isEdit}
        />
        <button onClick={onClose} className="mt-4 text-red-600">Close</button>
      </div>
    </div>
  );
};

export default OrderPopup;
