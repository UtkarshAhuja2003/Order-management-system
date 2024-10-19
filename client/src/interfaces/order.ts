import { OrderStatus } from "@/utils/constants";

export type Order = {
    id?: string;
    customer_email?: string;
    status?: OrderStatus;
    created_at?: string;
    updated_at?: string;
};


export interface OrderFormProps {
    formState: Order;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: () => void;
    errors: string[];
    isSubmitting: boolean;
    isEdit: boolean;
}