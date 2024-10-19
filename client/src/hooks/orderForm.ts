"use client"
import { useState } from 'react';
import { Order } from '@/interfaces/order';
import { validateOrder } from '@/utils/orderValidation';
import { createOrder, updateOrder } from '@/api/order';

export const useOrderForm = (initialState: Order) => {
  const [formState, setFormState] = useState<Order>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    const { isValid, errors } = validateOrder(formState);
    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (isEdit: boolean = false): Promise<boolean> => {
    if (!validateForm()) return false;

    setIsSubmitting(true);
    try {
      if (isEdit) {
        if (formState.id) {
          await updateOrder(formState.id, formState);
        } else {
          setErrors(['Order ID is missing']);
          return false;
        }
      } else {
        await createOrder(formState);
      }
      setErrors([]);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setErrors([error.message]);
      } else {
        setErrors(['Error occurred']);
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formState, setFormState, handleChange, handleSubmit, errors, isSubmitting };
};

