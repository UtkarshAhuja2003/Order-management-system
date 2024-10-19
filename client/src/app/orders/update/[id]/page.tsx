"use client";
import React, { useEffect } from 'react';
import { useOrderForm } from '@/hooks/orderForm';
import OrderForm from '@/components/Orders/orderForm';
import Banner from '@/components/common/Banner';
import { useBanner } from '@/hooks/useBanner';
import { getOrderById } from '@/api/order';

const UpdateOrder = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { formState, setFormState, handleChange, handleSubmit, errors, isSubmitting } = useOrderForm({
    customer_email: '',
    status: 'CONFIRMED',
  });
  const { banner, showBanner, closeBanner } = useBanner();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderById(id);
        if (res.data) {
          setFormState(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch order', error);
        showBanner('error', 'Failed to load order data');
      }
    };
    fetchOrder();
  }, []);

  const handleFormSubmit = async () => {
    const success = await handleSubmit(true);
    if (success) {
      showBanner('success', 'Order updated successfully');
    } else {
      showBanner('error', 'Failed to update the order');
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
        isEdit={true}
      />
    </div>
  );
};

export default UpdateOrder;
