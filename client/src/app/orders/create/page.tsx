"use client";
import React from 'react';
import { useOrderForm } from '@/hooks/orderForm';
import OrderForm from '@/components/Orders/orderForm';
import Banner from '@/components/common/Banner';
import { useBanner } from '@/hooks/useBanner';

const CreateOrder = () => {
  const { formState, handleChange, handleSubmit, errors, isSubmitting } = useOrderForm({
    customer_email: '',
    status: 'CONFIRMED',
  });
  const { banner, showBanner, closeBanner } = useBanner();

  const handleFormSubmit = async () => {
    const success = await handleSubmit(false);
    if (success) {
      showBanner('success', 'Order created successfully');
    } else {
      showBanner('error', 'Failed to create the order');
    }
  };

  return (
    <div>
      {banner.isVisible && banner.type && (
        <Banner
          message={banner.message}
          onClose={closeBanner}
          type={banner.type}
        />
      )}
      <OrderForm
        formState={formState}
        handleChange={handleChange}
        handleSubmit={handleFormSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        isEdit={false}
      />
    </div>
  );
};

export default CreateOrder;
