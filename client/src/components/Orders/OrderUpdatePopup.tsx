"use client";
import React, { useEffect } from "react";
import { useOrderForm } from "@/hooks/orderForm";
import OrderForm from "@/components/Orders/orderForm";
import Banner from "@/components/common/Banner";
import { useBanner } from "@/hooks/useBanner";
import { getOrderById } from "@/api/order";

const OrderUpdatePopup = ({ orderId, onClose, onUpdate }: { orderId: string, onClose: () => void, onUpdate: () => void }) => {
  const { formState, setFormState, handleChange, handleSubmit, errors, isSubmitting } = useOrderForm({
    customer_email: "",
    status: "CONFIRMED",
  });
  const { banner, showBanner, closeBanner } = useBanner();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderById(orderId);
        if (res.data) {
          setFormState(res.data);
        }
      } catch (error) {
        showBanner("error", "Failed to load order data");
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleFormSubmit = async () => {
    const success = await handleSubmit(true);
    if (success) {
      showBanner("success", "Order updated successfully");
      onUpdate();
      onClose();
    } else {
      showBanner("error", "Failed to update the order");
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
          isEdit={true}
        />
        <button onClick={onClose} className="mt-4 text-red-600">Close</button>
      </div>
    </div>
  );
};

export default OrderUpdatePopup;
