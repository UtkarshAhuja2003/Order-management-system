"use client";
import React from "react";
import { useOrderForm } from "@/hooks/orderForm";
import OrderForm from "@/components/Orders/orderForm";
import Banner from "@/components/common/Banner";
import { useBanner } from "@/hooks/useBanner";
import { OrderStatus } from "@/utils/constants";

const OrderCreatePopup = ({ onClose, onCreate }: { onClose: () => void, onCreate: () => void }) => {
  const { formState, handleChange, handleSubmit, errors, isSubmitting } = useOrderForm({
    customer_email: "",
    status: OrderStatus.CONFIRMED,
  });
  const { banner, showBanner, closeBanner } = useBanner();

  const handleFormSubmit = async () => {
    const success = await handleSubmit(false);
    if (success) {
      showBanner("success", "Order created successfully");
      onCreate(); 
      onClose(); 
    } else {
      showBanner("error", "Failed to create the order");
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
          isEdit={false}
        />
        <button onClick={onClose} className="mt-4 text-red-600">Close</button>
      </div>
    </div>
  );
};

export default OrderCreatePopup;
