"use client"
import React from 'react';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';
import SelectField from '@/components/common/SelectField';
import { OrderFormProps } from '@/interfaces/order';
import { ORDER_STATUS_CHOICES } from '@/utils/constants';

const OrderForm: React.FC<OrderFormProps> = ({ formState, handleChange, handleSubmit, errors, isSubmitting, isEdit }) => (
  <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-6 text-center">{isEdit ? 'Update Order Status' : 'Create Order'}</h1>
    {errors.length > 0 && (
      <div className="bg-red-500 text-white p-4 rounded-md mb-6">
        {errors.map((error, idx) => (
          <p key={idx}>{error}</p>
        ))}
      </div>
    )}
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
      <InputField 
        name="customer_email" 
        value={formState.customer_email} 
        type='email' 
        placeholder="Email" 
        onChange={handleChange}
        disabled={isEdit}
        required={true}
      />
      <SelectField 
        name="status" 
        value={formState.status} 
        onChange={handleChange} 
        options={[...ORDER_STATUS_CHOICES]}
      />
      <Button 
        label={isEdit ? 'Update Order Status' : 'Create Order'} 
        isLoading={isSubmitting} 
      />
    </form>
  </div>
);

export default OrderForm;
