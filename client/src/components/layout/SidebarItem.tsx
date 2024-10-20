import React from "react";

interface SidebarItemProps {
  item: { href: string; icon: React.ElementType; name: string };
  isSelected: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, isSelected, onClick }) => {
  return (
    <li className="relative flex items-center">
        <button
          onClick={onClick}
          className={`flex items-center w-[90%] mx-auto py-3 px-5 rounded-md text-darkBlue transition-all duration-300 ${
            isSelected ? "bg-darkBlue text-white" : "bg-lightBlue text-darkBlue"
          }`}
        >
          <item.icon className="mr-3 text-[160%]" />
          <span className="text-[140%] font-bold">{item.name}</span>
        </button>
    </li>
  );
};

export default SidebarItem;
