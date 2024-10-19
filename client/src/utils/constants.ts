export const ORDER_STATUS_CHOICES = [
    'CONFIRMED',
    'REJECTED',
    'PREPARING',
    'READY',
] as const;

export type OrderStatus = typeof ORDER_STATUS_CHOICES[number];
