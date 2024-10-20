import React from 'react';

interface BadgeProps {
  status: 'CONFIRMED' | 'REJECTED' | 'PREPARING' | 'READY';
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  const statusClasses = {
    CONFIRMED: 'bg-green-200 text-green-800',
    REJECTED: 'bg-red-200 text-red-800',
    PREPARING: 'bg-yellow-200 text-yellow-800',
    READY: 'bg-blue-200 text-blue-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${statusClasses[status] || 'bg-gray-200 text-gray-800'}`}
    >
      {status}
    </span>
  );
};

export default Badge;
