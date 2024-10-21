import React from 'react';
import { OrderStatus } from '@/utils/constants';
import { orderStatusConfig } from '@/utils/constants';

interface BadgeProps {
  status: OrderStatus;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  const statusConfig = orderStatusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${statusConfig?.className || 'bg-gray-200 text-gray-800'}`}
    >
      {statusConfig?.label || status}
    </span>
  );
};

export default Badge;
