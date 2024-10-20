import React from "react";
import { SidebarItems } from "@/utils/constants";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  selectedItem: string;
  onSelect: (href: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedItem, onSelect, isOpen, onClose }) => {
  return (
    <div
      className={`${
        isOpen ? "translate-x-0 h-[100vh] pt-6" : "-translate-x-full"
      } fixed z-50 top-0 left-0 w-[60%] bg-[#F6F5F2] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-transform transform md:relative md:translate-x-0 md:w-[20%] md:block`}
    >
      <h1 className="text-center py-8 font-bold text-[22px] text-darkBlue">Order Management</h1>
      <ul className="mt-4 space-y-2">
        {SidebarItems.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
            isSelected={selectedItem === item.href}
            onClick={() => onSelect(item.href)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
