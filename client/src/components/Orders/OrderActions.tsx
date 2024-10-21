import React from 'react';
import { MdSettings } from "react-icons/md";
import { BiTrash } from "react-icons/bi";

interface OrderActionsProps {
  onUpdate: () => void;
  onDelete: () => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({ onUpdate, onDelete }) => {
  const [showActions, setShowActions] = React.useState(false);

  const toggleActions = () => {
    setShowActions(!showActions);
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={toggleActions}>
        <MdSettings className="text-2xl text-gray-500 hover:text-gray-700" />
      </button>
      {showActions && (
        <div className="absolute right-0 z-10 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={onUpdate}
            >
              Update
            </button>
            <button
              className="block bg-red-200 px-4 py-2 text-sm text-gray-700 hover:bg-red-400 w-full text-left"
              onClick={onDelete}
            >
              <BiTrash className="inline-block mr-1" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderActions;
