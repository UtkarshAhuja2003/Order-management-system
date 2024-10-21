import React from 'react';
import { Order } from '@/interfaces/order';
import { formatDate } from '@/utils/date';
import Badge from '@/components/common/Badge';
import OrderActions from './OrderActions';
import { OrderStatus } from '@/utils/constants';

interface OrderRowProps {
  order: Order;
  onUpdate: () => void;
  onDelete: () => void;
  isSelected: boolean;
  onSelect: () => void;
}

const OrderRow: React.FC<OrderRowProps> = ({ order, onUpdate, onDelete, isSelected, onSelect }) => {
  return (
    <tr className={`border-b border-gray-200 ${isSelected ? 'bg-[#DCD6F7]' : ''}`} onClick={onSelect}>
      <td className="p-4">{order.id}</td>
      <td className="p-4">{order.customer_email || 'N/A'}</td>
      <td className="p-4"><Badge status={order.status || OrderStatus.CONFIRMED} /></td>
      <td className="p-4">{formatDate(order.updated_at)}</td>
      <td className="p-4">
        <OrderActions onUpdate={onUpdate} onDelete={onDelete} />
      </td>
    </tr>
  );
};

export default OrderRow;
